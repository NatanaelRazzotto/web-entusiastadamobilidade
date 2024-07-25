
// /src/app/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config'; // Ajuste o caminho conforme necessário
import { getUserPhone } from './app/lib/data';

let config = {
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("🚀 ~ authorize ~ credentials:", credentials);

        const parsedCredentials = z
          .object({
            phone: z.string().regex(/^\(\d{2}\)\d{5}-\d{4}$/, {
              message: "Número de telefone inválido",
            }),
            password: z.string().min(4, { message: "A chave deve ter pelo menos 4 caracteres" }),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { phone, password } = parsedCredentials.data;
          console.log("🚀 ~ authorize ~ phone:", phone);
          console.log('validate credentials');

          if (phone === "(41)99999-9999") {
            console.log('NOT credentials');
            return null;
          }

          const user = await getUserPhone(phone);
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
};

export const { handlers, auth, signIn, signOut } = NextAuth(config)

