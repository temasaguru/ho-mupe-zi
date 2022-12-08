import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import SuperJSON from 'superjson';
import type { AppRouter } from '@/drivers/trpc/routers/_app';
import { clientEnv } from '@/drivers/env/ClientEnv';

/**
 * コンポーネント・Next通信部分でこれを使う
 */
export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      // クライアントではこちら
      return {
        transformer: SuperJSON,
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ],
      };
    }
    return {
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          /**
           * SSRのために完全なURLが必要
           *  @see https://trpc.io/docs/v10/header
           */
          url: `${clientEnv.NEXTAUTH_URL}/api/trpc`,
          headers() {
            if (ctx?.req) {
              /**
               * HTTP/2の禁止ヘッダーである`Connection`を、クライアントから追加してしまわないよう、
               * 手動で削除する
               * @see https://github.com/KATT/unidici-fetch-reserved-header-crap/pull/1#discussion_r946894919
               */
              let headers = ctx?.req?.headers;
              delete headers?.connection;
              return {
                ...headers,
                'x-ssr': '1',
              };
            }
            return {};
          },
        }),
      ],
    };
  },
  ssr: true,
});
