/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line
    const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@intlify/unplugin-vue-i18n/messages' {
  import { LocaleMessage } from '@intlify/core-base';
  import { VueMessageType } from 'vue-i18n';
  const messages: { [x: string]: LocaleMessage<VueMessageType> };
  export default messages;
}
