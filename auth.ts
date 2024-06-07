import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './lib/prismadb'
import authConfig from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token }) {
      // console.log({ token })
      return token
    }
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth',
    error: '/auth/error'
    // Si hay un error en el auth nos direccionara a '/auth/error'
    // con pages
    // http://localhost:3000/auth?error=OAuthCallbackError
    // sin pages
    // http://localhost:3000/api/auth/signin?error=OAuthCallbackError
  },

  ...authConfig
})
