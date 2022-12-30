import { router } from '../trpc';
import { markdownRouter } from './markdown';
import { spotifyRouter } from './spotify';

export const appRouter = router({
  markdown: markdownRouter,
  spotify: spotifyRouter,
});

export type AppRouter = typeof appRouter;
