import { createApp } from 'vue';
import { pinia } from './stores';
import router from './router';
import { Quasar, Notify, Dialog } from 'quasar';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { configure as veeConfigure } from 'vee-validate';

import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';
import 'quasar/src/css/index.sass';
import './assets/main.scss';

import App from './app/App.vue';
import { config } from './config';
import { zodErrorMapInit } from './common';

veeConfigure({
  validateOnInput: true,
});

zodErrorMapInit();

const i18n = createI18n({
  locale: config.defaultLocale,
  legacy: false,
  globalInjection: true,
  messages,
});

const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.use(router);

app.use(Quasar, {
  plugins: {
    Notify,
    Dialog,
  },
});

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
