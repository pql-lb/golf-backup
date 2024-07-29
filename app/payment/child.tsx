"use client";

import React, { useEffect, useState } from "react";
import { action } from "./actions";
import { Pay } from "./pay";

//PAYMENT ELEMENT
export const ChildPay = ({ items, setModal, stripe_key }: any) => {
    const content = items[0].fields;
    const [amount, setAmount] = useState(1500);

    return (
        <div className=" bg-stripe-50 backdrop-blur-sm min-h-[100vh]">
            <button
                className="right-4 top-4 text-3xl hover:text-deepGreen absolute"
                onClick={() => setModal(false)}
            >
                X
            </button>
            <div className=" font-sans ">
                <div className="flex md:flex-row flex-col">
                    <Pay
                        stripe_key={stripe_key}
                        content={content}
                        key={amount}
                        amount={amount}
                    />
                </div>
            </div>
        </div>
    );
};
