import CredentialsProvider from "next-auth/providers/credentials";
import { SignJWT, importJWK } from "jose";
import { type NextAuthOptions } from "next-auth";
import db from "@/db";
import { Hash, Match } from "./bcrypt";

const generateJWT = async (payload: any) => {
  const secret = process.env.JWT_SECRET || "S3CrET";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);

  return jwt;
};

const validateUser = async (email: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    const jwt = await generateJWT({ email: email });
    const matched = await Match(password, user.password);
    if (matched) {
      return {
        user: user,
        token: jwt,
      };
    }
  }
  return {
    data: null,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        console.log("creds");
        console.log(credentials);
        // const jwt = await generateJWT({ email: credentials.email });

        const user = await validateUser(
          credentials.email,
          credentials.password
        );
        console.log(credentials.password);

        const hashedPass = await Hash(credentials.password);

        if (!user.user) {
          const jwt = await generateJWT({ email: credentials.email });
          try {
            await db.user.create({
              data: {
                email: credentials.email,
                password: hashedPass,
              },
            });
            console.log("Fresh user created");

            return {
              email: credentials.email,
              password: hashedPass,
              token: jwt,
            };
          } catch (error) {
            console.log(`Error : ${error}`);
          }
        }

        if (user.user) {
          console.log("User already in db");

          const jwt = await generateJWT({ email: credentials.email });
          return {
            email: credentials?.email,
            password: user.user.password,
            token: jwt,
          };
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.token = user.token;
        console.log({ token });
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        // console.log("sessuib");
        // console.log(session);
      }
      return session;
    },
    // events: {
    //   async signIn({ user }) {
    //     console.log({ user }, "Signed in");
    //     return { user };
    //   },
    // },
  },

  pages: {
    signIn: "/login",
  },
};
