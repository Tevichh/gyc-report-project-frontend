export interface LoginResponse {
    token: string;
  }
  
  export interface TokenPayload {
    sub: string;
    exp: number;
    iat?: number;
    [key: string]: any;
  }
  