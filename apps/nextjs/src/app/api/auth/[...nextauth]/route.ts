import NextAuth from 'next-auth'
import { CredentialsProvider } from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    // @ts-ignore
    CredentialsProvider({
      async authorize(credentials: any) {
        const user = { id: 1, name: 'Admin' }
        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
