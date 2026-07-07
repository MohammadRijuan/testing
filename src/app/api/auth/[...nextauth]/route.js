import { loginUser } from "@/app/actions/auth/loginUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,          
  session: {                                     
    strategy: "jwt",                             
  },                                              
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {                                    // ← NEW
          const user = await loginUser(credentials);
          if (!user) return null;
          return user;
        } catch (err) {                          // ← NEW
          console.error("Authorize error:", err); // ← NEW
          return null;                            // ← NEW
        }                                          // ← NEW
      },
    }),
  ],
  callbacks: {                                    // ← NEW (whole block)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };