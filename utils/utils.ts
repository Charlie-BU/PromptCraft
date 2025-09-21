export const parseOptimizeRes = (
    res_content: string
): { status_code: number; optimized_prompt: string | null; explanation: string | null } => {
    try {
        const { status_code, optimized_prompt, explanation } = JSON.parse(res_content);
        return {
            status_code,
            optimized_prompt,
            explanation,
        };
    } catch (error) {
        console.error("parse optimize res failed:", error);
        return {
            status_code: 500,
            optimized_prompt: null,
            explanation: null,
        };
    }
};
