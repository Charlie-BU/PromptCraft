// const possibleButtonContainerSelector = [
//     "#chat-route-layout > div > main > div > div > div.inter-rWzItm.\\!overflow-visible > div.h-\\[calc\\(100\\%\\+56px\\)\\].-mt-56.container-arOxqB.chrome70-container > div > div.w-full > div:nth-child(2) > div.flex.flex-col-reverse > div.input-content-container-zs4WWA > div.container-QrxCka > div.editor-container-yj5w_H > div.bottom-wrapper-PqK2vl > div.right-tools-wrapper-HlP9ga > div > div.left-area-H3i4EB > div",
//     "#chat-route-layout > div > main > div > div > div.inter-rWzItm.\\!overflow-visible > div > div > div.w-full > div:nth-child(2) > div.image-new-container-Woaxz7.test > div > div > div.editor-container-yj5w_H > div.bottom-wrapper-PqK2vl > div.right-tools-wrapper-HlP9ga > div > div.left-area-H3i4EB > div",
//     "#chat-route-layout > div > main > div > div > div.inter-rWzItm.\\!overflow-visible > div > div > div.w-full > div:nth-child(2) > div.input-content-container-zs4WWA > div > div.editor-container-yj5w_H > div.bottom-wrapper-PqK2vl > div.right-tools-wrapper-HlP9ga > div > div.left-area-H3i4EB > div",
// ]

export const getDoubaoDOM = () => {
    const textareas =
        document.querySelectorAll<HTMLTextAreaElement>("textarea");
    const textarea = Array.from(textareas).filter(
        (ta) => ta.placeholder === "发消息或输入 / 选择技能"
    )[0];
    const buttonContainer = document.querySelector('[data-testid="asr_btn"]')?.closest('.flex.items-center') as HTMLElement;

    return {
        textarea,   
        buttonContainer,
    };
};
