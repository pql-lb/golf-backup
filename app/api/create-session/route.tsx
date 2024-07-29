// contentful.js

import Sessions from "@/models/sessions";
import mongoose, { ConnectOptions } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

const uri = process.env.MONGODB_URI;
mongoose.connect(
    "mongodb+srv://wBoojuOcxzTGwrp4:wBoojuOcxzTGwrp4@cluster0.5wwunqs.mongodb.net/Golf",
    {
        useUnifiedTopology: true,
    } as ConnectOptions
);

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { token, session } = body;

    try {
        const session2 = Sessions.create({
            token: token,
            name: session.user.name,
            id: session.user.id,
            browserInfo: session.user.browserInfo,
            timeZone: session.user.timeZone,
            startTime: session.user.startTime,
        });
        return new NextResponse(
            JSON.stringify({
                message: "Success",
                session: session2,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error: any) {
        console.error("Error with payment:", error);
        throw new Error(error.message);
    }
}
