import { api } from "./api";
import type { User } from "../../types/user";
import type { Note, NewNote } from '../../types/note';

export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
};

export interface LoginRequest {
  email: string;
  password: string;
};

export interface UpdateRequest {
  username?: string;
  email?: string;
}

export interface CheckSessionRequest {
  success: boolean;
};

export async function register(data: RegisterRequest) {
  const res = await api.post<User>('/auth/register', data); //
  return res.data;
}

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data); //
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session'); //
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me'); //
  return data;
};

export const updateMe = async (userData: UpdateRequest) => {
  const response = await api.patch<User>('/users/me', userData);
  return response.data; //
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout') //
};

export interface NOTEHUBResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: string
): Promise<NOTEHUBResponse> => { //
  const params = {
      page,
      perPage, 
      ...(search ? { search } : {}),
      ...(tag && tag !== "All" ? { tag } : {}),
  };

  const response = await api.get<NOTEHUBResponse>("/notes", { params });
  return response.data;
};


export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data; //
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};