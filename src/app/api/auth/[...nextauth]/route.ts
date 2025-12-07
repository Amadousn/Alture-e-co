import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@alture.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Debug logs
        console.log("Authorize called with:", credentials);
        console.log("Expected email:", process.env.ADMIN_EMAIL || "admin@alture.com");
        
        const user = { id: "1", name: "Admin User", email: "admin@alture.com" };

        if (
          credentials?.email === "admin@alture.com" &&
          credentials?.password === "admin"
        ) {
          console.log("Login authorized!");
          return user;
        }
        console.log("Login FAILED.");
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login', // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
