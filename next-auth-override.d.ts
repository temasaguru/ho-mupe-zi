import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /**
   * JWTの型定義を上書き
   * @see https://next-auth.js.org/getting-started/typescript
   */
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    access_token_expires_in?: number;
  }
}
