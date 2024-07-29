import { loadStripe } from "@stripe/stripe-js";
import {
    useStripe,
    useElements,
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
    CardElement,
    Elements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { CheckoutForm } from "./checkout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const Pay = React.memo(({ amount, content }: any) => {
    const stripePromise = loadStripe(
        "pk_test_51Mv1PuDD8a2lLFRfe3bBkoPa734nH3X4eItO7pL3DGCFgVxyYxU8ePn7aOybXgkOOHtMZJzQfE0HfJaF32DdaNh600GtzIsiLG"
    );
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        if (!clientSecret) {
            fetch("/api/create-pi", {
                method: "POST",
                body: JSON.stringify({ amount: amount }),
                next: { tags: ["collection"] },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("here", amount);
                    setClientSecret(data.clientSecret);
                });
        }
    }, [amount]);

    const appearance = {
        theme: "stripe",
    };
    const options: any = { clientSecret, appearance };

    const [input, setInput] = useState("");
    return (
        <div className="w-full px-10 pb-10 pt-5 flex flex-col items-center order-2">
            <h1 className="mb-3 heading-1 px-4 pt-6 md:pt-20 max-w-[750px] ">
                {content.textHeader}
            </h1>
            <div className="mb-5 rich-text">
                {documentToReactComponents(content.textBody)}
            </div>
            <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                name="email"
                placeholder="Email"
                className="py-2 px-4 font-roboto w-full max-w-[720px] border-black-50 rounded-md border"
            />
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm input={input} />
                </Elements>
            )}
        </div>
    );
});
