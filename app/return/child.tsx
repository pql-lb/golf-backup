"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { InputSection } from "@/app/(home)/inputSection";
import { TextSection } from "@/app/(home)/textSection";
import { ColouredSection } from "@/app/(home)/colouredSection";
import { Testimonial } from "@/app/(home)/testimonial";
import { Wrapper } from "@/wrappers/opacity";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import { getCookie } from "@/helpers/cookie";
import { createSession } from "../payment/actions";
import { Steps } from "../(home)/steps";
import { Benefits } from "../(home)/benefits";
import { Faqs } from "../(home)/faq";
import { Final } from "../(home)/final";

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
                        <div className="flex items-center max-w-[50%] ">
                            <img
                                className="object-cover max-h-[500px]"
                                src={content.rightSideImage.fields.file.url}
                            />
                        </div>
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
