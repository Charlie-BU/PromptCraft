import { createApp } from "vue";
import { callModel } from "@/entrypoints/background";
import { parseOptimizeRes } from "@/utils/utils";
import { toast } from "@/composables/useToast";
import aiIcon from "@/assets/icons/ai.png";

let textarea: HTMLTextAreaElement | null = null;
let buttonContainer: HTMLElement | null = null;




export const mixin = () => {    
    textarea =
        (document.querySelector(
            "#root > div > div > div.c3ecdb44 > div._7780f2e > div > div > div._9a2f8e4 > div.aaff8b8f > div > div > div._24fad49 > textarea"
        ) as HTMLTextAreaElement) ||
        (document.querySelector(
            "#root > div > div > div.c3ecdb44 > div._7780f2e > div > div._3919b83 > div > div._0f72b0b.ds-scroll-area > div._871cbca > div.aaff8b8f > div > div > div._24fad49 > textarea"
        ) as HTMLTextAreaElement);

    buttonContainer =
        (document.querySelector(
            "#root > div > div > div.c3ecdb44 > div._7780f2e > div > div > div._9a2f8e4 > div.aaff8b8f > div > div > div.ec4f5d61 > div"
        ) as HTMLElement) ||
        (document.querySelector(
            "#root > div > div > div.c3ecdb44 > div._7780f2e > div > div._3919b83 > div > div._0f72b0b.ds-scroll-area > div._871cbca > div.aaff8b8f > div > div > div.ec4f5d61 > div"
        ) as HTMLElement);

    if (textarea && buttonContainer) {
        injectButton(buttonContainer);
    } else {
        console.error("textarea or buttonContainer not found");
        setTimeout(mixin, 1000);
    }
};

const injectButton = (container: HTMLElement) => {
    if (!container) {
        console.error("container not found");
        return;
    }
    const button = document.createElement("img");
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
        toast.warning("请先输入提示词内容");
        return;
    }
    
    // 显示生成中状态
    const loadingToastId = toast.warning("正在优化提示词，请稍候...", 0); // 0 表示不自动消失
    
    try {
        const res = await callModel(prompt);
        if (res) {
            const { optimized_prompt, explanation } = parseOptimizeRes(res);
            console.log(
                "optimized_prompt:",
                optimized_prompt,
                "explanation:",
                explanation
            );
            if (optimized_prompt) {
                textarea.value = optimized_prompt;
                // 显示成功状态
                toast.success("提示词优化完成！");
            } else {
                toast.error("优化失败：未获取到有效的优化结果");
            }
        } else {
            toast.error("优化失败：服务器未返回结果");
        }
    } catch (error) {
        console.error("optimize prompt failed:", error);
        toast.error("优化失败：" + (error instanceof Error ? error.message : "未知错误"));
    } finally {
        // 清除生成中状态的 toast（如果需要手动清除）
        // 注意：由于 useToast 没有提供根据 ID 删除的方法，我们使用 duration 为 0 的方式
        // 在实际使用中，warning 类型的 toast 会在成功或失败后被新的 toast 覆盖
    }
};
