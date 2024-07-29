import { Wrapper } from "@/wrappers/opacity";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { TextSection } from "./textSection";
import { InputSection } from "./inputSection";
import { Context } from "@/wrappers/store";
export const Hero = ({ content }: any) => {
    const router = useRouter();
    const [marker, setMarker] = useState(2);
    const { state } = useContext(Context);
    // const [stateInputs, setStateInputs] = useState<any>({
    //     field1: "",
    //     field2: "",
    //     field3: "",
    // });

    const [update, setUpdate] = useState(false);
    const [loader, setLoader] = useState(false);
    const [check, setCheck] = useState(false);
    const [message, setMessage] = useState("");

    const determineState = (num: any) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checker =
            num === 2
                ? state["field2"] !== null &&
                  state["field2"].length > 0 &&
                  state["field1"] !== null &&
                  state["field1"] > 0
                : state["field3"] !== null &&
                  state["field3"].length > 0 &&
                  emailPattern.test(state["field3"]);
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
                fetch("api/update-session", {
                    method: "POST",
                    body: JSON.stringify({
                        fields: {
                            field1: state.field1,
                            field2: state.field2,
                            field3: state.field3,
                        },
                        token: state.session.token.id,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data && data.session) {
                            determineState(3);
                        }
                    });
            } else {
                setMessage(
                    "Please agree to receive emails from Feedback Golf before proceeding"
                );
            }
        }
    };
    return (
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
                        update={update}
                    />
                )}
            </div>
        </Wrapper>
    );
};
