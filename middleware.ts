import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { getUser } from './app/lib/data';
import { UserRole } from './app/lib/UsersRoles';
import Email from 'next-auth/providers/email';



export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log("🚀 ~ middleware ~ token:", token)
  
  const sessionToken = req.cookies.get('next-auth.session-token'); 
  console.log("🚀 ~ middleware ~ sessionToken:", sessionToken)
  
  const { pathname } = req.nextUrl;
  console.log("🚀 ~ middleware ~ token:", token)


  // Se não houver token, redirecionar para login
  if (!token) {   
    return null//NextResponse.redirect(new URL('/login', req.url));
  }

  // Proteger rotas específicas por hierarquia
  if (pathname.startsWith('/managerspace') && token.role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL('/api/auth/error?error=AccessDenied', req.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/managerspace/:path*','/clientspace/:path*',]
  };
