import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from 'const';
import bcrypt from 'bcrypt';

// Placeholder for sql query
/*
Query should be like :
SELECT * FROM users WHERE email=${email}
*/
async function getUsersByEmail<T>(email: string) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash("12345678", salt);  
  return {  
      id: "1",
      name: "Test Name",
      email: "someone@example.com",
      canvasToken: "CANVAS_API_TOKEN",
      password: hash,
    }
}

async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = getUsersByEmail<User>(email);
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});