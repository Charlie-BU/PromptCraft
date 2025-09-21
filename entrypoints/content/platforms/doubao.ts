export const getDoubaoDOM = () => {
    const textareas =
        document.querySelectorAll<HTMLTextAreaElement>("textarea");
    const textarea = Array.from(textareas).filter(
        (ta) => ta.placeholder === "发消息或输入 / 选择技能"
    )[0];

    const buttonContainer =
        (document.querySelector(
            "#chat-route-layout > div > main > div > div > div.inter-rWzItm.\\!overflow-visible > div.h-\\[calc\\(100\\%\\+56px\\)\\].-mt-56.container-arOxqB.chrome70-container > div > div.w-full > div:nth-child(2) > div.flex.flex-col-reverse > div.input-content-container-zs4WWA > div.container-QrxCka > div.editor-container-yj5w_H > div.bottom-wrapper-PqK2vl > div.right-tools-wrapper-HlP9ga > div > div.left-area-H3i4EB > div"
        ) as HTMLElement) ||
        (document.querySelector(
            "#chat-route-layout > div > main > div > div > div.footer-Wl2Pj7 > div > div > div > div:nth-child(3) > div > div.input-content-container-zs4WWA > div.container-QrxCka.guidance-input-yVXP1I > div.editor-container-yj5w_H > div.bottom-wrapper-PqK2vl > div.right-tools-wrapper-HlP9ga > div > div.left-area-H3i4EB > div"
        ) as HTMLElement);

    return {
        textarea,
        buttonContainer,
    };
};
