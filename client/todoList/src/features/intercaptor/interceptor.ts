import axios, { AxiosError, AxiosHeaders, type AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function setTokens(access: string, refresh?: string) {
  localStorage.setItem("accessToken", access);
  if (refresh) {
    localStorage.setItem("refreshToken", refresh);
  }
}

// === Request interceptor: добавляем access token ===
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  config.headers = new AxiosHeaders(config.headers);
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void; config: AxiosRequestConfig }[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      if (token && config.headers) {
        (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
      resolve(axiosInstance(config));
    }
  });
  failedQueue = [];
}

// === Response interceptor: рефреш по 403 ===
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");


        const { data } = await axios.post(`${API_URL}/token`, { token:refreshToken });

        const newAccessToken = data.accessToken;
        setTokens(newAccessToken, data.refreshToken);
        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          (originalRequest.headers as Record<string, string>)["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
