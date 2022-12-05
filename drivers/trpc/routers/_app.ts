import { router } from '../trpc';
import { spotifyRouter } from './spotify';

export const appRouter = router({
  spotify: spotifyRouter,
});

export type AppRouter = typeof appRouter;
