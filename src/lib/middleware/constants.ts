export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || ``;

export const APP_HOSTNAMES = new Set([
  `app.${APP_DOMAIN}`,
  "localhost:8888",
  "localhost:3000",
  "localhost",
]);

export const DEFAULT_REDIRECTS: { [key: string]: string } = {
  home: `https://${APP_DOMAIN}`,
  signin: `https://app.${APP_DOMAIN}/login`,
  //   login: `app.${APP_DOMAIN}/login`,
  //   register: `app.${APP_DOMAIN}/register`,
  signup: `https://app.${APP_DOMAIN}/register`,
  app: `https://app.${APP_DOMAIN}`,
  dashboard: `https://app.${APP_DOMAIN}`,
};
