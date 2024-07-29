import { loadStripe } from "@stripe/stripe-js";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/wrappers/store";

export const CheckoutForm = ({ input }: any) => {
    const { state } = useContext(Context);
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe
            .retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }: any) => {
                switch (paymentIntent.status) {
                    case "succeeded":
                        setMessage("Payment succeeded!");
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        setMessage(
                            "Your payment was not successful, please try again."
                        );
                        break;
                    default:
                        setMessage("Something went wrong.");
                        break;
                }
            });
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        if (!stripe || !elements) {
            //disable submission
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/return?token=${state.session.token.id}`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions: any = {
        layout: "tabs",
    };

    return (
        <form
            id="payment-form"
            className=""
            style={{
                borderRadius: "20px",
                padding: "1rem",
                maxWidth: 750,
                minHeight: 500,
                width: "100%",
            }}
            onSubmit={handleSubmit}
        >
            <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
            />
            <button
                disabled={isLoading || !stripe || !elements}
                className="button--light mt-5"
                id="submit"
            >
                <span id="button-text">
                    {isLoading ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Pay now"
                    )}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};
