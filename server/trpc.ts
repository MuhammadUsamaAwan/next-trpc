import { TRPCError, initTRPC } from '@trpc/server';
import { verify } from 'jsonwebtoken';
import db from '@/db';
import env from '@/env.mjs';

export const createContext = (request: Request) => {
  let user: User | null = null;
  if (request.headers.get('Authorization')) {
    try {
      const token = request.headers.get('Authorization')?.split(' ')[1];
      if (token) user = verify(token, env.JWT_SECRET) as User;
    } catch (error) {
      user = null;
    }
  }
  return {
    db,
    user,
  };
};

const t = initTRPC.context<typeof createContext>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
