// contentful.js

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const YOUR_DOMAIN = process.env.HOME_URL;

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const stripe = new Stripe(
            "sk_test_51Mv1PuDD8a2lLFRfYEsJj98LnxbzKZtTaKyh6Yj3KivDHkNRAjh1ItCKq2pno9x6JuIPmLV9oEk3LuW5IbC2tHgj00NaBQA1eR",
            {
                typescript: true,
            }
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: body.amount,
            currency: "gbp",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return new NextResponse(
            JSON.stringify({
                message: "Successfully created session",
                clientSecret: paymentIntent.client_secret,
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
