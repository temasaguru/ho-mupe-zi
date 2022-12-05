/**
 * このファイルは認証に必要なのでリネームしない
 */
import NextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { JWT } from 'next-auth/jwt';
import { RedisConnection } from '@/drivers/databases/RedisConnection';
import { serverEnv } from '@/drivers/env/ServerEnv';
import { EncrypterAES256CBC } from '@/drivers/encrypters/EncrypterAES256CBC';
import { SpotifyApiV1 } from '@/drivers/api/spotify/SpotfyAPIv1';

/**
 * ログイン時にトークンと有効期限を更新しJWTに保存する
 * @see https://next-auth.js.org/tutorials/refresh-token-rotation
 */
async function refreshAccessTokenCallback(token: JWT) {
  const encrypter = new EncrypterAES256CBC();
  const connection = new RedisConnection(encrypter);
  const api = new SpotifyApiV1(connection);
  try {
    const refreshedTokens = await api.refreshAccessToken(token.refresh_token);
    const access_token = refreshedTokens.accessToken;
    const newToken = {
      ...token,
      access_token,
      access_token_expires_in: Date.now() + refreshedTokens.expiresIn * 1000,
    };
    return newToken;
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

/**
 * Spotifyのドキュメントで各スコープの定義を確認すること
 * @see https://developer.spotify.com/documentation/general/guides/authorization/scopes/
 */
const SCOPES = [
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-library-read',
];

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: serverEnv.SPOTIFY_CLIENT_ID,
      clientSecret: serverEnv.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { response_type: 'code', scope: SCOPES.join(' ') },
      },
    }),
  ],
  callbacks: {
    /**
     * 環境変数でサインイン可能なユーザーを制限する
     * 俺しかサインインできなくすること
     */
    async signIn({ account, profile }) {
      const signupAllowedEmailsArray =
        serverEnv.SIGNIN_ALLOWED_EMAILS.split(',');
      if (account && account?.provider === 'spotify') {
        return profile?.email
          ? signupAllowedEmailsArray.includes(profile.email)
          : false;
      }
      return false;
    },
    async jwt({ token, account }) {
      const encrypter = new EncrypterAES256CBC();
      const connection = new RedisConnection(encrypter);
      const api = new SpotifyApiV1(connection);
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
      }
      if (
        token.access_token_expires_in &&
        Date.now() < token.access_token_expires_in
      ) {
        await api.updateTokens({
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
        });
        return token;
      }
      // トークン有効期限切れ
      return refreshAccessTokenCallback(token);
    },
  },
};
export default NextAuth(authOptions);
