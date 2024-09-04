import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log("🚀 ~ middleware ~ token:", token)
  
  const { pathname } = req.nextUrl;

//   // Se não houver token, redirecionar para login
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // Proteger rotas específicas por hierarquia
//   if (pathname.startsWith('/admin') && token.role !== 'admin') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

  return NextResponse.next();
}

export const config = {
    matcher: '/:path*', // Aplica o middleware a todas as rotas
  };
