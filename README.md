# PromptCraft - 专业级AI提示词优化工具

> 让每个人都能写出专家级提示词

[![Vue 3](https://img.shields.io/badge/Vue-3.5.21-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![WXT](https://img.shields.io/badge/WXT-0.20.6-FF6B35?style=flat-square)](https://wxt.dev/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=google-chrome)](https://developer.chrome.com/docs/extensions/)

## 🚀 产品概述

**PromptCraft** 是一款专业级的AI提示词优化Chrome扩展，通过智能算法将普通提示词转化为结构化、高效的专业提示词。支持ChatGPT、Gemini、DeepSeek、豆包等主流AI平台，为用户提供一键式的提示词优化体验。

### ✨ 核心特性

- 🎯 **智能优化引擎** - 基于多种AI模型的专业提示词优化算法
- 🌐 **多平台支持** - 支持ChatGPT、Gemini、DeepSeek、豆包四大主流AI平台
- ⚡ **一键式体验** - 在AI聊天界面直接注入优化按钮，无需切换页面
- 🔄 **实时反馈** - 智能Toast通知系统，提供即时操作反馈
- 🎨 **现代化UI** - 采用玻璃拟态设计，提供优雅的用户体验
- 🛡️ **隐私安全** - 所有数据处理均在本地完成，保护用户隐私

## 📊 项目架构

### 🏗️ 技术栈

**前端框架**
- **Vue 3** + **TypeScript** - 现代化响应式前端开发
- **Arco Design** - 企业级UI组件库
- **VueUse** - Vue组合式API工具集
- **Vite** - 快速构建工具

**扩展技术**
- **WXT框架** - 简化Chrome扩展开发流程
- **Manifest V3** - 最新Chrome扩展标准
- **Content Scripts** - 页面内容智能注入
- **Background Service** - 后台API调用服务

**AI集成**
- 支持6种主流AI模型（DeepSeek、Kimi、讯飞星火、Llama等）
- 统一API接口设计
- 智能模型切换机制

### 📁 项目结构

```
PromptOptimization/
├── entrypoints/          # 扩展入口点
│   ├── popup/           # 弹窗界面
│   ├── background.ts    # 后台服务
│   └── content/         # 内容脚本
│       ├── index.ts     # 主入口
│       └── platforms/   # 平台适配
├── utils/               # 工具函数
│   ├── config.ts        # 配置管理
│   ├── prompts.ts       # 提示词模板
│   └── utils.ts         # 通用工具
├── components/          # Vue组件
├── hooks/              # 组合式API钩子
├── assets/             # 静态资源
└── public/             # 公共资源
```

## 🎯 功能模块

### 1. AI提示词优化引擎
- **智能分析** - 自动识别提示词结构和意图
- **专业优化** - 将模糊描述转化为清晰的分点指令
- **格式标准化** - 确保输出符合专业提示词规范
- **多语言支持** - 支持中英文提示词优化

### 2. 多平台智能适配
- **ChatGPT** - 完美适配OpenAI ChatGPT界面
- **Gemini** - 支持Google Gemini聊天界面
- **DeepSeek** - 适配DeepSeek AI平台
- **豆包** - 支持字节跳动豆包AI助手

### 3. 用户体验优化
- **防抖处理** - 避免频繁操作导致的性能问题
- **加载状态** - 优化按钮提供清晰的加载反馈
- **错误处理** - 完善的错误提示和恢复机制
- **响应式设计** - 适配不同屏幕尺寸

## 👥 目标用户

### 主要用户群体
1. **AI重度使用者** - 频繁使用ChatGPT等AI工具的专业人士
2. **内容创作者** - 需要优化提示词以获得更好AI输出的创作者
3. **开发者和研究人员** - 需要精确控制AI行为的技术人员
4. **企业用户** - 需要标准化AI交互流程的团队

### 解决的核心痛点
- ❌ **提示词质量不稳定** → ✅ 专业优化算法保证质量
- ❌ **多平台操作繁琐** → ✅ 一键式优化体验
- ❌ **学习成本高** → ✅ 自动化智能优化
- ❌ **效果难以预测** → ✅ 结构化输出保证效果

## 🛠️ 开发指南

### 环境要求
- Node.js >= 16.0.0
- pnpm >= 7.0.0
- Chrome浏览器 >= 88

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd PromptOptimization

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 打包扩展
pnpm zip
```

### 开发模式
1. 运行 `pnpm dev` 启动开发服务器
2. 打开Chrome浏览器，进入 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"，选择 `.output/chrome-mv3-dev` 目录

### Firefox支持
```bash
# Firefox开发模式
pnpm dev:firefox

# Firefox构建
pnpm build:firefox
```

## 📈 产品定位

**产品定位**: 专业级AI提示词优化工具  
**目标市场**: B端专业用户 + C端高频AI用户  
**核心价值**: "让每个人都能写出专家级提示词"  
**竞争优势**: 多平台支持 + 实时优化 + 专业算法 + 隐私安全

## 🔮 未来规划

### 短期目标 (1-3个月)
- [ ] 支持更多AI平台 (Claude, Perplexity等)
- [ ] 添加提示词模板库
- [ ] 优化算法性能
- [ ] 增加用户使用统计

### 中期目标 (3-6个月)
- [ ] 开发Firefox版本
- [ ] 添加团队协作功能
- [ ] 支持自定义优化规则
- [ ] 多语言界面支持

### 长期目标 (6-12个月)
- [ ] 开发移动端应用
- [ ] 构建提示词社区
- [ ] AI模型微调服务
- [ ] 企业级解决方案

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与项目开发。

## 📞 联系我们

- **作者**: Charlie.BU
- **邮箱**: [your-email@example.com]
- **项目主页**: [GitHub Repository]
- **问题反馈**: [GitHub Issues]

---

<div align="center">
  <p>🌟 如果这个项目对你有帮助，请给我们一个星标！</p>
  <p>Made with ❤️ by Charlie.BU</p>
</div>
