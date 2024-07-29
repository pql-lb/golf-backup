"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function action() {
    console.log("reval");
    revalidateTag("collection");
}

export async function createSession() {
    const cookieStore = cookies();
    let cookie: any = cookieStore.get("next-auth.session-token");
    if (!cookie) {
        cookie = cookieStore.get("__Secure-next-auth.session-token");
    }
    const token = cookie ? cookie.value : null;

    const res = await fetch(`${process.env.HOME_URL}/api/get-session`, {
        method: "POST",
        body: JSON.stringify({ token }),
    });
    const data = await res.json();

    if (data && !data.session) {
        const res = await fetch(`${process.env.HOME_URL}/api/create-session`, {
            method: "POST",
            body: JSON.stringify({ token }),
        });
        const data = await res.json();
    }
}
