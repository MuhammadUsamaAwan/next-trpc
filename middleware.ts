import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getUser from './utils/getUser';

export async function middleware(request: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/protected'],
};
