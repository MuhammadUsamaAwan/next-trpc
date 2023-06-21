import { router, publicProcedure } from '../trpc';

export const helloRouter = router({
  getHello: publicProcedure.query(() => {
    return { message: 'Hello World' };
  }),
});
