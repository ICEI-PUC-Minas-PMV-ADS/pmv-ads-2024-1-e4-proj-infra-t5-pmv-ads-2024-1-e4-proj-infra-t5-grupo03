import { login } from '@/lib/api/user'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const config = {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email',
          placeholder: 'email@exemplo.com',
        },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async ({ email, password }) => {
        try {
          const response = await login({ email, password })

          if (!response.success) return null

          const { user } = response.data

          // console.log(['authorize:', user])

          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const { id, email } = user

        token.id = id
        token.nickname = email.slice(0, email.indexOf('@'))
      }

      // console.log(['jwt uid:', token.id])

      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.nickname = token.nickname

      return session
    },
  },
  pages: {
    signIn: '/login?mode=login&should_redirect=true',
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth(config)
