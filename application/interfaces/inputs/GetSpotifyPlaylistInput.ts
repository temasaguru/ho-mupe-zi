import { z } from 'zod';

/**
 * SpotifyのライブラリAPIのパラメータ
 */
export const getSpotifyPlaylistInput = z.object({
  playlistId: z.string(),
  limit: z.number(),
  offset: z.number().optional().default(0),
});

export type GetSpotifyPlaylistInput = z.infer<typeof getSpotifyPlaylistInput>;
