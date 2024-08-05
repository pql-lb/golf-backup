import Link from "next/link";
import { useState } from "react";

export const Final = ({ content }: any) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<any>(null);
    const [success, setSuccess] = useState<any>(null);
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
    if (content.finalHeadline || content.finalCtaText || content.finalCtaUrl) {
        return (
            <div className="my-20">
                <div className="wrapper">
                    <h2 className="text-2xl mb-5">{content.finalHeadline}</h2>
                    <div className="">
                        <div className="flex gap-5 mb-4">
                            <input
                                value={input1}
                                onChange={(e: any) => setInput1(e.target.value)}
                                className="p-1 border border-deepGreenO rounded-sm w-1/2"
                                placeholder={"Name"}
                            />
                            <input
                                value={input2}
                                onChange={(e: any) => setInput2(e.target.value)}
                                className="p-1 border border-deepGreenO rounded-sm w-1/2"
                                placeholder={"Email"}
                            />
                        </div>
                        <div>
                            {error ? (
                                <>
                                    <p className="mb-1">
                                        Please ensure all fields are filled in
                                        before continuing
                                    </p>
                                </>
                            ) : (
                                <></>
                            )}
                            {content.finalCtaUrl ? (
                                <Link
                                    onClick={handleInputs}
                                    className="button--light w-full min-w-[200px]"
                                    href={
                                        content.finalCtaUrl
                                            ? content.finalCtaUrl
                                            : "#"
                                    }
                                >
                                    {error
                                        ? "Error"
                                        : loader
                                        ? "Sending..."
                                        : success
                                        ? "Message Sent!"
                                        : success === false
                                        ? "Error"
                                        : content.finalCtaText
                                        ? content.finalCtaText
                                        : "Submit"}
                                </Link>
                            ) : (
                                <button
                                    onClick={handleInputs}
                                    className="button--light w-full min-w-[200px]"
                                >
                                    {error
                                        ? "Error"
                                        : loader
                                        ? "Sending..."
                                        : success
                                        ? "Message Sent!"
                                        : success === false
                                        ? "Error"
                                        : content.finalCtaText
                                        ? content.finalCtaText
                                        : "Submit"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};
