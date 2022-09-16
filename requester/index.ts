import axios, { AxiosResponse } from "axios";
import { JUST_CHOOSE_BASE_URI } from "../utils/configs";

export const requester = (config: any, contentType?: string): any => {
  const service = axios.create({
    baseURL: JUST_CHOOSE_BASE_URI || config.baseURL,
    ...config.options,
  });

  service.interceptors.request.use(
    (req) => {
      req.headers = {
        "Content-Type": contentType || "application/json",
        ...config,
      };

      return req;
    },
    (error) => Promise.reject(error)
  );

  return {
    async get<T = any>(uri: string): Promise<AxiosResponse<T>> {
      const response = await service.get<T>(uri);
      return response;
    },
    async post<T = any>(uri: string, data: any): Promise<AxiosResponse<T>> {
      const response = await service.post<T>(uri, data);
      return response;
    },
    async put<T = any>(uri: string, data: any): Promise<AxiosResponse<T>> {
      const response = await service.put<T>(uri, data);
      return response;
    },
    async patch<T = any>(uri: string, data: any): Promise<AxiosResponse<T>> {
      const response = await service.patch<T>(uri, data);
      return response;
    },
    async delete<T = any>(uri: string, data: any): Promise<AxiosResponse<T>> {
      const response = await service.delete<T>(uri, data);
      return response;
    },
  };
};
