import { api } from "./api";
import type { User } from "../../types/user";

export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
};

export interface LoginRequest {
  email: string;
  password: string;
};

export interface CheckSessionRequest {
  success: boolean;
};

export async function register(data: RegisterRequest) {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
}

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/auth/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
};