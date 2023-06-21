import { z } from 'zod';
import { hash, verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { router, publicProcedure } from '../trpc';
import { users } from '@/db/schema';
import env from '@/env.mjs';

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;
      const alreadyExists = await ctx.db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (alreadyExists) {
        throw new TRPCError({ code: 'CONFLICT', message: 'User already exists' });
      }
      const hashedPassword = await hash(password);
      const [user] = await ctx.db
        .insert(users)
        .values({ name, email, password: hashedPassword })
        .returning({ id: users.id });
      if (!user) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create user' });
      return { accessToken: getAccessToken(user.id) };
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (!user) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid credentials' });
      const pwdMatches = await verify(user.password, password);
      if (!pwdMatches) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid credentials' });
      return { accessToken: getAccessToken(user.id), name: user.name };
    }),
  getUser: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});

const getAccessToken = (id: string) =>
  sign({ id }, env.JWT_SECRET, {
    expiresIn: '15d',
  });
