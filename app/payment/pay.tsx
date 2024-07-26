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
    return (
        <div className="md:w-[60%] px-10 pb-10 pt-5 flex flex-col items-center order-2">
            <h1 className="mb-3 heading-1 px-4 pt-6 md:pt-20 max-w-[600px] ">
                {content.textHeader}
            </h1>
            <div className="mb-5 rich-text">
                {documentToReactComponents(content.textBody)}
            </div>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
});
