import axios from "axios";
import _ from "lodash";

import { MobileActions } from "../../utils/mobile-actions";

export const authUrl = `https://clientid2.berekebank.kz/auth/realms/sberid`;

export const setTokens = (accessToken, refreshToken, username) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);

  if (username) {
    localStorage.setItem("username", username);
  }
};

export const removeTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const getUsername = () => {
  return localStorage.getItem("username");
};

export const getLanguage = () => {
  return localStorage.getItem("language") || "ru";
};

export const getAntiFraud = () => {
  const defaultAntiFraud =
    "ewogICJDb21wcm9taXNlZCIgOiAxLAogICJIYXJkd2FyZUlEIiA6ICJBMjUyMkY3Ni00MzRBLTQ0NTQtQkM0OS1ERTA1QTEzQzdGMEYiLAogICJEZXZpY2VNb2RlbCIgOiAiU2ltdWxhdG9yIiwKICAiQWdlbnRBcHBJbmZvIiA6ICJBbGwgSW4gMiBJbnRlbCB4ODYtNjRoIEhhc3dlbGwiLAogICJUaW1lWm9uZSIgOiAiMzYwIiwKICAiTG9jYWxJUHY0IiA6ICIxOTIuMTY4LjEuNDgiLAogICJMb2NhbElQdjYiIDogImZlODA6OjE0MDA6ZGI0YTo5Njg6ZWNhMyIsCiAgIkFnZW50Q29ubmVjdGlvblR5cGUiIDogIldpZmkiLAogICJEZXZpY2VTeXN0ZW1WZXJzaW9uIiA6ICIxMy42IiwKICAiQXBwS2V5IiA6ICJja040N3lIWjdOTVMxelE2N0tkVE01RU0xWmlEZFlGVSIsCiAgIkFkdmVydGlzZXJJZCIgOiAiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwKICAiT1NGb250c0hhc2giIDogImI4NzAxMzc4YTVkMjA0Y2UxNzNiOGE2YTc2MWRiM2RjIiwKICAiTG9jYXRpb25IYXNoIiA6ICJiNjM0MTU4NDcwYWNjODM4NzY3ZjIxOWY3YWY0N2U1ZWYxOTczNWNjMDI1YzEyZGE5MDMyOTQ0YWVmMjY0MjA2IiwKICAiQWdlbnRTaWduYWxTdHJlbmd0aENlbGx1bGFyIiA6ICItMSIsCiAgIkVtdWxhdG9yIiA6IDEsCiAgIk11bHRpdGFza2luZ1N1cHBvcnRlZCIgOiB0cnVlLAogICJUSU1FU1RBTVAiIDogIjIwMjEtMDEtMTlUMTU6MjQ6MjBaIiwKICAiRGV2aWNlU3lzdGVtTmFtZSIgOiAiaU9TIiwKICAiVGltZVpvbmVEU1RPZmZzZXQiIDogIjAiLAogICJBZ2VudEJvb3RUaW1lIiA6ICIxMDU0NjAuMTc0MDQ2IiwKICAiU2NyZWVuU2l6ZSIgOiAiMzc1IHggNjY3IiwKICAiTGFuZ3VhZ2VzIiA6ICJlbiIsCiAgIkdlb0xvY2F0aW9uSW5mbyIgOiBbCiAgICB7CiAgICAgICJUaW1lc3RhbXAiIDogIjAiLAogICAgICAiU3RhdHVzIiA6ICIwIgogICAgfQogIF0sCiAgIkFnZW50QnJhbmQiIDogIkFwcGxlIiwKICAiU0RLX1ZFUlNJT04iIDogIjEuMy4xMyIsCiAgIlNjcmVlbkNvbG9yRGVwdGgiIDogIjE2LjcgbWlsbGlvbiAoMjQtYml0KSIsCiAgIkRuc0lQIiA6ICIxOTIuMTY4LjEuMSAiLAogICJSZHBDb25uZWN0aW9uIiA6ICIwIiwKICAiT1NfSUQiIDogIjY2QTkzQzk2LTJENzktNDFERC1BRTFFLUVDNjFFNDRFQTM5NiIsCiAgIk9TRm9udHNOdW1iZXIiIDogIjI3NCIsCiAgIlJTQV9BcHBsaWNhdGlvbktleSIgOiAiLTEiLAogICJEZXZpY2VOYW1lIiA6ICJpUGhvbmUgOCIKfQ==";

  if (window.Mobile) {
    return localStorage.getItem("antifraud");
  }

  try {
    const sdkData = window.bzfp?.getData();

    if (sdkData) {
      const urlSearchParams = new URLSearchParams(sdkData);
      const params = Object.fromEntries(urlSearchParams.entries());

      const antiFraudData = {
        AgentBrand: params.pm_br,
        DeviceModel: params.pm_fpua,
        DeviceSystemName: params.pm_os,
        DeviceSystemVersion: params.pm_fpua,
        AppKey: process.env.CLIENT_ID,
        LocalIPv4: "0.0.0.0",
        SDKData: sdkData,
      };

      return btoa(JSON.stringify(antiFraudData));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("Error: couldn't connect Bizone SDK", e);
  }

  return defaultAntiFraud;
};

export const getRequestParams = (grantType) => {
  const params = new URLSearchParams();
  params.append("client_secret", "7febde03-e4c7-46fa-9dca-a64e062a4208");
  params.append("client_id", "sb2-web-110");
  params.append("grant_type", grantType);
  params.append("AntiFraud", getAntiFraud());

  if (grantType === "refresh_token") {
    params.append("username", getUsername());
    params.append("refresh_token", getRefreshToken());
  }

  return params;
};

export function refreshAuthLogic(failedRequest) {
  if (window.Mobile || window.webkit) {
    MobileActions.refreshToken();

    return new Promise((resolve) => {
      window.addEventListener("onTokenResult", () => {
        failedRequest.response.config.headers.Authorization = `Bearer ${getAccessToken()}`;
        resolve();
      });
    });
  }

  const params = getRequestParams("refresh_token");

  return axios
    .post(`${authUrl}/protocol/openid-connect/token`, params, {
      skipAuthRefresh: true,
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
    .then((tokenRefreshResponse) => {
      const accessToken = tokenRefreshResponse.data.access_token;
      const refreshToken = tokenRefreshResponse.data.refresh_token;

      setTokens(accessToken, refreshToken);
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
      return Promise.resolve();
    })
    .catch(() => {
      removeTokens();

      if (!_.includes(window.location.href, "/login")) {
        window.location.reload();
      }
    });
}

export const softTokenRefresh = () => {
  const params = getRequestParams("refresh_token");

  return axios
    .post(`${authUrl}/protocol/openid-connect/token`, params, {
      skipAuthRefresh: true,
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
    .then((tokenRefreshResponse) => {
      const accessToken = tokenRefreshResponse.data.access_token;
      const refreshToken = tokenRefreshResponse.data.refresh_token;

      setTokens(accessToken, refreshToken);
      return Promise.resolve();
    })
    .catch(() => {
      removeTokens();

      return Promise.reject();
    });
};

export function getBrowserInfo() {
  const ua = navigator.userAgent;
  let tem;
  let M =
    ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
    [];

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

    return { type: "IE", version: tem[1] || "" };
  }

  if (M[1] === "Chrome") {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);

    if (tem != null) {
      return { type: tem[1].replace("OPR", "Opera"), version: tem[2] };
    }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];

  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }

  return { type: M[0], version: M[1] };
}

export function generateUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

export const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
