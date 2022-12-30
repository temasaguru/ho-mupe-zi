import { z } from 'zod';

/**
 * 万が一GitHub以外にホストする場合に備えて
 * Octokitに依存しない型を定義
 */
export const getMarkdownContentInput = z.object({
  source: z.enum(['github']),
  owner: z.string(),
  repo: z.string(),
  branch: z.string().optional().default('main'),
  path: z.string(),
});

export type GetMarkdownContentInput = z.infer<typeof getMarkdownContentInput>;
