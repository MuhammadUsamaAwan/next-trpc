import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/router';

const trpc = createTRPCReact<AppRouter>();

export default trpc;
