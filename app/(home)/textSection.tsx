"use client";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState } from "react";

const options = {};
export const TextSection = ({ content }: any) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const handleInputs = async () => {
        setSuccess(null);
        setError(null);
        setLoader(true);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (input1.length && input2.length && emailPattern.test(input2)) {
            const formData = { input1, input2 };
            const response = await fetch("/api/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data) {
                setLoader(false);
            }

            if (data.message === "Success") {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
        } else {
            setError(true);
        }
    };
    return (
        <div className="w-full md:w-[50%] md:min-h-[100vh] flex flex-col justify-center py-10">
            {content.heroTitle && (
                <h1 className="heading-1 font-medium mb-5">
                    {content.heroTitle}
                </h1>
            )}
            {content.heroContent && (
                <div className="mb-5 text-sm para rich-text">
                    {documentToReactComponents(content.heroContent, options)}
                </div>
            )}
            {content.heroListHeader && (
                <h2 className="mb-3 text-md heading-2">
                    {content.heroListHeader}
                </h2>
            )}
            {content.heroList && (
                <ul className="mb-5 para">
                    {content.heroList.map((item: any, i: number) => {
                        return (
                            <li
                                key={"r" + i}
                                className="flex gap-3 text-sm mb-2"
                            >
                                <SVG />
                                {item}
                            </li>
                        );
                    })}
                </ul>
            )}
            {(content.heroInput1Placeholder ||
                content.heroInput2Placeholder) && (
                <>
                    <div className="flex gap-2 mb-1">
                        {content.heroInput1Placeholder && (
                            <input
                                value={input1}
                                onChange={(e: any) => setInput1(e.target.value)}
                                className="p-1 border border-deepGreenO rounded-sm w-1/2"
                                placeholder={content.heroInput1Placeholder}
                            />
                        )}
                        {content.heroInput2Placeholder && (
                            <input
                                value={input2}
                                onChange={(e: any) => setInput2(e.target.value)}
                                className="p-1 border border-deepGreenO rounded-sm w-1/2"
                                placeholder={content.heroInput2Placeholder}
                            />
                        )}
                    </div>
                    {error ? (
                        <>
                            <p className="mb-1">
                                Please ensure all fields are filled in before
                                continuing
                            </p>
                        </>
                    ) : (
                        <></>
                    )}
                    <button
                        onClick={handleInputs}
                        className="w-full bg-deepGreenO hover:bg-deepGreen hover:text-white duration-500 text-deepGreen  mt-2 font-bold py-2 text-base"
                    >
                        {error
                            ? "Error"
                            : loader
                            ? "Sending..."
                            : success
                            ? "Message Sent!"
                            : success === false
                            ? "Error"
                            : content.heroFormButtonText
                            ? content.heroFormButtonText
                            : "Submit"}
                    </button>
                </>
            )}
            {content.heroButtonSignOff && (
                <div className="flex justify-center mt-2">
                    <p className="text-sm font-bold">
                        {content.heroButtonSignOff}
                    </p>
                </div>
            )}
            {content.heroButtonUrl && content.heroButtonText && (
                <Link
                    href={content.heroButtonUrl}
                    className="button--light w-fit "
                >
                    {content.heroButtonText}
                </Link>
            )}
        </div>
    );
};

const SVG = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            className="shrink-0"
        >
            <circle cx="10" cy="10" r="10" fill="#FFFEFE"></circle>
            <path
                className="stroke-deepGreen"
                strokeWidth="2px"
                d="M6 11.5 8.5 14l6-6"
                fill="none"
            ></path>
        </svg>
    );
};
