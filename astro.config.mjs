import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    vue({
      propsDestructure: false
    }),
    tailwind()
  ],
  site: 'https://garden.netlify.app',
  base: '/',
  build: {
    format: 'directory'
  },
  compressHTML: true,
  trailingSlash: 'ignore',
  vite: {
    build: {
      assetsInlineLimit: 4096
    }
  }
});
