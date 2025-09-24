export const getDeepseekDOM = () => {
    const textareas =
        document.querySelectorAll<HTMLTextAreaElement>("textarea");
    const textarea = Array.from(textareas).filter(
        (ta) => ta.placeholder.includes("给 DeepSeek 发送消息") ||
        ta.placeholder.includes("Message DeepSeek")
    )[0];       // textarea通常只有一个，但编辑之前的消息时可能会有多个，所以用placeholder筛选

    const buttonContainer = document.querySelector('.bf38813a') as HTMLElement;

    return {
        textarea,   
        buttonContainer,
    };
};
