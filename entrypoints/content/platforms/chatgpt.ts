export const getChatGPTDOM = () => {
    const textareas =
        document.querySelectorAll<HTMLElement>("p");
    const textarea = Array.from(textareas).filter(
        (ta) => ta.getAttribute('data-placeholder')
    )[0];
    const buttonContainers = document.querySelectorAll<HTMLElement>('div');
    const buttonContainer = Array.from(buttonContainers).filter(
        (ta) => ta.getAttribute('data-testid') === 'composer-speech-button-container'
    )[0]?.parentElement as HTMLElement;
    return {
        textarea,   
        buttonContainer,
    };
};
