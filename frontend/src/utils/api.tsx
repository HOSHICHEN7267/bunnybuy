// src/utils/api.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // 根據你的後端 API 調整
});

// ✅ 請求攔截器：自動帶上 JWT Token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ 回應攔截器：集中處理錯誤
api.interceptors.response.use(
  (response: AxiosResponse) => response, // 成功時原樣回傳
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('⚠️ Token 無效或過期，請重新登入');

      // 👉 可選：清除 token 並強制登出
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // 👉 若使用 React Router，可以導向登入頁（需透過其他方法如全局導航）
      // window.location.href = '/';

      // ✅ 若有 AuthContext，可以用 context.logout() 呼叫全局登出（建議）

      // 依然讓錯誤往外拋給呼叫端處理
    }

    return Promise.reject(error);
  }
);

export default api;
