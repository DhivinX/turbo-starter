interface Config {
  defaultLocale: string;
  useCookies: boolean;
  api: {
    host: string;
    port: number;
  };
}

export const config: Config = {
  defaultLocale: import.meta.env.VITE_WEB_DEFAULT_LOCALE ?? 'en',
  useCookies: !import.meta.env.VITE_IS_ELECTRON_APP,

  api: {
    host: import.meta.env.VITE_WEB_API_URL ?? 'http://localhost',
    port: import.meta.env.VITE_WEB_API_PORT ?? 3000,
  },
};
