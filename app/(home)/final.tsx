import Link from "next/link";
import { useState } from "react";

export const Final = ({ content }: any) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState<any>(null);
    const handleInputs = async () => {
        setLoader(true);
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
                                    {loader
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
                                    {loader
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
