import { createApp } from "vue";
import { useDebounceFn } from "@vueuse/core";

import Toast from "@/components/Toast.vue";
import { toast } from "@/hooks/useToast";
import { callModel } from "@/entrypoints/background";
import {
    parseOptimizeRes,
    setTextareaValue,
    setTextareaLoadingStyle,
} from "@/utils/utils";
import { allPlatforms } from "@/utils/config";
import { getDeepseekDOM } from "./platforms/deepseek";
import { getGenminiDOM } from "./platforms/genmini";
import { getChatGPTDOM } from "./platforms/chatgpt";
import { getDoubaoDOM } from "./platforms/doubao";

import aiIcon from "@/assets/icons/ai.png";
import loadingIcon from "@/assets/icons/loading.svg";

// Check if current URL is in the effective URL list
const isValidURL = (currURL: string): PlatformName => {
    const matchedPlatform = allPlatforms.find((each) =>
        currURL.includes(each.URL)
    );
    return (matchedPlatform?.name as PlatformName) || null;
};

let toastApp: any = null;
// Initialize Toast component
const initToast = () => {
    // Check if Toast container already exists
    if (document.getElementById("prompt-optimization-toast-container")) {
        return;
    }

    // Create Toast container
    const toast = document.createElement("div");
    toast.id = "prompt-optimization-toast-container";
    document.body.appendChild(toast);

    // Create and mount Vue app
    toastApp = createApp(Toast);
    toastApp.mount(toast);
};

let textarea: HTMLTextAreaElement | HTMLElement | null = null;
let buttonContainer: HTMLElement | null = null;

let button: HTMLImageElement | null = null;
let optimizationModal: HTMLElement | null = null;

// DOM change listener
let domObserver: MutationObserver | null = null;
let currentPlatform: PlatformName | null = null;

let failCount: number = 0;

export const mixin = (platform: PlatformName) => {
    // Platform switch reset
    if (currentPlatform !== platform) {
        failCount = 0;
        currentPlatform = platform;
    }
    if (failCount >= 10) {
        console.log("mixin failed 10 times, stop");
        return;
    }
    switch (platform) {
        case "ChatGPT":
            const {
                textarea: chatgptTextarea,
                buttonContainer: chatgptButtonContainer,
            } = getChatGPTDOM();
            textarea = chatgptTextarea;
            buttonContainer = chatgptButtonContainer;
            break;
        case "Genmini":
            const {
                textarea: genminiTextarea,
                buttonContainer: genminiButtonContainer,
            } = getGenminiDOM();
            textarea = genminiTextarea;
            buttonContainer = genminiButtonContainer;
            break;
        case "DeepSeek":
            const {
                textarea: deepseekTextarea,
                buttonContainer: deepseekButtonContainer,
            } = getDeepseekDOM();
            textarea = deepseekTextarea;
            buttonContainer = deepseekButtonContainer;
            break;
        case "Doubao":
            const {
                textarea: doubaoTextarea,
                buttonContainer: doubaoButtonContainer,
            } = getDoubaoDOM();
            textarea = doubaoTextarea;
            buttonContainer = doubaoButtonContainer;
            break;
        default:
            break;
    }

    if (textarea && buttonContainer) {
        injectButton(buttonContainer);
        // Start DOM monitoring
        startDOMObserver();
        console.log(`mixin success: ${platform}`);
    } else {
        if (!textarea) {
            console.log("textarea not found. Waiting...");
        } else {
            console.log("buttonContainer not found. Waiting...");
        }
        ++failCount;
        setTimeout(() => mixin(platform), 1000);
    }
};

const injectButton = (container: HTMLElement) => {
    if (!container) {
        console.error("container not found");
        return;
    }

    // If button already exists, remove it first
    if (button) {
        button.remove();
        button = null;
    }

    button = document.createElement("img");
    button.src = aiIcon;
    button.alt = "Optimize Prompt";
    button.style.width = "24px";
    button.style.height = "24px";
    button.style.marginRight = "5px";
    button.style.borderRadius = "50%";
    button.style.cursor = "pointer";

    // Insert button at first child position
    if (container.firstChild) {
        container.insertBefore(button, container.firstChild);
    } else {
        container.appendChild(button);
    }
    button.addEventListener("click", optimizePrompt);
};

// Start DOM monitoring
const startDOMObserver = () => {
    // If there's already a listener, stop it first
    if (domObserver) {
        domObserver.disconnect();
    }

    // Use VueUse debounce function
    const debouncedReinject = useDebounceFn(() => {
        // Check if button is still in DOM
        if (!button || !document.contains(button)) {
            console.log("Button removed, re-injecting...");
            if (currentPlatform) {
                mixin(currentPlatform);
            }
        }
    }, 500);

    domObserver = new MutationObserver((mutations) => {
        let shouldReinject = false;

        mutations.forEach((mutation) => {
            // Check if any nodes were removed
            if (mutation.type === "childList") {
                // If button was removed
                mutation.removedNodes.forEach((node) => {
                    if (
                        node === button ||
                        (node instanceof Element && node.contains(button))
                    ) {
                        shouldReinject = true;
                    }
                });
                // Check for new DOM structure changes
                if (mutation.addedNodes.length > 0) {
                    shouldReinject = true;
                }
            }
        });

        // Use VueUse debounce to avoid frequent re-injection
        if (shouldReinject && currentPlatform) {
            debouncedReinject();
        }
    });

    // Monitor changes to entire document
    domObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
};

const optimizePrompt = async () => {
    if (!textarea) {
        console.error("textarea not found");
        toast.error("Input box not found, please refresh and try again");
        return;
    }
    const prompt = textarea instanceof HTMLTextAreaElement ? textarea.value : textarea.textContent;
    if (!prompt?.trim()) {
        toast.warning("Please enter prompt content first");
        return;
    }

    // Show generating status
    if (button) {
        button.removeEventListener("click", optimizePrompt);
        button.src = loadingIcon;
        button.style.cursor = "auto";
    }
    setTextareaLoadingStyle(textarea, true);

    try {
        const res = await callModel(prompt);
        if (res) {
            const { status_code, optimized_prompt, explanation } =
                parseOptimizeRes(res);
            if (status_code === 200) {
                if (optimized_prompt) {
                    setTextareaValue(textarea, optimized_prompt);
                }
                showOptimizationModal(
                    optimized_prompt || "",
                    explanation || ""
                );
            } else {
                toast.error("Optimization failed: No valid optimization result received");
                return;
            }
        } else {
            toast.error("Optimization failed: Server returned no result");
            return;
        }
    } catch (error) {
        console.error("Optimization error:", error);
        toast.error(
            "Optimization failed: " + (error instanceof Error ? error.message : "Unknown error")
        );
    } finally {
        setTextareaLoadingStyle(textarea, false);
        if (button) {
            button.src = aiIcon;
            button.addEventListener("click", optimizePrompt);
            button.style.cursor = "pointer";
        }
    }
};

// Show optimization result popup
const showOptimizationModal = (
    optimizedPrompt: string,
    explanation: string
) => {
    // If popup already exists, remove it first
    if (optimizationModal) {
        optimizationModal.remove();
        optimizationModal = null;
    }

    // Create popup container
    const modal: HTMLDivElement = document.createElement("div");
    let countdown: number = 10;
    modal.className = "optimization-modal";
    modal.style.cssText = `
        position: absolute;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        padding: 20px;
        width: 400px;
        max-width: 90vw;
        z-index: 10000;
        border: 1px solid #e5e7eb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Create popup content
    modal.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                Prompt Optimization Complete
            </h3>
            <button class="countdown-btn" style="
                width: 24px; height: 24px; border: none; background: none; 
                color: #6b7280; cursor: pointer; border-radius: 4px;
                display: flex; align-items: center; justify-content: center;
            ">
                ${countdown}
            </button>
        </div>
        
        <div style="margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #374151;">Optimized Content</h4>
            <div style="
                border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; 
                background: #f9fafb; max-height: 120px; overflow-y: auto;
            ">
                <pre style="
                    margin: 0; font-family: 'SF Mono', Monaco, monospace; 
                    font-size: 13px; line-height: 1.5; color: #1f2937; 
                    white-space: pre-wrap; word-wrap: break-word;
                ">${optimizedPrompt}</pre>
            </div>
        </div>
        
        <div style="margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #374151;">Optimization Notes</h4>
            <div style="
                border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; 
                background: #f9fafb; max-height: 80px; overflow-y: auto;
            ">
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #4b5563;">${explanation}</p>
            </div>
        </div>
        
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button class="copy-btn" style="
                display: flex; align-items: center; gap: 6px; padding: 8px 12px;
                border: 1px solid #10b981; background: #10b981; color: white;
                border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500;
            ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy Content
            </button>
        </div>
    `;

    // Position popup above button
    if (button && buttonContainer) {
        const buttonRect = button.getBoundingClientRect();

        modal.style.position = "fixed";
        modal.style.left = `${buttonRect.left}px`;
        modal.style.bottom = `${window.innerHeight - buttonRect.top + 10}px`;

        // Ensure popup doesn't exceed screen boundaries
        const modalWidth = 400;
        if (buttonRect.left + modalWidth > window.innerWidth) {
            modal.style.left = `${window.innerWidth - modalWidth - 20}px`;
        }
        if (buttonRect.left < 0) {
            modal.style.left = "20px";
        }
    }

    // Add event listeners
    const copyBtn = modal.querySelector(".copy-btn") as HTMLButtonElement;

    const closeModal = () => {
        if (optimizationModal) {
            optimizationModal.remove();
            optimizationModal = null;
        }
    };

    copyBtn?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(optimizedPrompt);
            copyBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                Copied
            `;
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy Content
                `;
            }, 2000);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    });

    // Click outside popup to close
    const handleClickOutside = (event: MouseEvent) => {
        if (!modal.contains(event.target as Node)) {
            closeModal();
            document.removeEventListener("click", handleClickOutside);
        }
    };

    // Delay adding outside click listener to avoid immediate trigger
    setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
    }, 100);

    // ESC key to close
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            closeModal();
            document.removeEventListener("keydown", handleKeydown);
        }
    };
    document.addEventListener("keydown", handleKeydown);

    // Add to page
    document.body.appendChild(modal);
    optimizationModal = modal;

    // Get close button element for updating countdown display
    const countdownBtn = modal.querySelector(
        ".countdown-btn"
    ) as HTMLButtonElement;

    // Auto close after 10s
    const timer = setInterval(() => {
        countdown--;
        // Dynamically update close button text content
        if (countdownBtn) {
            countdownBtn.textContent = countdown.toString();
        }
        if (countdown <= 0) {
            closeModal();
            clearInterval(timer);
        }
    }, 1000);
};

// Deprecated: continuous polling is too expensive
// const rollbackCheck = () => {
//     const interval = setInterval(() => {
//         button?.remove();
//         mixin("Doubao");
//     }, 3000);
//     return () => {
//         clearInterval(interval);
//     };
// };

export default defineContentScript({
    matches: ["*://*/*"],
    /* main function will be triggered at the following times:
        When the matched webpage finishes loading (when page DOM construction is complete)
        When user navigates to a matched new page
        When page is restored from history (e.g., user clicks browser back button) */
    async main(_ctx) {
        currentPlatform = isValidURL(window.location.href);
        if (!currentPlatform) return;
        // Initialize Toast container
        initToast();
        mixin(currentPlatform);
    },
});
