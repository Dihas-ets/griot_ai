import Axios from "axios";

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));

  return match ? decodeURIComponent(match[1]) : null;
};

const clearStaleSessionCookies = () => {
  if (typeof document === "undefined") return;

  const cookieNames = ["laravel_session", "XSRF-TOKEN", "session", "sanctum"];

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost; SameSite=Lax`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=127.0.0.1; SameSite=Lax`;
  });
};

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

axios.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase() ?? "";

  if (["post", "put", "patch", "delete"].includes(method)) {
    const token = getCookie("XSRF-TOKEN");

    if (!token) {
      await axios.get("/sanctum/csrf-cookie");
    }

    const freshToken = getCookie("XSRF-TOKEN");
    if (freshToken) {
      config.headers = config.headers ?? {};
      config.headers["X-XSRF-TOKEN"] = freshToken;
    }
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const shouldRetryCsrf = error.response?.status === 419;

    if (shouldRetryCsrf && !error.config.__isRetry) {
      error.config.__isRetry = true;
      await axios.get("/sanctum/csrf-cookie");

      const token = getCookie("XSRF-TOKEN");
      if (token) {
        error.config.headers = error.config.headers ?? {};
        error.config.headers["X-XSRF-TOKEN"] = token;
        return axios(error.config);
      }
    }

    return Promise.reject(error);
  },
);

export { clearStaleSessionCookies };
export default axios;
