// contentful.js

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
    try {
        const stripe = new Stripe(
            "sk_test_51Mv1PuDD8a2lLFRfYEsJj98LnxbzKZtTaKyh6Yj3KivDHkNRAjh1ItCKq2pno9x6JuIPmLV9oEk3LuW5IbC2tHgj00NaBQA1eR",
            {
                typescript: true,
            }
        );

        if (!stripe) {
            throw new Error("Stripe initialization failed");
        }
        const intent = await stripe.paymentIntents.create({
            amount: 1099, // Amount in cents
            currency: "usd",
        });
        console.log(intent);
        return new NextResponse(
            JSON.stringify({
                message: "Successfully retrieved data",
                data: intent,
                clientSecret: intent.client_secret,
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
