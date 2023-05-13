import getConfig from "next/config";
const { publicRuntimeConfig: config } = getConfig();
// console.log("config:", JSON.stringify(config));

export const IDP_URL =
    typeof window !== "undefined" ? window._env_?.IDP_URL ? window._env_?.IDP_URL: config.app?.IDP_URL: config.app?.IDP_URL;

export const SEJAM_URL =
    typeof window !== "undefined"
        ? window._env_?.SEJAM_URL
            ? window._env_?.SEJAM_URL
            : config.app?.SEJAM_URL
        : config.app?.SEJAM_URL;

export const FILE_SERVER_URL =
    typeof window !== "undefined"
        ? window._env_?.FILE_SERVER_URL
            ? window._env_?.FILE_SERVER_URL
            : config.app?.FILE_SERVER_URL
        : config.app?.FILE_SERVER_URL;

export const CAPTCHA_URL =
    typeof window !== "undefined"
        ? window._env_?.CAPTCHA_URL
            ? window._env_?.CAPTCHA_URL
            : config.app?.CAPTCHA_URL
        : config.app?.CAPTCHA_URL;
