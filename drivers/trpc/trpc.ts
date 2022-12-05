import SuperJSON from 'superjson';
import { initTRPC } from '@trpc/server';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

interface CreateContextOptions {}

/**
 * テスト時はこちらを使う
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * SSGHelpersの`ctx`で使う
 * @see https://trpc.io/docs/context
 */
export async function createContext(
  opts?: trpcNext.CreateNextContextOptions
): Promise<Context> {
  return await createContextInner({});
}

const t = initTRPC.create({
  /**
   * これがないとSSRできない
   */
  transformer: SuperJSON,
});

export const router = t.router;
export const procedure = t.procedure;
