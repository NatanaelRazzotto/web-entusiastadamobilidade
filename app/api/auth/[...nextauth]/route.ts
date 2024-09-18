
import GoogleProvider from "next-auth/providers/google";

import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUserPhone } from '../../../lib/data';
import { getUser } from "@/app/lib/data";
import nextAuth from "next-auth";



const handler = nextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        Credentials({
            credentials: {
              phone: { label: "Phone", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              console.log("🚀 ~ authorize ~ credentials:", credentials);
            
              // Filtrar os campos relevantes
              const { phone, password } = credentials;
              console.log("🚀 ~ authorize ~ password:", password)
              console.log("🚀 ~ authorize ~ phone:", phone)
              const parsedCredentials = z
                .object({
                  phone: z.string().regex(/^\(\d{2}\)\d{5}-\d{4}$/, {
                    message: "Número de telefone inválido",
                  }),
                  password: z.string().min(4, { message: "A chave deve ter pelo menos 4 caracteres" }),
                })
                .safeParse({ phone, password });
            
              console.log("🚀 ~ authorize ~ parsedCredentials:", parsedCredentials.error);
            
              if (parsedCredentials.success) {
            
                const { phone, password } = parsedCredentials.data;
                console.log("🚀 ~ authorize ~ phone:", phone);
                console.log('validate credentials');
      
                if (phone === "(41)99999-9999") {
                  console.log('NOT credentials');
                  return null;
                }
      
                const user = await getUserPhone(phone.trim());
                console.log("🚀 ~ authorize ~ user:", user);
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
          console.log("🚀 ~ signIn ~ user:", user)
          if (account.provider === "google") {
            // Verifique se o usuário já está salvo no sistema
            const existingUser =  await getUser(user.email);
            console.log("🚀 ~ signIn ~ existingUser:", existingUser)
            
            if (!existingUser) {
              // Se o usuário não existe no banco de dados, você pode impedi-lo de logar
              console.log("Usuário não registrado no sistema");
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
          session.accessToken = token
          return session;
        },
        async jwt({ token, user }) {
          console.log("🚀 ~ jwt ~ user:", user)
          console.log("🚀 ~ jwt ~ token:", token)

          if (user){
            var existingUser = await getUser(token.email.trim());

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