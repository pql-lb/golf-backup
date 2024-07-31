"use client";

import React, { useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ServiceW } from "./pushNotification";

import { DispatchContext } from "@/wrappers/store";

export const AuthWrapper = React.memo(({ children, noSw }: any) => {
    const { status, data: session }: any = useSession();
    const dispatch: any = useContext(DispatchContext);
    useEffect(() => {
        const browserInfo = {
            userAgent: navigator.userAgent,
        };

        if (status === "loading") return;
        if (status === "unauthenticated") {
            signIn("custom", {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                browserInfo: JSON.stringify(browserInfo),
                redirect: false,
                startTime: new Date().getTime(),
            });
        } else if (status === "authenticated") {
            dispatch({ type: "session", payload: session });
            const token = session.token.id;
            (async function () {
                const res = await fetch(`/api/get-session`, {
                    method: "POST",
                    body: JSON.stringify({ token }),
                });
                const data = await res.json();

                if (data && !data.session) {
                    const res = await fetch(`/api/create-session`, {
                        method: "POST",
                        body: JSON.stringify({ token, session }),
                    });
                    const data = await res.json();
                } else {
                    //if does exist update lastActivity
                    const res = await fetch(`/api/last-activity`, {
                        method: "POST",
                        body: JSON.stringify({ token, session }),
                    });
                    const data = await res.json();
                    //check on same browser & if no send email?
                }
            })();
        }
    }, [status]);
    if (status === "loading" || !session) {
        return <div className="w-full h-screen"></div>;
    } else {
        return (
            <>
                {!noSw && <ServiceW />}
                {children}
            </>
        );
    }
});
