// types/next-auth.d.ts
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: JWT;  // Define o tipo para o token de acesso
    user?: {
      name?: string;
      email?: string;
      image?: string;
      // Adicione mais campos se necessário
    };
  }


}
