import { ofetch } from "ofetch";
import { modelName, apiKey, baseURL } from "@/utils/config";
import * as prompts from "@/utils/prompts";

export default defineBackground(() => {
    // 处理来自 popup 和 content script 的消息
    browser.runtime.onMessage.addListener((_request, _sender, _sendResponse) => {
        async () => {};
    });
});

// 在background中发起的请求不会有CORS跨域限制
export const callModel = async (prompt_raw: string) => {
    try {
        const response = await ofetch(`${baseURL}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: modelName,
                messages: [
                    {
                        role: "system",
                        content: prompts.contents.systemInitPrompt,
                    },
                    { role: "user", content: prompt_raw },
                ],
                temperature: 0.3,
                stream: false,
                // 返回JSON
                response_format: {
                    type: "json_object"
                },
            }),
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Stream request failed:", error);
        throw new Error(error instanceof Error ? error.message : "Stream request failed");
    }
};