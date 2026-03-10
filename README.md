# ZGarden

基于 Astro + Vue 3 构建的个人静态网站，集成博客和原生小游戏功能。

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

### 2. 原生小游戏

- 贪吃蛇游戏 - 经典的贪吃蛇游戏，支持键盘控制和本地存储最高分
- 五子棋游戏 - 人机对战模式，支持基本的 AI 逻辑
- HTML5 Canvas + 原生 JavaScript
- Vue 3 响应式状态管理
- 本地存储保存游戏数据

### 3. 页面设计风格

- **颜色方案**：
  - 主色调：蓝色系 (`sky-500`)
  - 背景色：浅灰色 (`gray-50`)
  - 文本色：深灰色 (`gray-800`)
  - 辅助色：白色 (`white`) 用于卡片和导航栏
  - 强调色：紫色系 (`violet-500`) 用于特殊元素

- **布局结构**：
  - 响应式设计，使用 Tailwind CSS
  - 固定顶部导航栏，带有品牌标识和导航链接
  - 主内容区域，自适应不同屏幕尺寸
  - 底部页脚，包含版权信息

- **组件样式**：
  - 卡片式设计，带有阴影和圆角
  - 统一的按钮样式，带有悬停效果
  - 清晰的视觉层次和空间布局
  - 响应式适配，在移动设备上优化显示

- **字体和排版**：
  - 使用系统字体栈，确保跨平台一致性
  - 清晰的字体层次结构
  - 适当的行高和间距，提升可读性

- **交互效果**：
  - 平滑的过渡动画
  - 悬停效果和状态反馈
  - 一致的用户交互模式

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
- **重定向规则**: 配置了 `/* → /index.html`
- **自动 HTTPS**: 开启
- **CDN 加速**: 开启

Netlify 会自动识别此配置，无需额外设置。

## 项目结构

```
zgarden/
├── public/                 # 静态资源
│   └── favicon.svg        # 网站图标
├── src/
│   ├── assets/            # 可打包资源
│   │   └── css/          # CSS 样式文件
│   ├── components/       # Vue 组件（暂空）
│   ├── layouts/         # Astro 页面布局
│   │   └── BaseLayout.astro
│   ├── content/          # 博客内容 (Markdown)
│   │   ├── config.ts    # 内容配置
│   │   └── blog/        # 博客文章
│   ├── games/           # 小游戏模块
│   │   ├── snake/       # 贪吃蛇游戏
│   │   ├── gomoku/      # 五子棋游戏
│   │   └── common/      # 公共工具
│   ├── pages/           # 页面路由
│   │   ├── index.astro      # 首页
│   │   ├── blog/           # 博客页面
│   │   └── games/          # 小游戏页面
│   │       ├── index.astro  # 游戏列表
│   │       └── [game].astro # 游戏详情（动态路由）
│   └── utils/           # 工具函数
│       └── storage.ts
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
2. 创建 `game.ts` (游戏逻辑) 和 `index.vue` (Vue 组件)
3. 在 `src/pages/games/[game].astro` 中添加游戏路由配置：
   - 导入游戏组件
   - 在 `getStaticPaths` 函数中添加游戏路径
   - 在模板中添加条件渲染逻辑
4. 在 `src/pages/games/index.astro` 中添加游戏卡片

### 页面设计规范

- **颜色使用**：
  - 主色调：`sky-500` (蓝色)
  - 背景色：`gray-50` (浅灰色)
  - 文本色：`gray-800` (深灰色)
  - 卡片背景：`white` (白色)
  - 按钮颜色：使用 `sky-500` 作为主按钮颜色

- **布局规范**：
  - 使用 `container mx-auto px-4` 作为内容容器
  - 卡片式设计使用 `bg-white rounded-lg shadow-md`
  - 响应式布局使用 Tailwind 的断点类

- **组件样式**：
  - 按钮：使用统一的 `btn-primary` 和 `btn-secondary` 类
  - 链接：统一的颜色和悬停效果
  - 卡片：一致的阴影、圆角和间距

- **字体规范**：
  - 标题：使用较大字号和粗体
  - 正文：适当的行高和间距
  - 辅助文字：使用较小字号和浅色

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
