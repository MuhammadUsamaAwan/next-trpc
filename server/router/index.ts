import { router } from '../trpc';
import { authRouter } from './authRouter';
import { helloRouter } from './helloRouter';

export const appRouter = router({
  auth: authRouter,
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
