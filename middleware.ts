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

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/check-user`, {
    headers: { 
      'Authorization': `Bearer ${sessionToken.value || ''}`,
      'Content-Type': 'application/json' 
    }
  });
  
  
  const data = await res.json();
  console.log("🚀 ~ middleware ~ data:", data)

  // if (res.status === 401 || res.status === 404) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }


  // if (existingUser.UserRole == UserRole.VISIT){
  //   console.log("🚀 deu certo:")
  // }
  // else{
  //   console.log("🚀 nao certo:")
  // }

//   // Proteger rotas específicas por hierarquia
//   if (pathname.startsWith('/admin') && token.role !== 'admin') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

  return NextResponse.next();
}

export const config = {
    matcher: '/portal/:path*',
  };
