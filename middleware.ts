import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { UserRole } from './app/lib/enums/UsersRoles';

export async function middleware(req: NextRequest) {
  console.log("🚀 ~ Middleware executando...");

  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') || // Arquivos do Next.js (CSS, JS)
    pathname.startsWith('/static') || // Se estiver servindo assets em /static
    pathname.endsWith('.png') || // Para imagens
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.css') || // Para arquivos CSS externos
    pathname.endsWith('.js') // Arquivos JS que podem ser bloqueados
  ) {
    return NextResponse.next();
  } 

  const token = await getToken({ req });
 
  // Se não houver token, redirecionar para login
  if (!token) {      

    if (pathname.startsWith('/managerspace'))
    {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    else{
      return NextResponse.next();
    }
   // if (pathname.startsWith('/login')) {
     // return NextResponse.next(); // Permite o usuário acessar a página de login sem redirecionamento
   // }   
  }

  // Verificando se o token tem um role válido
  const userRole = token.role as UserRole | undefined;
  console.log("🚀 ~ Role do usuário:", userRole);

  if (!userRole) {
    console.log("🚀 ~ Token sem role. Redirecionando para erro...");
    //return NextResponse.redirect(new URL('/api/auth/error?error=InvalidRole', req.url));
    return NextResponse.redirect(new URL('/login', req.url));
  }

  

  if (pathname.startsWith('/login') && token) {
    console.log("🚀 ~ Usuário já autenticado. Redirecionando...");
    return NextResponse.redirect(new URL('/', req.url)); // Ou qualquer outra página
  }

  // Proteção de rota para /managerspace (somente ADMIN)
  if (pathname.startsWith('/managerspace') && userRole !== UserRole.ADMIN) {
    console.log("🚀 ~ Acesso negado para /managerspace");
    return NextResponse.redirect(new URL('/login', req.url));
   // return NextResponse.redirect(new URL('/api/auth/error?error=AccessDenied', req.url));
  }

  console.log("🚀 ~ Acesso permitido");
  return NextResponse.next();
}
