import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const BACKEND_URL = 'http://localhost:8080/api/v1'

// async function refreshToken(token: JWT): Promise<JWT> {
//   const res = await fetch(BACKEND_URL + '/auth/refresh-tokens', {
//     method: 'POST',
//     headers: {
//       authorization: `Bearer ${token.tokens.refresh}`,
//     },
//   })
//   console.log('refreshed')
//
//   const response = await res.json()
//
//   return {
//     ...token,
//     backendTokens: response,
//   }
// }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const { email, password } = credentials
        const res = await fetch(BACKEND_URL + '/auth/sign-in', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (res.status == 401) {
          console.log(res.statusText)
          return null
        }

        return await res.json()
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) return { ...token, ...user }
  //
  //     if (new Date().getTime() < token.tokens.expiresIn) return token
  //
  //     return await refreshToken(token)
  //   },
  //
  //   async session({ token, session }) {
  //     session.user = token.user
  //     session.tokens = token.tokens
  //
  //     return session
  //   },
  // },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
