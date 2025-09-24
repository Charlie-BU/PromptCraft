export const getChatGPTDOM = () => {
    const textarea = document.getElementById("prompt-textarea") as HTMLElement;
    
    const divs = document.querySelectorAll<HTMLElement>('div');
    const buttonContainer = Array.from(divs).filter(
        (div) => div.getAttribute('data-testid') === 'composer-speech-button-container'
    )[0]?.parentElement as HTMLElement;
    return {
        textarea,   
        buttonContainer,
    };
};
