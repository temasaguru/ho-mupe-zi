/**
 * このファイルはtRPCに必要なのでリネームしない
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from '@/drivers/trpc/trpc';
import { appRouter } from '@/drivers/trpc/routers/_app';

/**
 * ここに設置しないとtRPCが動かない
 */
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
