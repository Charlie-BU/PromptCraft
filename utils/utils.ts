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

export const setTextareaValue = (DOM: HTMLTextAreaElement, text: string) => {
    if (!DOM) {
        console.warn(`未找到元素: ${DOM}`);
        return;
    }
    // 设置 textarea 的值
    DOM.value = text;
    // 触发 input 事件（兼容 React/Vue 等框架）
    const event = new Event("input", { bubbles: true });
    DOM.dispatchEvent(event);
    // 触发 change 事件
    const changeEvent = new Event("change", { bubbles: true });
    DOM.dispatchEvent(changeEvent);
};

export const setTextareaLoadingStyle = (DOM: HTMLTextAreaElement, loading: boolean) => {
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
                0% { color: #6b7280; }
                25% { color: #4b5563; }
                50% { color: #374151; }
                75% { color: #4b5563; }
                100% { color: #6b7280; }
            }
            
            .textarea-loading {
                animation: textWave 2s ease-in-out infinite;
                background: linear-gradient(
                    90deg,
                    #9ca3af 0%,
                    #6b7280 25%,
                    #4b5563 50%,
                    #6b7280 75%,
                    #9ca3af 100%
                );
                background-size: 200% 100%;
                animation: textWave 2s ease-in-out infinite, 
                          backgroundWave 3s ease-in-out infinite;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            @keyframes backgroundWave {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
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
