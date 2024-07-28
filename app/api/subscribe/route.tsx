// contentful.js

import { NextRequest, NextResponse } from "next/server";
import mongoose, { ConnectOptions } from "mongoose";
import Subscription from "@/models/subscriptions";

const uri = process.env.MONGODB_URI;
mongoose.connect(
    "mongodb+srv://wBoojuOcxzTGwrp4:wBoojuOcxzTGwrp4@cluster0.5wwunqs.mongodb.net/Golf",
    {
        useUnifiedTopology: true,
    } as ConnectOptions
);
export async function POST(request: NextRequest) {
    const subscription = await request.json();
    try {
        const newSubscription = new Subscription(subscription);
        await newSubscription.save();

        return new NextResponse(
            JSON.stringify({
                message: "Successfully created session",
                newSubscription,
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
