"use client";

import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { InputSection } from "./inputSection";
import { TextSection } from "./textSection";
import { ColouredSection } from "./colouredSection";
import { Testimonial } from "./testimonial";
import { Wrapper } from "@/wrappers/opacity";
import { useSession, signIn, signOut } from "next-auth/react";

export const WrapperChild = React.memo(({ items, items2 }: any) => {
    const { status, data: session }: any = useSession();
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
        }
    }, [status]);
    if (status === "loading" || !session) {
        return <div className="w-full h-screen"></div>;
    } else {
        return <Child items={items} />;
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
        <div className="min-h-[100vh] bg-white ">
            <Wrapper>
                <div
                    style={{ color: String(content.colourText) }}
                    className={` wrapper flex flex-col md:flex-row pt-10 gap-10 `}
                >
                    <TextSection content={content} />
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
                                                className="mb-2 mx-auto"
                                                src={image}
                                            />
                                        )}
                                        <h2 className="mb-2 font-semibold text-lg">
                                            {item.title}
                                        </h2>
                                        <p className="text-base">
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
                    <div className="grid gap-5 ">
                        {content.benefits.map((item: any) => {
                            let image;
                            if (item.image) {
                                image = item.image.fields.file["en-US"].url;
                            }

                            return (
                                <div key={item.title} className="pb-5 border-b">
                                    {image && (
                                        <img
                                            className="mb-2 mx-auto"
                                            src={image}
                                        />
                                    )}
                                    <h2 className="mb-2 font-semibold text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="text-base">{item.content}</p>
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
                    <div className=" grid sm:grid-cols-2 gap-10">
                        <div className="col-span-1 flex flex-col ">
                            {content.faqs.map((item: any, i: number) => {
                                return (
                                    <button
                                        className="text-left mb-2 font-semibold border-b pb-2"
                                        onMouseOver={() => setNum(i)}
                                        value={i}
                                        key={item.title}
                                    >
                                        {item.title}
                                    </button>
                                );
                            })}
                        </div>
                        <div>
                            {content.faqs.map((item: any, i: number) => {
                                return (
                                    <div
                                        className={` absolute ${
                                            num === i
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                        key={item.content}
                                    >
                                        {item.content}
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