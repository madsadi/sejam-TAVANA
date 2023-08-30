import getConfig from "next/config";
const { publicRuntimeConfig: config } = getConfig();
// console.log("config:", JSON.stringify(config));

export const IDP_URL =
    typeof window !== "undefined" ? window._env_?.IdpEndPoint ? window._env_?.IdpEndPoint: config.app?.IdpEndPoint: config.app?.IdpEndPoint;

export const SEJAM_URL =
    typeof window !== "undefined"
        ? window._env_?.SejamGatewayEndPoint
            ? window._env_?.SejamGatewayEndPoint
            : config.app?.SejamGatewayEndPoint
        : config.app?.SejamGatewayEndPoint;

export const FILE_SERVER_URL =
    typeof window !== "undefined"
        ? window._env_?.FileManagerEndPoint
            ? window._env_?.FileManagerEndPoint
            : config.app?.FileManagerEndPoint
        : config.app?.FileManagerEndPoint;

export const CAPTCHA_URL =
    typeof window !== "undefined"
        ? window._env_?.CaptchaEndPoint
            ? window._env_?.CaptchaEndPoint
            : config.app?.CaptchaEndPoint
        : config.app?.CaptchaEndPoint;
