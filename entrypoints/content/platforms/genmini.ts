export const getGenminiDOM = () => {
    const divs =
        document.querySelectorAll<HTMLElement>("div");
    const textarea = Array.from(divs).filter(
        (ta) => ta.getAttribute('data-placeholder')
    )[0] as HTMLElement;

    const buttonContainer = document.querySelector<HTMLElement>('.input-buttons-wrapper-bottom')?.parentElement as HTMLElement;
    return {
        textarea,   
        buttonContainer,
    };
};
