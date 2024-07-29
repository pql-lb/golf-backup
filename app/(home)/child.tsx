"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { InputSection } from "./inputSection";
import { TextSection } from "./textSection";
import { ColouredSection } from "./colouredSection";
import { Testimonial } from "./testimonial";
import { Wrapper } from "@/wrappers/opacity";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { ServiceW } from "./pushNotification";
import { getCookie } from "@/helpers/cookie";
import { createSession } from "../payment/actions";

export const WrapperChild = React.memo(({ items, items2 }: any) => {
    const { status, data: session }: any = useSession();
    // const saveSession = () => {
    //     let cookie: any = getCookie("next-auth.session-token");
    //     if (!cookie) {
    //         cookie = getCookie("__Secure-next-auth.session-token");
    //     }
    //     console.log(cookie, document.cookie);
    //     // fetch("/api/save-session", {
    //     //     method: "POST",
    //     //     body: JSON.stringify({}),
    //     // })
    //     //     .then((res) => res.json())
    //     //     .then((data) => console.log(data));
    // };
    useEffect(() => {
        const browserInfo = {
            userAgent: navigator.userAgent,
        };
        if (status === "loading") return;
        if (status === "unauthenticated") {
            signIn("custom", {
                browserInfo: JSON.stringify(browserInfo),
                redirect: false,
            });
        } else if (status === "authenticated") {
            // setTimeout(() => {
            //     saveSession();
            // }, 2000);
            createSession();
        }
    }, [status]);
    if (status === "loading" || !session) {
        return <div className="w-full h-screen"></div>;
    } else {
        return (
            <>
                {/* <ServiceW /> */}
                <Child items={items} />
            </>
        );
    }
});
export const Child = React.memo(({ items, items2 }: any) => {
    const router = useRouter();

    const [marker, setMarker] = useState(2);
    const [state, setState] = useState<any>({
        1: "",
        2: "",
        3: "",
    });
    const [loader, setLoader] = useState(false);
    const [check, setCheck] = useState(false);
    const [message, setMessage] = useState("");
    const content = items.fields;
    const determineState = (num: any) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checker =
            num === 2
                ? state[2] !== null &&
                  state[2].length > 0 &&
                  state[1] !== null &&
                  state[1] > 0
                : state[num] !== null &&
                  state[num].length > 0 &&
                  emailPattern.test(state[num]);
        setTimeout(() => {
            if (checker) {
                //success
                if (num === 3) {
                    router.push("pdf");
                } else {
                    setMarker(3);
                }
                setLoader(false);
            } else {
                setLoader(false);
                if (num === 3) {
                    setMessage("Please enter a valid email");
                } else {
                    setMessage(
                        "Please ensure all inputs are filled in before proceeding"
                    );
                }
            }
        }, 500);
    };

    const handleClick = () => {
        setMessage("");
        if (marker === 2) {
            setLoader(true);
            determineState(2);
        } else {
            if (check) {
                determineState(3);
            } else {
                setMessage(
                    "Please agree to receive emails from Feedback Golf before proceeding"
                );
            }
        }
    };

    return (
        <div className="min-h-[100vh] home bg-white ">
            <Wrapper>
                <div
                    style={{ color: String(content.colourText) }}
                    className={` wrapper flex flex-col md:flex-row pt-10 gap-10 `}
                >
                    <TextSection content={content} />
                    {content.rightSideImage ? (
                        <img
                            className="object-cover max-w-[50%]"
                            src={content.rightSideImage.fields.file.url}
                        />
                    ) : (
                        <InputSection
                            content={content}
                            check={check}
                            setCheck={setCheck}
                            loader={loader}
                            marker={marker}
                            message={message}
                            handleClick={handleClick}
                            state={state}
                            setState={setState}
                        />
                    )}
                </div>
            </Wrapper>
            <div style={{ height: content.spacer }}></div>
            <Wrapper>
                <Steps content={content} />
            </Wrapper>
            <Wrapper>
                <Benefits content={content} />
            </Wrapper>
            <Wrapper>
                <Faqs content={content} />
            </Wrapper>
            <Wrapper>
                <ColouredSection content={content} />
            </Wrapper>

            <Wrapper>
                <Testimonial content={content} />
            </Wrapper>
            <Wrapper>
                <Final content={content} />
            </Wrapper>
        </div>
    );
});
const Steps = ({ content }: any) => {
    return (
        <>
            {" "}
            {content?.steps?.length > 0 && (
                <div className="bg-green-50 py-10">
                    <div className="wrapper my-20  ">
                        <div className="grid sm:grid-cols-3 gap-10">
                            {content.steps.map((item: any) => {
                                let image;
                                if (item.image) {
                                    image = item.image.fields.file["en-US"].url;
                                }

                                return (
                                    <div
                                        key={item.title}
                                        className="flex flex-col items-center"
                                    >
                                        {image && (
                                            <img
                                                className="mb-2 mx-auto max-w-[75px]"
                                                src={image}
                                            />
                                        )}
                                        <h2 className="mb-2 font-semibold text-lg">
                                            {item.title}
                                        </h2>
                                        <p className="text-base text-center">
                                            {item.content}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
const Benefits = ({ content }: any) => {
    return (
        <>
            {" "}
            {content?.benefits?.length > 0 && (
                <div className="wrapper my-20 ">
                    <div className="grid gap-5 sm:grid-cols-3 ">
                        {content.benefits.map((item: any) => {
                            let image;
                            if (item.image) {
                                image = item.image.fields.file["en-US"].url;
                            }

                            return (
                                <div key={item.title} className="pb-5 ">
                                    {image && (
                                        <img
                                            className="mb-2 mx-auto max-w-[75px]"
                                            src={image}
                                        />
                                    )}
                                    <h2 className="mb-2  text-center font-semibold text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="text-base text-center">
                                        {item.content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

const Faqs = ({ content }: any) => {
    const [num, setNum] = useState(0);
    if (content.faqs) {
        return (
            <div className="bg-green-50 py-32 mb-0 ">
                <div className="wrapper  ">
                    <h2 className="mb-10 text-center text-2xl font-semibold">
                        Frequently Asked Questions
                    </h2>
                    <div className=" ">
                        <div className="col-span-1 flex flex-col ">
                            {content.faqs.map((item: any, i: number) => {
                                return (
                                    <div
                                        key={item.title}
                                        className="border-b pb-4 mb-4"
                                    >
                                        <button
                                            className="text-left mb-2 cursor-pointer w-full font-semibold "
                                            onClick={() => setNum(i)}
                                            value={i}
                                            key={item.title}
                                        >
                                            <span className="pointer-events-none">
                                                {item.title}
                                            </span>
                                        </button>
                                        <div
                                            className={` ${
                                                num === i
                                                    ? "opacity-100 relative"
                                                    : "opacity-0 absolute"
                                            }`}
                                        >
                                            {item.content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const Final = ({ content }: any) => {
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
