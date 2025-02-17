export interface User {
  name: string;
  email: string;
}

export interface AuthResponse {
  email: string;
  name: string;
  token: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface SigninCredentials {
  email: string;
  password: string;
}
