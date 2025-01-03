import axios from "axios";
import { Details, User, UserRole } from "../types/index";
const API_URL = "https://api.apnavision.in/api";
export const BACKEND_URL = "https://api.apnavision.in";
axios.defaults.withCredentials = true;

export async function login(email: string, password: string): Promise<User> {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    {
      withCredentials: true,
    }
  );
  return response.data.user;
}

export async function signup(data: {
  name: string;
  email: string;
  password: string;
  role: UserRole | string;
  securityNumber?: string;
}): Promise<User> {
  const response = await axios.post(`${API_URL}/auth/signup`, data, {
    withCredentials: true,
  });
  return response.data.user;
}

export async function logout(): Promise<void> {
  await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
}

export async function refreshToken(): Promise<User> {
  const response = await axios.post(
    `${API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data.user;
}

export async function getUserDetails(): Promise<Details> {
  const response = await axios.post(
    `${API_URL}/auth/details`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
}
