import { Input1 } from "./input1";
import { Input2 } from "./input2";
import { Input3 } from "./input3";
import { Loader } from "./loader";
import Image from "/public/images/golfc.jpg";

export const InputSection = ({
    marker,
    handleClick,
    loader,
    check,
    setCheck,
    message,
    content,
    state,
    setState,
}: any) => {
    return (
        <div className="w-full relative md:w-[50%] md:min-h-[100vh] flex items-center">
            <div className="relative overflow-hidden rounded-md min-h-[70vh] flex justify-center bg-white py-10 px-6 w-full flex-col">
                <img
                    src={Image.src}
                    className="absolute opacity-10 w-full h-full top-0 left-0 z-10"
                />

                <div className="relative z-20">
                    {loader && (
                        <div className="absolute left-0 w-full h-full flex items-center justify-center backdrop-blur-sm">
                            <Loader />
                        </div>
                    )}
                    <Input1
                        state={state}
                        setState={setState}
                        marker={marker}
                        content={content}
                    />
                    <Input2
                        state={state}
                        setState={setState}
                        marker={marker}
                        content={content}
                    />

                    <Input3
                        marker={marker}
                        state={state}
                        setState={setState}
                        content={content}
                        check={check}
                        setCheck={setCheck}
                    />

                    {message && (
                        <p className=" text-sm  mb-3 -mt-2">{message}</p>
                    )}
                    <button
                        onClick={handleClick}
                        className="w-fit button--light"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
