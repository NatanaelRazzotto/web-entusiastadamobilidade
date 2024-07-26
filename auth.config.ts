import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Callback JWT para adicionar dados personalizados ao token
    jwt: async ({ token, user }) => {
      console.log("🚀 ~ jwt: ~ user:", user)
      if (user) {
        // Transferindo informações do usuário para o token JWT
        token.id = user.id;
        // token.phone = user.phone;
        // token.role = user.role;
      }
      return token;
    },
    // Callback de sessão para incluir dados personalizados na sessão
    session: async ({ session, token }) => {
      console.log("🚀 ~ session: ~ token:", token)
      if (token) {
        // Transferindo informações do token JWT para a sessão do usuário
        session.user.id = token.id as string;
        // session.user.phone = token.phone;
        // session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      console.log("🚀 ~ authorized ~ auth:", auth)
      const isLoggedIn = !!auth?.user;
      let isClientOrder = false
      // if (isLoggedIn)
      // {
      //   isClientOrder =  nextUrl.pathname.startsWith('/clientspace/order/'+auth.user.id);
      // }
       isClientOrder =  nextUrl.pathname.startsWith('/clientspace');
       console.log("🚀 ~ authorized ~ nextUrl.pathname.startsWith:", nextUrl.pathname)
       console.log("🚀 ~ authorized ~ isClientOrder:", isClientOrder)

      if (isClientOrder) {
        if (isLoggedIn) 
        {
          // let urlOrder = 'http://localhost:3000/clientspace/order/'+auth.user.id;
          // console.log("🚀 ~ authorized ~ urlOrder:", urlOrder)
          // let rul = new URL(urlOrder)
          // return NextResponse.redirect(rul);        
          return true
        }
        return null; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("🚀 ~ authorized ~ auth?.user:", auth.user);
       /// return true; // Exemplo: resposta direta sem redirecionamento
      //  let isLogin =  nextUrl.pathname.startsWith('/login');
      //  if (isLogin) return Response.redirect(new URL('/', nextUrl));
       return true
      }
      return true;
    },
  },
  providers: [], // Deixe vazio ou adicione provedores adicionais conforme necessário
};
