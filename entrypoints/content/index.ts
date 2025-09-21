import { createApp, ref } from "vue";
import Toast from "@/components/Toast.vue";

import * as chatgpt from "./platforms/chatgpt";
import * as genmini from "./platforms/genmini";
import * as deepseek from "./platforms/deepseek";

import { allPlatforms } from "@/utils/config";

// 判断当前URL是否在生效URL列表中
const isValidURL = (currURL: string) => {
    const matchedPlatform = allPlatforms.find((each) =>
        currURL.includes(each.URL)
    );
    return matchedPlatform?.name || null;
};

let toastApp: any = null;
// 初始化 Toast 组件
const initToast = () => {
    // 检查是否已经存在 Toast 容器
    if (document.getElementById('prompt-optimization-toast-container')) {
        return;
    }
    
    // 创建 Toast 容器
    const toast = document.createElement('div');
    toast.id = 'prompt-optimization-toast-container';
    document.body.appendChild(toast);
    
    // 创建并挂载 Vue 应用
    toastApp = createApp(Toast);
    toastApp.mount(toast);
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
        switch (currPlatform) {
            case "ChatGPT": 
                chatgpt.waitForInputBox();
                break;
            case "DeepSeek":
                deepseek.mixin();
                break;
            case "Genmini":
                // genmini.mixin();
                break;
            default:
                break;
        }        
    },
});