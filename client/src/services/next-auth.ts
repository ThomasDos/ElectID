import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
    // CredentialsProvider({
    //   name: 'Sign in with admin credentials',
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'My user name' },
    //     password: { label: 'Password', type: 'password' }
    //   },
    //   async authorize(credentials, req) {
    //     console.log('🚀 ~ file: next-auth.ts:23 ~ authorize ~ req:', req)
    //     console.log('🚀 ~ file: next-auth.ts:36 ~ authorize ~ credentials:', credentials)
    //     // Add logic here to look up the user from the credentials supplied
    //     const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   }
    // })

    // ...add more providers here
  ]
}
