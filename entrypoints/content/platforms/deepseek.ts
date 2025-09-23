export const getDeepseekDOM = () => {
    const textareas =
        document.querySelectorAll<HTMLTextAreaElement>("textarea");
    const textarea = Array.from(textareas).filter(
        (ta) => ta.placeholder === "给 DeepSeek 发送消息 "
    )[0];
    const buttonContainer = document.querySelector('.bf38813a') as HTMLElement;

    return {
        textarea,   
        buttonContainer,
    };
};
