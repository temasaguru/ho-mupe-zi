import { z } from 'zod';

/**
 * SpotifyのライブラリAPIのパラメータ
 */
export const getSpotifyLibraryInput = z.object({
  limit: z.number(),
  offset: z.number().optional().default(0),
});

export type GetSpotifyLibraryInput = z.infer<typeof getSpotifyLibraryInput>;
