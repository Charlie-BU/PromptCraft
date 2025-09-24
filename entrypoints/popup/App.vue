<template>
    <div class="welcome-container">
        <div class="header">
            <h1>PromptCraft</h1>
            <p>Professional AI Prompt Optimization Tool</p>
        </div>

        <div class="platforms-container">
            <div
                v-for="platform in platforms"
                :key="platform.name"
                class="platform-card"
                @click="navigateToPlatform(platform.URL)">
                <div class="platform-icon">
                    <img :src="platform.icon" alt="Platform Icon" />
                </div>
                <div class="platform-info">
                    <h3>{{ platform.name }}</h3>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Empowering everyone to craft expert-level prompts</p>
            <p>2025 © PromptCraft by Charlie.BU</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { allPlatforms } from "@/utils/config";

const platforms = ref(allPlatforms);

const navigateToPlatform = (url) => {
    chrome.tabs.create({ url });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

.welcome-container {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    width: 380px;
    padding: 28px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.15), 
                0 8px 25px rgba(118, 75, 162, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.welcome-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    pointer-events: none;
}

.welcome-container::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}

.header {
    text-align: center;
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
}

.header h1 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 12px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
    letter-spacing: -0.5px;
    line-height: 1.2;
}

.header p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    font-weight: 400;
    letter-spacing: 0.2px;
}

.platforms-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
}

.platform-card {
    display: flex;
    align-items: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    width: calc(50% - 8px);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
}

.platform-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s ease;
}

.platform-card:hover::before {
    left: 100%;
}

.platform-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 48px rgba(102, 126, 234, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
}

.platform-card:active {
    transform: translateY(-4px) scale(0.98);
}

.platform-icon {
    width: 36px;
    height: 36px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    font-size: 20px;
    color: white;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.platform-card:hover .platform-icon {
    transform: rotate(5deg) scale(1.1);
}

.platform-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
}

.platform-info {
    flex: 1;
}

.platform-info h3 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #2d3748;
    letter-spacing: -0.2px;
    transition: color 0.3s ease;
}

.platform-card:hover .platform-info h3 {
    color: #667eea;
}

.platform-info p {
    font-size: 13px;
    color: #718096;
    margin: 0;
    font-weight: 400;
}

.footer {
    text-align: center;
    font-size: 13px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-top: auto;
    position: relative;
    z-index: 1;
    font-weight: 300;
    letter-spacing: 0.3px;
}

.footer p {
    margin: 4px 0;
}

.footer p:first-child {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9);
}

/* 响应式设计 */
@media (max-width: 400px) {
    .welcome-container {
        width: 340px;
        padding: 24px;
    }
    
    .header h1 {
        font-size: 28px;
    }
    
    .platform-card {
        width: 100%;
        margin-bottom: 8px;
    }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
    .platform-card {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.15);
    }
    
    .platform-info h3 {
        color: rgba(255, 255, 255, 0.95);
    }
    
    .platform-info p {
        color: rgba(255, 255, 255, 0.7);
    }
    
    .platform-card:hover .platform-info h3 {
        color: #f093fb;
    }
}
</style>