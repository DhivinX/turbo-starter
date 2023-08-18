// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src',

  runtimeConfig: {
    public: {
      apiBase: process.env.PAYLOAD_URL + '/api' || 'http://localhost:3030/api',
    },
  },

  devServer: {
    port: 8081,
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
