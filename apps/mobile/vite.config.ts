/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import checker from 'vite-plugin-checker';

const resolve = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
  server: {
    host: true,
    port: 8082,

    fs: {
      allow: ['../..'],
    },
  },

  base: process.env.VITE_IS_ELECTRON_APP ? './' : '/',
  clearScreen: true,
  assetsInclude: /\.(pdf|jpg|png|svg)$/,

  resolve: {
    alias: {
      '@/': `${resolve('./src')}/`,
    },
  },

  publicDir: resolve('./src/public'),

  plugins: [
    Vue({
      template: {
        transformAssetUrls,
      },
    }),

    process.env.VITE_DISABLE_VUE_TSC
      ? null
      : checker({
          vueTsc: true,
        }),

    VueI18nPlugin({
      defaultSFCLang: 'yml',
      include: resolve('./src/locales/**'),
    }),

    quasar({
      sassVariables: resolve('./src/assets/quasar.scss'),
    }),

    AutoImport({
      dts: resolve('./src/auto-imports.d.ts'),
      imports: ['vue', 'vue-router'],
    }),

    Components({
      dts: resolve('./src/components.d.ts'),
      dirs: ['src/app/components'],
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
