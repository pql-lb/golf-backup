// contentful.js

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
    const YOUR_DOMAIN = process.env.HOME_URL;

    try {
        const stripe = new Stripe(
            "sk_test_51Mv1PuDD8a2lLFRfYEsJj98LnxbzKZtTaKyh6Yj3KivDHkNRAjh1ItCKq2pno9x6JuIPmLV9oEk3LuW5IbC2tHgj00NaBQA1eR",
            {
                typescript: true,
            }
        );

        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            line_items: [
                {
                    price: "price_1N4qk3DD8a2lLFRfrFUNJAKu",
                    quantity: 1,
                },
            ],
            mode: "payment",
            return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        return new NextResponse(
            JSON.stringify({
                message: "Successfully created session",
                clientSecret: session.client_secret,
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
