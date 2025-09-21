import { createApp } from "vue";

import Toast from "@/components/Toast.vue";
import { toast } from "@/hooks/useToast";
import { callModel } from "@/entrypoints/background";
import { parseOptimizeRes } from "@/utils/utils";
import { allPlatforms } from "@/utils/config";
import { getDoubaoDOM } from "./platforms/doubao";

import aiIcon from "@/assets/icons/ai.png";
import loadingIcon from "@/assets/icons/loading.svg";

// 判断当前URL是否在生效URL列表中
const isValidURL = (currURL: string): PlatformName => {
    const matchedPlatform = allPlatforms.find((each) =>
        currURL.includes(each.URL)
    );
    return (matchedPlatform?.name as PlatformName) || null;
};

let toastApp: any = null;
// 初始化 Toast 组件
const initToast = () => {
    // 检查是否已经存在 Toast 容器
    if (document.getElementById("prompt-optimization-toast-container")) {
        return;
    }

    // 创建 Toast 容器
    const toast = document.createElement("div");
    toast.id = "prompt-optimization-toast-container";
    document.body.appendChild(toast);

    // 创建并挂载 Vue 应用
    toastApp = createApp(Toast);
    toastApp.mount(toast);
};

let textarea: HTMLTextAreaElement | null = null;
let buttonContainer: HTMLElement | null = null;
let button: HTMLImageElement | null = null;
let optimizationModal: HTMLElement | null = null;

export const mixin = (platform: PlatformName) => {
    switch (platform) {
        case "ChatGPT":
        case "Genmini":
        case "DeepSeek":
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
    } else {
        console.error("textarea or buttonContainer not found");
        setTimeout(() => mixin(platform), 1000);
    }
};

const injectButton = (container: HTMLElement) => {
    if (!container) {
        console.error("container not found");
        return;
    }
    button = document.createElement("img");
    button.src = aiIcon;
    button.alt = "优化提示词";
    button.style.width = "24px";
    button.style.height = "24px";
    button.style.marginRight = "5px";
    button.style.borderRadius = "50%";
    button.style.cursor = "pointer";

    // 将按钮插入到第一个子元素位置
    if (container.firstChild) {
        container.insertBefore(button, container.firstChild);
    } else {
        container.appendChild(button);
    }
    button.addEventListener("click", optimizePrompt);
};

const optimizePrompt = async () => {
    if (!textarea) {
        console.error("textarea not found");
        toast.error("未找到输入框，请刷新页面重试");
        return;
    }
    const prompt = textarea.value;
    if (!prompt) {
        console.error("prompt is empty");
        toast.warning("请先输入Prompt内容");
        return;
    }

    // 显示生成中状态
    if (button) {
        button.removeEventListener("click", optimizePrompt);
        button.src = loadingIcon;
        button.style.cursor = "auto";
    }

    try {
        const res = await callModel(prompt);
        if (res) {
            const { status_code, optimized_prompt, explanation } =
                parseOptimizeRes(res);
            if (status_code === 200) {
                // 显示优化结果弹窗
                showOptimizationModal(
                    optimized_prompt || "",
                    explanation || ""
                );
            } else {
                toast.error("优化失败：未获取到有效的优化结果");
            }
        } else {
            toast.error("优化失败：服务器未返回结果");
        }
    } catch (error) {
        console.error("optimize prompt failed:", error);
        toast.error(
            "优化失败：" + (error instanceof Error ? error.message : "未知错误")
        );
    } finally {
        if (button) {
            button.src = aiIcon;
            button.addEventListener("click", optimizePrompt);
            button.style.cursor = "pointer";
        }
    }
};

// 显示优化结果弹窗
const showOptimizationModal = (
    optimizedPrompt: string,
    explanation: string
) => {
    // 如果已有弹窗，先移除
    if (optimizationModal) {
        optimizationModal.remove();
        optimizationModal = null;
    }

    // 创建弹窗容器
    const modal = document.createElement("div");
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

    // 创建弹窗内容
    modal.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                提示词优化完成
            </h3>
            <button class="close-btn" style="
                width: 24px; height: 24px; border: none; background: none; 
                color: #6b7280; cursor: pointer; border-radius: 4px;
                display: flex; align-items: center; justify-content: center;
            ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        
        <div style="margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #374151;">优化后的内容</h4>
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
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #374151;">优化说明</h4>
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
                复制内容
            </button>
        </div>
    `;

    // 定位弹窗到按钮上方
    if (button && buttonContainer) {
        const buttonRect = button.getBoundingClientRect();

        modal.style.position = "fixed";
        modal.style.left = `${buttonRect.left}px`;
        modal.style.bottom = `${window.innerHeight - buttonRect.top + 10}px`;

        // 确保弹窗不会超出屏幕边界
        const modalWidth = 400;
        if (buttonRect.left + modalWidth > window.innerWidth) {
            modal.style.left = `${window.innerWidth - modalWidth - 20}px`;
        }
        if (buttonRect.left < 0) {
            modal.style.left = "20px";
        }
    }

    // 添加事件监听器
    const closeBtn = modal.querySelector(".close-btn") as HTMLButtonElement;
    const copyBtn = modal.querySelector(".copy-btn") as HTMLButtonElement;

    const closeModal = () => {
        if (optimizationModal) {
            optimizationModal.remove();
            optimizationModal = null;
        }
    };

    closeBtn?.addEventListener("click", closeModal);

    copyBtn?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(optimizedPrompt);
            copyBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                已复制
            `;
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    复制内容
                `;
            }, 2000);
        } catch (error) {
            console.error("复制失败:", error);
        }
    });

    // 点击弹窗外部关闭
    const handleClickOutside = (event: MouseEvent) => {
        if (!modal.contains(event.target as Node)) {
            closeModal();
            document.removeEventListener("click", handleClickOutside);
        }
    };

    // 延迟添加点击外部监听，避免立即触发
    setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
    }, 100);

    // ESC键关闭
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            closeModal();
            document.removeEventListener("keydown", handleKeydown);
        }
    };
    document.addEventListener("keydown", handleKeydown);

    // 添加到页面
    document.body.appendChild(modal);
    optimizationModal = modal;
};

export default defineContentScript({
    matches: ["*://*/*"],
    /* main 函数会在以下时机触发：
        当匹配的网页完成加载后（页面 DOM 构建完成时）
        当用户导航到匹配的新页面时
        当页面从历史记录中恢复时（比如用户点击浏览器的后退按钮）*/
    async main(_ctx) {
        const currPlatform = isValidURL(window.location.href);
        if (!currPlatform) return;
        // 初始化 Toast 容器
        initToast();
        mixin(currPlatform);
    },
});
