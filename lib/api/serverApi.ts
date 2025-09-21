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
  const { data } = await serverApi.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  return serverApi.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
};

export const serverLogin = async (request: LoginRequest): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.post<User>("/auth/login", request, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const serverRegister = async (request: RegisterRequest): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.post<User>("/auth/register", request, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const createServerNote = async (note: NewNote): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.post<Note>("/notes", note, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const fetchNoteServerById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export interface NOTEHUBResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: string
): Promise<NOTEHUBResponse> => {
  const cookieStore = await cookies();

  const params = {
    page,
    perPage,
    ...(search ? { search } : {}),
    ...(tag && tag !== "All" ? { tag } : {}),
  };

  const { data } = await serverApi.get<NOTEHUBResponse>("/notes", {
    headers: { Cookie: cookieStore.toString() },
    params,
  });

  return data;
};

