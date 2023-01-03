import { z } from 'zod';

/**
 * `/api/revalidate` は1つのみ受け付ける仕様なので
 * 一応ここで配列の可能性を排除する
 */
export const revalidatePageInput = z.object({
  path: z.string().startsWith('/', '先頭にスラッシュが必要です'),
});

export type RevalidatePageInput = z.infer<typeof revalidatePageInput>;
