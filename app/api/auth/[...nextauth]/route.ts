
import GoogleProvider from "next-auth/providers/google";

import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUserPhone } from '../../../lib/data';
import { getUser } from "@/app/lib/data";
import nextAuth from "next-auth";



const handler = nextAuth({
    providers: [
      GoogleProvider({
        id: 'google-basic', // Provedor Google sem Google Drive
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            scope: 'openid email profile', // Escopos mínimos para obter email e perfil
          },
        },
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        },
      }),
    
    
      GoogleProvider({
        id: 'google-drive', // Provedor Google com Google Drive
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            scope: 'openid email profile https://www.googleapis.com/auth/drive', // Inclui Google Drive
          },
        },
      }),
        
        Credentials({
            credentials: {
              phone: { label: "Phone", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
            
              // Filtrar os campos relevantes
              const { phone, password } = credentials;

              const parsedCredentials = z
                .object({
                  phone: z.string().regex(/^\(\d{2}\)\d{5}-\d{4}$/, {
                    message: "Número de telefone inválido",
                  }),
                  password: z.string().min(4, { message: "A chave deve ter pelo menos 4 caracteres" }),
                })
                .safeParse({ phone, password });
            
            
              if (parsedCredentials.success) {
            
                const { phone, password } = parsedCredentials.data;
                console.log("🚀 ~ authorize ~ phone:");
                console.log('validate credentials');
      
                if (phone === "(41)99999-9999") {
                  console.log('NOT credentials');
                  return null;
                }
      
                const user = await getUserPhone(phone.trim());
                console.log("🚀 ~ authorize ~ user:");
                if (!user) return null;
      
                if (user.verificationCode !== password) {
                  console.log('Senha incorreta');
                  return null;
                }
      
                return { name: user.name, email: user.email, image: null , id : user.id};
              }
      
              console.log('Invalid credentials');
              return null;
            },
          }),
      ],
      callbacks: {
        async signIn({ user, account, profile }) {

          if (account.provider === "google-basic" || account.provider === "google-drive") {
            // Verifique se o usuário já está salvo no sistema
            const existingUser =  await getUser(user.email);

            
            if (!existingUser) {
              // Se o usuário não existe no banco de dados, você pode impedi-lo de logar

              return false;
            }
            
            // Se o usuário já existe, permita o login
            return true;
          }
          
          // Para outros provedores, permita o login normalmente
          return true;
        },
        async session({ session, user, token }) {

          // Você pode adicionar informações adicionais na sessão aqui, se necessário
          session.accessToken = token.accessToken as string
          session.user.idUser = token.idUser as string ;
          session.user.role = token.role  as number;
          session.user.email = token.email;
          session.user.name = token.name;

          return session;
        },
        async jwt({ token, user, account }) {

          if (user){
            var existingUser = await getUser(token.email.trim());

            if (account?.provider === "google-basic" || account?.provider === "google-drive") {
              token.accessToken = account.access_token;
            }

            if (existingUser){
              token.idUser = existingUser.id;
              token.role = existingUser.UserRole;
            }


         
          }
          
          return token;
        },
      }
    });

export { handler as GET, handler as POST }