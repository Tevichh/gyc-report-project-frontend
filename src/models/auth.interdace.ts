export interface LoginResponse {
  token: string;
  userId: string;
  rol: string;
}

export interface TokenPayload {
  sub: string;
  exp: number;
  iat?: number;
  [key: string]: any;
}
