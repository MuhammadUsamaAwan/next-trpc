'use client';

import trpc from '@/utils/trpc';

export default function Page() {
  const hello = trpc.hello.getHello.useQuery();
  if (hello.isLoading) return <div>Loading...</div>;
  return <div>{hello.data?.message}</div>;
}
