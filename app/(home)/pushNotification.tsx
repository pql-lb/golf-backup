import { Context, DispatchContext } from "@/wrappers/store";
import React, { useContext, useEffect, useState } from "react";

export const ServiceW = () => {
    const dispatch: any = useContext(DispatchContext);
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").then(
                async (registration) => {
                    console.log(
                        "ServiceWorker registration successful with scope: ",
                        registration.scope
                    );
                    // const existingSubscription =
                    //     await registration.pushManager.getSubscription();

                    // if (existingSubscription) {
                    //     console.log("Already subscribed", existingSubscription);
                    //     dispatch({
                    //         type: "subscription",
                    //         payload: existingSubscription,
                    //     });
                    // } else {
                    //     Notification.requestPermission().then((permission) => {
                    //         console.log("perm", permission);
                    //         if (permission === "granted") {
                    //             if (!registration.active) {
                    //                 console.error(
                    //                     "Service worker is not active."
                    //                 );
                    //                 return;
                    //             }
                    //             subscribeUserToPush(registration);
                    //         }
                    //     });
                    // }
                },
                (error) => {
                    console.log("ServiceWorker registration failed: ", error);
                }
            );
        }
    }, []);
    const subscribeUserToPush = async (registration: any) => {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                "BPcfyLtxngAk_CETwvxF_RIk_tjrdOCxbBMO8qGRVN1wKBL9folGU9ccUO8jdfpNItrevbMM6Dz7c5Q4Tw7VW8Q"
            ),
        });

        const response = await fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Failed to subscribe the user: ", response);
        } else {
            const data = await response.json();
            dispatch({ type: "subscription", payload: data.newSubscription });
        }
    };

    const urlBase64ToUint8Array = (base64String: any) => {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    return <>{/* <Button /> */}</>;
};
const Button = () => {
    const { state } = useContext(Context);
    const { subscription } = state;
    const handleClick = () => {
        const sendPushNotification = async (
            subscription: any,
            payload: any
        ) => {
            const response = await fetch(
                "https://vytcvxihj2nqmxqhf6iezb2o5a0qoufn.lambda-url.eu-west-2.on.aws/",
                {
                    method: "POST",
                    body: JSON.stringify({ subscription, payload }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                console.error("Failed to send notification:", response);
            } else {
                const data = await response.json();
                console.log("data", data);
            }
        };

        const payload = {
            title: "New Notification",
            body: "This is a test 2 notification",
        };
        sendPushNotification(subscription, payload);
    };
    return <button onClick={handleClick}>Click</button>;
};
