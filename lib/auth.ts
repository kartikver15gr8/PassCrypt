import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { SignJWT, importJWK } from "jose";
import db from "@/db";

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
  const user = await db.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
  if (user) {
    const jwt = await generateJWT({ email: email });
    return {
      user: user,
      token: jwt,
    };
  }
  return {
    data: null,
  };
};

export const NEXT_AUTH_CONFIG = {
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

        if (!user.user) {
          const jwt = await generateJWT({ email: credentials.email });
          try {
            await db.user.create({
              data: {
                email: credentials.email,
                password: credentials.password,
              },
            });
            console.log("Fresh user created");

            return {
              email: credentials.email,
              password: credentials.password,
              token: jwt,
            };
          } catch (error) {
            console.log(`Error : ${error}`);
          }
        }

        // try {
        //   await db.user.upsert({
        //     where: {
        //       email: credentials.email,
        //     },
        //     create: {
        //       email: credentials.email,
        //       password: credentials.password,
        //     },
        //     update: {
        //       email: credentials.email,
        //       password: credentials.password,
        //     },
        //   });
        // } catch (e) {
        //   console.log({ error: "error" }, e);
        // }

        if (user.user) {
          console.log("User already in db");

          const jwt = await generateJWT({ email: credentials.email });
          return {
            email: credentials?.email,
            password: credentials?.password,
            token: jwt,
          };
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
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
  },
};
