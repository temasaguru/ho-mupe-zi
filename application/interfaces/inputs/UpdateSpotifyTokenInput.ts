import { z } from 'zod';

/**
 * APIラッパーを組みやすいよう定義
 */
export const updateSpotifyTokenInput = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

export type UpdateSpotifyTokenInput = z.infer<typeof updateSpotifyTokenInput>;
