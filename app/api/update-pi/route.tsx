// contentful.js

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";
import mongoose, { ConnectOptions } from "mongoose";
import Session from "@/models/session";

const uri = process.env.MONGODB_URI;
mongoose.connect(String(uri), {
    useUnifiedTopology: true,
} as ConnectOptions);

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { token, pi } = body;
    try {
        const now = new Date();
        const currentDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes()
        );

        const existingSession = await Session.findOne({
            pi,
        }).exec();

        if (existingSession) {
            return new NextResponse(
                JSON.stringify({
                    message: "Session with this token and date already exists.",
                    data: existingSession,
                }),
                {
                    status: 409, // Conflict
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
        const data = await Session.create({
            token,
            pi: pi,
            date: currentDate,
        });
        return new NextResponse(
            JSON.stringify({
                message: "Successfully created session",
                data,
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
