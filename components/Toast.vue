<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast" tag="div" class="toast-list">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type}`]"
          @click="removeToast(toast.id)"
        >
          <div class="toast__icon">
            <IconCheckCircle v-if="toast.type === 'success'" />
            <IconLoading v-else-if="toast.type === 'info'" />
            <IconExclamationCircle v-else-if="toast.type === 'warning'" />
            <IconCloseCircle v-else-if="toast.type === 'error'" />
          </div>
          <div class="toast__content">
            <p class="toast__message">{{ toast.message }}</p>
          </div>
          <button class="toast__close" @click.stop="removeToast(toast.id)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { useToast } from '@/hooks/useToast'

import {
  IconCheckCircle,
  IconLoading,
  IconExclamationCircle,
  IconCloseCircle
} from '@arco-design/web-vue/es/icon'

const { toasts, removeToast } = useToast()
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 300px;
  max-width: 400px;
  word-wrap: break-word;
}

.toast:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.toast--info {
  background: rgba(219, 234, 254, 1);
  color: rgba(30, 64, 175, 1);
  border: none;
}

.toast--success {
  background: rgba(220, 252, 231, 1);
  color: rgba(22, 101, 52, 1);
  border: none;
}

.toast--warning {
  background: rgba(254, 243, 199, 1);
  color: rgba(146, 64, 14, 1);
  border: none;
}

.toast--error {
  background: rgba(254, 226, 226, 1);
  color: rgba(153, 27, 27, 1);
  border: none;
}

.toast__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.toast__icon svg {
  width: 100%;
  height: 100%;
}

.toast__content {
  flex: 1;
  min-width: 0;
}

.toast__message {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}

.toast__close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.toast__close:hover {
  opacity: 1;
}

.toast__close svg {
  width: 100%;
  height: 100%;
}

/* 动画效果 */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    right: 10px;
  }
  
  .toast-list {
    max-width: none;
  }
  
  .toast {
    min-width: auto;
    max-width: none;
    margin: 0 10px;
  }
}

@media (max-width: 480px) {
  .toast {
    padding: 12px;
    gap: 8px;
  }
  
  .toast__message {
    font-size: 13px;
  }
  
  .toast__icon {
    width: 20px;
    height: 20px;
  }
  
  .toast__close {
    width: 18px;
    height: 18px;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .toast {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .toast:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .toast {
    border: 2px solid currentColor;
  }
}

/* 减少动画模式 */
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move,
  .toast {
    transition: none !important;
  }
}
</style>