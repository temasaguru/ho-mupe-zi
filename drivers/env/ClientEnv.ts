import { envsafe, num, str, url } from 'envsafe';

/**
 * クライアントで使う環境変数
 * `serverEnv`の定義ではスプレッド構文で拡張しろ
 */
export const clientEnv = envsafe(
  {
    NODE_ENV: str({
      devDefault: 'development',
      choices: ['development', 'test', 'production'],
    }),
    /**
     * NextAuth.jsでは、アプリの絶対URLをこの環境変数に入れることが求められる
     * あと、tRPCのSSRでも絶対URLが要求されるので、これを使い回す
     * `next.config.js` に書いてあるので露出される
     */
    NEXTAUTH_URL: url({
      allowEmpty: true,
      input: process.env.NEXTAUTH_URL,
    }),
    SPOTIFY_LIBRARY_LIMIT: num({
      input: process.env.NEXT_PUBLIC_SPOTIFY_LIBRARY_LIMIT,
      allowEmpty: true,
      default: 30,
    }),
    PROFILE_MARKDOWN_FILENAME: str({
      input: process.env.NEXT_PUBLIC_PROFILE_MARKDOWN_FILENAME,
    }),
  },
  {
    strict: true,
  }
);
