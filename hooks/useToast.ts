import { ref } from "vue";

export interface ToastItem {
    id: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    duration?: number;
}

interface ToastOptions {
    message: string;
    type: "info" | "success" | "warning" | "error";
    duration?: number;
}

// 全局状态
const toasts = ref<ToastItem[]>([]);
const timers = new Map<string, NodeJS.Timeout>();

const generateId = () =>
    `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useToast = () => {
    const addToast = (options: ToastOptions) => {
        const id = generateId();
        const duration = options.duration ?? 1000;

        const toast: ToastItem = {
            id,
            message: options.message,
            type: options.type,
            duration,
        };

        toasts.value.unshift(toast);

        // 自动移除
        if (duration > 0) {
            const timer = setTimeout(() => {
                removeToast(id);
            }, duration);
            timers.set(id, timer);
        }

        return id;
    };

    const removeToast = (id: string) => {
        const index = toasts.value.findIndex((toast) => toast.id === id);
        if (index > -1) {
            toasts.value.splice(index, 1);
            const timer = timers.get(id);
            if (timer) {
                clearTimeout(timer);
                timers.delete(id);
            }
        }
    };

    const clearAllToasts = () => {
        toasts.value = [];
        timers.forEach((timer) => clearTimeout(timer));
        timers.clear();
    };

    // 便捷方法
    const info = (message: string, duration?: number) =>
        addToast({ message, type: "info", duration });

    const success = (message: string, duration?: number) =>
        addToast({ message, type: "success", duration });

    const warning = (message: string, duration?: number) =>
        addToast({ message, type: "warning", duration });

    const error = (message: string, duration?: number) =>
        addToast({ message, type: "error", duration });

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        info,
        success,
        warning,
        error,
    };
};

// 导出全局实例
export const toast = {
    info: (message: string, duration?: number) =>
        useToast().info(message, duration),
    success: (message: string, duration?: number) =>
        useToast().success(message, duration),
    warning: (message: string, duration?: number) =>
        useToast().warning(message, duration),
    error: (message: string, duration?: number) =>
        useToast().error(message, duration),
    remove: (id: string) => useToast().removeToast(id),
    clear: () => useToast().clearAllToasts(),
};
