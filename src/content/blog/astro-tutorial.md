---
title: 'Astro 入门教程'
description: '学习如何使用 Astro 构建高性能静态网站'
pubDate: 2026-03-02
tags: ['Astro', '教程', '前端']
category: '技术'
image: '/images/astro-tutorial.jpg'
---

## 什么是 Astro？

Astro 是一个现代化的静态站点生成器，专为内容驱动的网站设计。

### 为什么选择 Astro？

1. **零 JS 发送** - 默认情况下不发送 JavaScript 到客户端
2. **岛屿架构** - 可以在页面中嵌入交互式组件
3. **快速构建** - 基于现代构建工具，构建速度快
4. **框架无关** - 支持 React、Vue、Svelte 等多种框架

### 基本用法

```astro
---
// Frontmatter - 服务端代码
const title = 'Hello Astro'
---

<!-- 模板 - HTML -->
<h1>{title}</h1>
<p>这是一个 Astro 页面</p>

<style>
  /* 作用域样式 */
  h1 {
    color: #0ea5e9;
  }
</style>

<script>
  // 客户端脚本
  console.log('Hello from client')
</script>
```

---

继续探索 Astro 的更多功能！
