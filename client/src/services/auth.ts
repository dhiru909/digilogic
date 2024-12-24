import axios from "axios";
import { User } from "../types/index";

const API_URL = "http://localhost:5000/api";
export const BACKEND_URL = "http://localhost:5000";

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
