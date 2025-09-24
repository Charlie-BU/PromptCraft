# PromptCraft - Professional AI Prompt Optimization Tool

> Empowering everyone to write expert-level prompts

[![Vue 3](https://img.shields.io/badge/Vue-3.5.21-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![WXT](https://img.shields.io/badge/WXT-0.20.6-FF6B35?style=flat-square)](https://wxt.dev/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=google-chrome)](https://developer.chrome.com/docs/extensions/)

**Language**: [中文](README.md) | **English**

## 🚀 Product Overview

**PromptCraft** is a professional-grade AI prompt optimization Chrome extension that transforms ordinary prompts into structured, efficient professional prompts through intelligent algorithms. It supports mainstream AI platforms including ChatGPT, Gemini, DeepSeek, and Doubao, providing users with a one-click prompt optimization experience.

### ✨ Core Features

- 🎯 **Intelligent Optimization Engine** - Professional prompt optimization algorithms based on multiple AI models
- 🌐 **Multi-Platform Support** - Supports four major AI platforms: ChatGPT, Gemini, DeepSeek, and Doubao
- ⚡ **One-Click Experience** - Direct injection of optimization buttons into AI chat interfaces without page switching
- 🔄 **Real-Time Feedback** - Intelligent Toast notification system providing instant operation feedback
- 🎨 **Modern UI** - Glassmorphism design for an elegant user experience
- 🛡️ **Privacy & Security** - All data processing completed locally to protect user privacy

## 📊 Project Architecture

### 🏗️ Tech Stack

**Frontend Framework**
- **Vue 3** + **TypeScript** - Modern reactive frontend development
- **Arco Design** - Enterprise-grade UI component library
- **VueUse** - Vue composition API utilities
- **Vite** - Fast build tool

**Extension Technology**
- **WXT Framework** - Simplified Chrome extension development workflow
- **Manifest V3** - Latest Chrome extension standard
- **Content Scripts** - Intelligent page content injection
- **Background Service** - Background API calling service

**AI Integration**
- Support for 6 mainstream AI models (DeepSeek, Kimi, iFlytek Spark, Llama, etc.)
- Unified API interface design
- Intelligent model switching mechanism

### 📁 Project Structure

```
PromptOptimization/
├── entrypoints/          # Extension entry points
│   ├── popup/           # Popup interface
│   ├── background.ts    # Background service
│   └── content/         # Content scripts
│       ├── index.ts     # Main entry
│       └── platforms/   # Platform adapters
├── utils/               # Utility functions
│   ├── config.ts        # Configuration management
│   ├── prompts.ts       # Prompt templates
│   └── utils.ts         # Common utilities
├── components/          # Vue components
├── hooks/              # Composition API hooks
├── assets/             # Static assets
└── public/             # Public resources
```

## 🎯 Feature Modules

### 1. AI Prompt Optimization Engine
- **Intelligent Analysis** - Automatically identifies prompt structure and intent
- **Professional Optimization** - Transforms vague descriptions into clear, structured instructions
- **Format Standardization** - Ensures output meets professional prompt standards
- **Multi-Language Support** - Supports both Chinese and English prompt optimization

### 2. Multi-Platform Intelligent Adaptation
- **ChatGPT** - Perfect adaptation to OpenAI ChatGPT interface
- **Gemini** - Support for Google Gemini chat interface
- **DeepSeek** - Adaptation to DeepSeek AI platform
- **Doubao** - Support for ByteDance Doubao AI assistant

### 3. User Experience Optimization
- **Debounce Processing** - Prevents performance issues from frequent operations
- **Loading States** - Optimization buttons provide clear loading feedback
- **Error Handling** - Comprehensive error prompts and recovery mechanisms
- **Responsive Design** - Adapts to different screen sizes

## 👥 Target Users

### Primary User Groups
1. **Heavy AI Users** - Professionals who frequently use ChatGPT and other AI tools
2. **Content Creators** - Creators who need to optimize prompts for better AI output
3. **Developers and Researchers** - Technical personnel who need precise control over AI behavior
4. **Enterprise Users** - Teams that need to standardize AI interaction workflows

### Core Pain Points Solved
- ❌ **Inconsistent prompt quality** → ✅ Professional optimization algorithms ensure quality
- ❌ **Cumbersome multi-platform operations** → ✅ One-click optimization experience
- ❌ **High learning curve** → ✅ Automated intelligent optimization
- ❌ **Unpredictable results** → ✅ Structured output guarantees effectiveness

## 🛠️ Development Guide

### Environment Requirements
- Node.js >= 16.0.0
- pnpm >= 7.0.0
- Chrome Browser >= 88

### Quick Start

```bash
# Clone the project
git clone <repository-url>
cd PromptOptimization

# Install dependencies
pnpm install

# Development mode
pnpm dev

# Build production version
pnpm build

# Package extension
pnpm zip
```

### Development Mode
1. Run `pnpm dev` to start the development server
2. Open Chrome browser and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked extension" and select the `.output/chrome-mv3-dev` directory

### Firefox Support
```bash
# Firefox development mode
pnpm dev:firefox

# Firefox build
pnpm build:firefox
```

## 📈 Product Positioning

**Product Positioning**: Professional AI prompt optimization tool  
**Target Market**: B2B professional users + C2C high-frequency AI users  
**Core Value**: "Empowering everyone to write expert-level prompts"  
**Competitive Advantages**: Multi-platform support + Real-time optimization + Professional algorithms + Privacy security

## 🤝 Contributing

We welcome all forms of contributions! Please check [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to participate in project development.

## 📞 Contact Us

- **Author**: Charlie.BU
- **Personal Website**: [https://charliebu.cn](https://charliebu.cn)
- **Issue Feedback**: [GitHub Issues](https://github.com/Charlie-BU/PromptOptimization/issues)

---

<div align="center">
  <p>🌟 If this project helps you, please give us a star!</p>
  <p>Made with ❤️ by Charlie.BU</p>
</div>