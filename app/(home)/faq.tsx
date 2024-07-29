import { useState } from "react";

export const Faqs = ({ content }: any) => {
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
