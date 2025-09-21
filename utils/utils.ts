export const parseOptimizeRes = (
    res_content: string
): { optimized_prompt: string | null; explanation: string | null } => {
    try {
        const { optimized_prompt, explanation } = JSON.parse(res_content);
        return {
            optimized_prompt,
            explanation,
        };
    } catch (error) {
        console.error("parse optimize res failed:", error);
        return {
            optimized_prompt: null,
            explanation: null,
        };
    }
};
