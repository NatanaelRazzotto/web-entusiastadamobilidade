// types/next-auth.d.ts
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;  // Define o tipo para o token de acesso
    user?: {
      idUser?: string;
      role?: number;
      name?: string;
      email?: string;
      image?: string;
      // Adicione mais campos se necessário
    };
  }


}
