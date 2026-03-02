import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    vue({
      propsDestructure: false
    }),
    tailwind(),
    mdx()
  ],
  site: 'https://your-site.netlify.app',
  base: '/',
  build: {
    format: 'directory'
  },
  compressHTML: true,
  trailingSlash: 'ignore',
  vite: {
    build: {
      assetsInlineLimit: 4096
    },
    define: {
      __APP_VERSION__: JSON.stringify('1.0.0')
    }
  }
});
