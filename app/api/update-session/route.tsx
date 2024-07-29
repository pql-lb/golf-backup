// contentful.js

import Sessions from "@/models/sessions";
import mongoose, { ConnectOptions } from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const uri = process.env.MONGODB_URI;
mongoose.connect(
    "mongodb+srv://wBoojuOcxzTGwrp4:wBoojuOcxzTGwrp4@cluster0.5wwunqs.mongodb.net/Golf",
    {
        useUnifiedTopology: true,
    } as ConnectOptions
);

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { fields, token } = body;

    try {
        console.log(fields);
        const session = await Sessions.findOneAndUpdate(
            { token: token },
            { $set: fields },
            { new: true }
        );
        if (!session) {
            return new NextResponse(
                JSON.stringify({
                    message: "Session not found",
                }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        return new NextResponse(
            JSON.stringify({
                message: "Success",
                session,
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
