import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { getUser } from './app/lib/data';
 
// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("🚀 ~ authorize ~ credentials:", credentials)
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log("🚀 ~ authorize ~ email:", email)
          console.log('validate credentials');
          const user = await getUser(email);
          console.log("🚀 ~ authorize ~ user:", user)
          if (!user) return null;
          console.log('OK credentials');
          return user;
          
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});