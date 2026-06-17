import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import "dotenv/config";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";
import { randomUUID } from "crypto";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user || !user.email) {
          return false;
        }
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, user.email!)
        });

        // console.log("existingUser", existingUser);
        if (!existingUser) {
          const userId = randomUUID();

          await db.insert(users).values({
            id: userId,
            email: user.email,
            name: user.name,
            image: user.image,
            tenantId: userId,
          })

        }
        return true;
      } catch (error) {
        // console.log(error)
        return false;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user?.email) {

          const dbUser =
            await db.query.users.findFirst({
              where: eq(
                users.email,
                user.email
              )

            });

          if (dbUser) {

            token.id =
              dbUser.id;

            token.tenantId =
              dbUser.tenantId;
          }

        }

        return token;
      } catch (error) {
        // console.log("error : ", error)
        return null
      }
    },
    async session({ session, token }) {

      // console.log("TOKEN =", token);

      // console.log("SESSION =", session);

      if (session.user) {

        session.user.id =
          token.id as string;

        session.user.id =
          token.tenantId as string;
      }

      return session;
    }


  }
})