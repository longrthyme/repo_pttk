import { NEXT_API } from '@/config'
import NextAuth from 'next-auth'

import CredentialsProvider from "next-auth/providers/credentials";

const providers = [
    CredentialsProvider({
    name: 'Credentials',
    authorize: async (credentials) => {
     
        console.log("Credentail " + JSON.stringify(credentials));
        
        const   userdata = {
            password: credentials.password,
            username: credentials.username
          };

          const response = await fetch(`${NEXT_API}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: credentials.password,
                username: credentials.username
            }),
          });
      
          let data = await response.json();
      
          console.log("Data user login " + JSON.stringify(data));
      
          if (!response.ok) {
            const errorMessage = data
            console.log("Data after error" + JSON.stringify(data.message));
          } else {
            console.log("User success" + JSON.stringify(data));
            const user = {
                
                token: data.user.jwtToken,
                role: data.user.role
              
            }
         
            return user;
            
          }




    }
  })
]

const callbacks = {
  async jwt({token, user}) {
    console.log("callback is" + JSON.stringify(user) + " and token is " + JSON.stringify(token));
    if (user) {
      token.accessToken = user.token
      token.role = user.role
    }

    return token
  },

  async session({session, token}) {
    console.log("token session is" + JSON.stringify(token) + " and session " + JSON.stringify(session ));
    session.accessToken = token.accessToken
    session.role = token.role
    return session
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    error: '/login' // Changing the error redirect page to our custom login page
  }
}

export default (req, res) => NextAuth(req, res, options)