import { envsafe, num, str, url } from 'envsafe';
import { clientEnv } from './ClientEnv';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
  throw new Error('月も星も憂鬱ぶって 照らさないでよ');
}

/**
 * サーバーサイドでのみ使える環境変数
 */
export const serverEnv = {
  ...clientEnv,
  ...envsafe(
    {
      NEXTAUTH_SECRET: str({}),
      SIGNIN_ALLOWED_EMAILS: str({}),
      SPOTIFY_CLIENT_ID: str({}),
      SPOTIFY_CLIENT_SECRET: str({}),
      /**
       * Markdown取得用
       */
      GITHUB_PERSONAL_ACCESS_TOKEN: str({}),
      /**
       * `@upstash/redis`用
       */
      UPSTASH_REDIS_REST_URL: url({}),
      /**
       * `@upstash/redis`用
       */
      UPSTASH_REDIS_REST_TOKEN: str({}),
      /**
       * 暗号化に使う
       * `openssl rand 16 -hex`
       */
      ENCRYPTION_KEY: str({}),
      REVALIDATE_SECONDS: num({ allowEmpty: true, default: 3600 }),
    },
    {
      strict: true,
    }
  ),
};
