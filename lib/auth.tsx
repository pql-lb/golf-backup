import type { NextAuthOptions } from "next-auth";
import { v4 as uuidv4 } from "uuid";

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "custom",
            name: "Custom",
            type: "credentials",
            credentials: {
                browserInfo: { label: "Browser Info", type: "text" },
                timeZone: { label: "Time Zone", type: "text" },
            },
            authorize: async (credentials: any) => {
                //check whether a token has been applied via login page & if so user userID rather than uuid
                const browserInfo = JSON.parse(credentials.browserInfo);
                const timeZone = credentials.timeZone;

                const userAgent = browserInfo.userAgent;
                const user = {
                    id: uuidv4(),
                    name: "Anonymous",
                    browserInfo: userAgent,
                    timeZone: timeZone,
                };
                return user;
            },
        },
    ],

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.browserInfo = user.browserInfo || "default-browser-info";
                token.timeZone = user.timeZone;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = {
                id: token.id,
                name: token.name,
                browserInfo: token.browserInfo,
                timeZone: token.timeZone,
            };
            session.token = token;
            return session;
        },
    },
};
