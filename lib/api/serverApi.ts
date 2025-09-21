import axios from "axios";
import { cookies } from "next/headers";
import type { User } from "../../types/user";
import type { Note, NewNote } from "../../types/note";
import type { LoginRequest, RegisterRequest } from "./clientApi";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
});

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<User>("/api/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  return serverApi.get("/api/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
};

export const serverLogin = async (request: LoginRequest): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.post<User>("/api/auth/login", request, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const serverRegister = async (request: RegisterRequest): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.post<User>("/api/auth/register", request, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const createServerNote = async (note: NewNote): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.post<Note>("/api/notes", note, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const fetchNoteServerById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<Note>(`/api/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
