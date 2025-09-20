export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
};

export interface User {
  email: string;
  username: string;
  avatar: string;
}

export interface LoginRequest {
  email: string;
  password: string;
};

export interface CheckSessionRequest {
  success: boolean;
};