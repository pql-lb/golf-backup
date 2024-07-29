"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PdfViewer } from "./pdfViewer";
import { Loader } from "../(home)/loader";
import { Stats } from "./stats";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ChildPay } from "../payment/child";
import { Context } from "@/wrappers/store";
import { AuthWrapper } from "../(home)/wrapper";

const Item = ({ title, setModal }: any) => {
    return (
        <>
            <div
                id={title.toLowerCase().replace(/[\s-]/g, "")}
                className="mb-10 py-6 bg-lightGreen w-[90%] px-6 text-center rounded-md flex flex-col items-center"
            >
                <h2 className="heading-1 font-medium mb-2 text-center">
                    {title}
                </h2>
                <div className="w-[30px] mb-2 relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            className="fill-deepGreen"
                            d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
                        />
                    </svg>
                </div>
                <div className="mb-2">
                    Get the full report to access {title} and more
                </div>
                {/* <Link href="/payment" className="button">
                Unlock Full Report
            </Link> */}
                <button onClick={() => setModal(true)} className="button">
                    Unlock Full Report
                </button>
            </div>
        </>
    );
};
const SidebarItem = ({ t, subItem }: any) => {
    gsap.registerPlugin(ScrollToPlugin);
    const scroll = () => {
        const id = t.toLowerCase().replace(/[\s-]/g, "");
        gsap.to(window, { scrollTo: `#${id}` });
    };
    if (subItem) {
        return (
            <div className="mb-2 px-5 font-medium para">
                <button className="w-full text-left hover:text-deepGreen duration-300">
                    {t}
                </button>
            </div>
        );
    } else {
        return (
            <div className="mb-2 font-medium para">
                <button
                    className="w-full text-left hover:text-deepGreen duration-300"
                    onClick={scroll}
                >
                    {t}
                </button>
            </div>
        );
    }
};
const Sidebar = () => {
    return (
        <div className="w-[400px] md:block hidden py-10 pt-20 px-10 bg-lightGreen">
            <SidebarItem t={"Summary"} />
            <SidebarItem t={"Benchmark Statistics"} />
            <SidebarItem t="Targeted Improvement – Addressing Specific Weaknesses" />
            <SidebarItem subItem={true} t="Causes" />
            <SidebarItem subItem={true} t="Corrections" />
            <SidebarItem subItem={true} t="Practice Drills" />
            <SidebarItem t="Strategic Roadmap For Hitting Your Specific Goals" />
            <SidebarItem t="Comprehensive Considerations for Holistic Improvement" />
            <SidebarItem t="Questions to Ask During Your Next Golf Lesson" />
            <SidebarItem t="Further Learning Resources for Targeted Improvement" />
            <SidebarItem t="Conclusion" />
        </div>
    );
};
export const Child = ({ items }: any) => {
    const [modal, setModal] = useState(false);

    return (
        <AuthWrapper noSw={true}>
            <div className=" bg-white min-h-[100vh]">
                {modal && (
                    <div className="fixed z-[99999] w-full">
                        <ChildPay setModal={setModal} items={items} />
                    </div>
                )}
                <div className="flex">
                    <Sidebar />
                    <div className="pt-20 py-10 md:px-10 w-full  relative flex justify-center flex-col items-center font-sans ">
                        <div
                            id="summary"
                            className="mb-10 flex flex-col items-center"
                        >
                            <h2 className="heading-1 mb-2 ">
                                Here’s where you’re at
                            </h2>
                            <p className="mb-2">ChatGPT response text</p>
                            <Link href="/" className="button--light w-fit">
                                Update Answers
                            </Link>
                        </div>

                        <div
                            id="benchmarkstatistics"
                            className="mb-10 w-full relative"
                        >
                            <h2 className="heading-1 mb-2 text-center">
                                Your Benchmark Statistics
                            </h2>
                            <Stats />
                        </div>
                        <Item
                            setModal={setModal}
                            title="Targeted Improvement – Addressing Specific Weaknesses"
                        />
                        <Item
                            setModal={setModal}
                            title="Strategic Roadmap For Hitting Your Specific Goals"
                        />
                        <Item
                            setModal={setModal}
                            title="Comprehensive Considerations for Holistic Improvement"
                        />
                        <Item
                            setModal={setModal}
                            title="Questions to Ask During Your Next Golf Lesson"
                        />
                        <Item
                            setModal={setModal}
                            title="Further Learning Resources for Targeted Improvement"
                        />
                        <Item setModal={setModal} title="Conclusion" />
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};
