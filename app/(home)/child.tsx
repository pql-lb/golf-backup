"use client";

import React, { useContext, useEffect, useState } from "react";

import { ColouredSection } from "./colouredSection";
import { Testimonial } from "./testimonial";
import { Wrapper } from "@/wrappers/opacity";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { ServiceW } from "./pushNotification";
import { getCookie } from "@/helpers/cookie";
import { createSession } from "../payment/actions";
import { Benefits } from "./benefits";
import { Steps } from "./steps";
import { Faqs } from "./faq";
import { Final } from "./final";
import { Hero } from "./hero";

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
        } else if (status === "authenticated") {
            createSession();
        }
    }, [status]);
    if (status === "loading" || !session) {
        return <div className="w-full h-screen"></div>;
    } else {
        return (
            <>
                <ServiceW />
                <Child items={items} />
            </>
        );
    }
});
export const Child = React.memo(({ items, items2 }: any) => {
    const content = items.fields;

    return (
        <div className="min-h-[100vh] home bg-white ">
            <Hero content={content} />
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
