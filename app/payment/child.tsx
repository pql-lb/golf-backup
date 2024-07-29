"use client";

import React, { useEffect, useState } from "react";
import action from "./actions";

import { Discount } from "./discount";
import { Pay } from "./pay";

//PAYMENT ELEMENT
export const Child = ({ items }: any) => {
    const content = items[0].fields;
    const [amount, setAmount] = useState(1500);
    const [inputs, setInputs] = useState({
        input1: "",
        input2: "",
        input3: "",
    });

    const handleClick = (e: any) => {
        e.preventDefault();
        const allInputsFilled = Object.values(inputs).every(
            (value) => value.trim() !== ""
        );

        if (allInputsFilled) {
            console.log("All inputs filled");
            setAmount(1200);
            action();
        } else {
            console.log("Please fill in all inputs");
        }
    };
    return (
        <div className=" bg-stripe min-h-[100vh]">
            <div className=" font-sans ">
                <div className="flex md:flex-row flex-col">
                    <Pay content={content} key={amount} amount={amount} />
                    {/* <Discount
                        inputs={inputs}
                        setInputs={setInputs}
                        handleClick={handleClick}
                    /> */}
                </div>
            </div>
        </div>
    );
};
