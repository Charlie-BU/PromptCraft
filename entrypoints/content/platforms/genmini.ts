export const getGenminiDOM = () => {
    const textareas =
        document.querySelectorAll<HTMLElement>("div");
    const textareaChildren = Array.from(textareas).filter(
        (ta) => ta.getAttribute('data-placeholder')
    )[0]?.children;
    const textarea = textareaChildren ? Array.from(textareaChildren)[0] as HTMLElement : null;
    const buttonContainer = document.querySelectorAll<HTMLElement>('speech-dictation-mic-button')?.[0]?.closest(".mic-button-container") as HTMLElement;
    return {
        textarea,   
        buttonContainer,
    };
};
