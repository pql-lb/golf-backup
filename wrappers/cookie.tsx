"use client";
import { useContext, useEffect, useState } from "react";
import { getCookie } from "../helpers/cookie";
import { Context, DispatchContext } from "./store";
import { useRouter } from "next/router";

const Cookie = ({ children }: any) => {
    const navigate = useRouter();

    const [cookie, setCookie] = useState(false);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        if (!cookie) {
            const cookieCheck = getCookie("httpCookie");
            if (!cookieCheck) {
                navigate.push("/login");
            } else {
                setCookie(true);
                dispatch({ type: "token", payload: cookieCheck });
            }
        }
    }, []);
    const { state }: any = useContext(Context);

    return (
        <>
            <Child children={children} token={state.token} />
        </>
    );
};
const Child = ({ children, token }: any) => {
    if (token) {
        return <>{token && { ...children }}</>;
    } else {
        return <></>;
    }
};
export default Cookie;
