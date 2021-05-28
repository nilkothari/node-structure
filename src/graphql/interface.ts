export interface SignupInput {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

export interface AuthResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}
