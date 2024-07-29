import { Wrapper } from "@/wrappers/opacity";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { TextSection } from "./textSection";
import { InputSection } from "./inputSection";
export const Hero = ({ content }: any) => {
    const router = useRouter();
    const [marker, setMarker] = useState(2);
    const [state, setState] = useState<any>({
        1: "",
        2: "",
        3: "",
    });

    const [update, setUpdate] = useState(false);
    const [loader, setLoader] = useState(false);
    const [check, setCheck] = useState(false);
    const [message, setMessage] = useState("");

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
        //could just do fetch request here
        setUpdate(true);
        setTimeout(() => setUpdate(false), 500);
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
                        state={state}
                        setState={setState}
                        update={update}
                    />
                )}
            </div>
        </Wrapper>
    );
};
