export const parseOptimizeRes = (
    res_content: string
): {
    status_code: number;
    optimized_prompt: string | null;
    explanation: string | null;
} => {
    try {
        const { status_code, optimized_prompt, explanation } =
            JSON.parse(res_content);
        return {
            status_code,
            optimized_prompt,
            explanation,
        };
    } catch (error) {
        console.error("parse optimize res failed:", error);
        return {
            status_code: 500,
            optimized_prompt: null,
            explanation: null,
        };
    }
};

export const setTextareaValue = (DOM: HTMLTextAreaElement | HTMLElement, text: string) => {
    if (!DOM) {
        console.warn(`未找到元素: ${DOM}`);
        return;
    }
    // 设置 textarea 的值
    if (DOM instanceof HTMLTextAreaElement) {
        DOM.value = text;
    } else if (DOM instanceof HTMLElement) {
        DOM.textContent = text;
    }
    // 触发 input 事件（兼容 React/Vue 等框架）
    const event = new Event("input", { bubbles: true });
    DOM.dispatchEvent(event);
    // 触发 change 事件
    const changeEvent = new Event("change", { bubbles: true });
    DOM.dispatchEvent(changeEvent);
};

export const setTextareaLoadingStyle = (DOM: HTMLTextAreaElement | HTMLElement, loading: boolean) => {
    if (!DOM) {
        console.warn(`未找到元素: ${DOM}`);
        return;
    }
    
    if (loading) {
        // 创建动态波浪效果的CSS动画
        const style = document.createElement('style');
        style.id = 'textarea-loading-animation';
        
        // 如果已存在相同ID的style，先移除
        const existingStyle = document.getElementById('textarea-loading-animation');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        style.textContent = `
            @keyframes textWave {
                0% { color: #4a5058; }
                10% { color: #535861; }
                20% { color: #7f8491; }
                30% { color: #b0b7c8; }
                40% { color: #bac2d6; }
                50% { color: #c0c8db; }
                60% { color: #bac2d6; }
                70% { color: #b0b7c8; }
                80% { color: #7f8491; }
                90% { color: #535861; }
                100% { color: #4a5058; }
            }
            
            .textarea-loading {
                animation: textWave 6s ease-in-out infinite;
                background: linear-gradient(
                    90deg,
                    #4a5058 0%,
                    #535861 10%,
                    #7f8491 20%,
                    #b0b7c8 30%,
                    #bac2d6 40%,
                    #c0c8db 50%,
                    #bac2d6 60%,
                    #b0b7c8 70%,
                    #7f8491 80%,
                    #535861 90%,
                    #4a5058 100%
                );
                background-size: 300% 100%;
                animation: textWave 6s ease-in-out infinite, 
                          backgroundWave 6s ease-in-out infinite;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            @keyframes backgroundWave {
                0% { background-position: 300% 0; }
                50% { background-position: 0% 0; }
                100% { background-position: -300% 0; }
            }
        `;
        
        document.head.appendChild(style);
        DOM.classList.add('textarea-loading');
    } else {
        // 移除loading样式
        DOM.classList.remove('textarea-loading');
        DOM.style.color = "#0d0d0d";
        
        // 移除动画样式
        const style = document.getElementById('textarea-loading-animation');
        if (style) {
            style.remove();
        }
    }
}
