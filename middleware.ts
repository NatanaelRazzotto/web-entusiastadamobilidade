import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { getUser } from './app/lib/data';
import { UserRole } from './app/lib/enums/UsersRoles';
import Email from 'next-auth/providers/email';



export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  
  const sessionToken = req.cookies.get('next-auth.session-token'); 
  
  const { pathname } = req.nextUrl;


  // Se não houver token, redirecionar para login
  if (!token) {   
    return null//NextResponse.redirect(new URL('/login', req.url));
  }

  // Proteger rotas específicas por hierarquia
  if (pathname.startsWith('/managerspace') && token.role !== UserRole.ADMIN) {

    return NextResponse.next();
   // return NextResponse.redirect(new URL('/api/auth/error?error=AccessDenied', req.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/managerspace/:path*','/clientspace/:path*',]
  };
