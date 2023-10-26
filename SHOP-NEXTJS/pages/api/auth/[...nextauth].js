import { NEXT_API } from "@/config";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const providers = [
  CredentialsProvider({
    name: "credentials",
    authorize: async (credentials) => { // credentials passed from signIn method

      const response = await fetch(`${NEXT_API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
          username: credentials.username,
        }),
      });

      let data = await response.json();

      if (!response.ok) {
      } else {
        const user = {
          token: data.user.jwtToken,
          role: data.user.role,
        };

        return user;
      }
    },
  }),
];

const callbacks = {
  async jwt({ token, user }) {
    console.log(
      "callback is" +
        JSON.stringify(user) +
        " and token is " +
        JSON.stringify(token)
    );
    if (user) {
      token.accessToken = user.token;
      token.role = user.role;
    }

    return token;
  },

  async session({ session, token }) {
    console.log(
      "token session is" +
        JSON.stringify(token) +
        " and session " +
        JSON.stringify(session)
    );
    session.accessToken = token.accessToken;
    session.role = token.role;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    error: "/account/login", // Changing the error redirect page to our custom login page
  },
};

export default (req, res) => NextAuth(req, res, options);
