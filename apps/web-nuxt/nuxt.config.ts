// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src',

  devServer: {
    port: 8081,
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  typescript: {
    tsConfig: {
      extends: 'tsconfig/nuxt.json',
    },

    typeCheck: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    layoutTransition: {
      name: 'slide-right',
      mode: 'out-in',
    },
  },

  css: ['~/assets/scss/main.scss'],
});
