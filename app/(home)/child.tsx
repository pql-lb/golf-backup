"use client";
import React, { useContext, useEffect, useState } from "react";
import { ColouredSection } from "./colouredSection";
import { Testimonial } from "./testimonial";
import { Wrapper } from "@/wrappers/opacity";
import { Benefits } from "./benefits";
import { Steps } from "./steps";
import { Faqs } from "./faq";
import { Final } from "./final";
import { Hero } from "./hero";
import { AuthWrapper } from "./wrapper";

export const WrapperChild = React.memo(({ items, items2 }: any) => {
    const content = items.fields;

    return (
        <AuthWrapper>
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
        </AuthWrapper>
    );
});
