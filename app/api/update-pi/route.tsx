// contentful.js

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";
import mongoose, { ConnectOptions } from "mongoose";
import Payments from "@/models/payments";
import sessions from "@/models/sessions";

const uri = process.env.MONGODB_URI;
mongoose.connect(
    "mongodb+srv://wBoojuOcxzTGwrp4:wBoojuOcxzTGwrp4@cluster0.5wwunqs.mongodb.net/Golf",
    {
        useUnifiedTopology: true,
    } as ConnectOptions
);

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

        const existingPayments = await Payments.findOne({
            pi,
        }).exec();

        if (!existingPayments) {
            const data = await Payments.create({
                token,
                pi: pi,
                date: currentDate,
            });
        }
        const session = await sessions.findOneAndUpdate(
            { token: token },
            { pi: pi },
            { new: true }
        );
        return new NextResponse(
            JSON.stringify({
                message: "Successfully created Payments",
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
