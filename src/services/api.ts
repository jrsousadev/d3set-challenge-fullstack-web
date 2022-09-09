/* eslint-disable */
import axios, { AxiosError } from "axios";
import { BASE_URL_BACKEND } from "../environments/values";

export const api = axios.create({
  baseURL: BASE_URL_BACKEND,
});

api.interceptors.response.use(
  (response: any) => response,
  (err: AxiosError) => { throw err },
);
