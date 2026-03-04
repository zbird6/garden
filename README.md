# GardenX

基于 Astro + Vue 3 构建的个人静态网站，集成博客、图片展示和原生小游戏功能。

## 技术栈

- **Astro** - 核心框架，静态渲染
- **Vue 3** - 轻交互组件（Composition API）
- **Tailwind CSS** - 样式框架
- **Vite** - 构建工具
- **TypeScript** - 类型支持

## 功能特性

### 1. 静态博客

- 使用 Astro Content Collections 管理 Markdown 内容
- 支持标签、分类、日期等元数据
- 自动生成文章路由

### 2. 图片展示

- Vue 3 组件实现图片轮播和原文跳转
- 响应式网格布局
- 灯箱效果查看大图

### 3. 原生小游戏

- 贪吃蛇游戏
- 乒乓球游戏
- HTML5 Canvas + 原生 JavaScript
- Vue 3 响应式状态管理
- 本地存储保存最高分

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:4321

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## Netlify 部署

### 自动部署

1. 将项目推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 点击 Deploy

### 手动部署

1. 运行 `npm run build`
2. 将 `dist` 文件夹拖拽到 Netlify 部署页面

### Netlify 配置

项目包含 `netlify.toml` 配置文件，明确指定了以下设置：

- **构建命令**: `npm run build`
- **发布目录**: `dist`
- **Node 版本**: 18
- **自动 HTTPS**: 开启
- **CDN 加速**: 开启

Netlify 会自动识别此配置，无需额外设置。

## 项目结构

```
gardenx/
├── public/                 # 静态资源
│   └── favicon.svg        # 网站图标
├── src/
│   ├── assets/            # 可打包资源
│   │   └── css/          # CSS 样式文件
│   ├── components/       # Vue 组件
│   │   └── Gallery.vue   # 图片展示组件
│   ├── layouts/         # Astro 页面布局
│   │   └── BaseLayout.astro
│   ├── content/          # 博客内容 (Markdown)
│   │   ├── config.ts    # 内容配置
│   │   └── blog/        # 博客文章
│   ├── games/           # 小游戏模块
│   │   ├── snake/       # 贪吃蛇游戏
│   │   ├── pong/        # 乒乓球游戏
│   │   └── common/      # 公共工具
│   ├── pages/           # 页面路由
│   │   ├── index.astro      # 首页
│   │   ├── blog/           # 博客页面
│   │   ├── gallery.astro   # 图片展示
│   │   └── games/          # 小游戏

│   └── utils/           # 工具函数
│       └── storage.js
├── astro.config.mjs     # Astro 配置
├── tailwind.config.js   # Tailwind 配置
└── package.json         # 项目依赖
```

## 开发指南

### 添加博客文章

在 `src/content/blog/` 目录下创建 Markdown 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
pubDate: 2026-03-03
tags: ['标签1', '标签2']
category: '分类'
---

文章内容...
```

### 添加小游戏

1. 在 `src/games/` 创建新文件夹
2. 创建 `game.js` (游戏逻辑) 和 `index.vue` (Vue 组件)
3. 在 `src/pages/games/index.astro` 中引入组件

### 修改样式

- Tailwind CSS: 直接使用 utility classes
- 组件样式: 组件文件内的 `<style>` 标签
- 全局样式: `src/assets/css/global.css`

## 代码规范

项目配置了 ESLint 和 Prettier：

```bash
# 代码检查
npm run lint

# 代码格式化
npm run format
```

## 许可证

MIT
