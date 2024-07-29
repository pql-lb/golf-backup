import { Child } from "./child";
import React from "react";
import { headers } from "next/headers";
import { createClient } from "contentful";

//PAYMENT ELEMENT
export default async function Home() {
    const headersList = headers();
    const spaceId: any = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const token: any = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
    const client = createClient({
        space: spaceId,
        accessToken: token,
    });

    const res2 = await client.getEntries({
        content_type: "paymentPage",
    });

    return <Child items={res2.items} />;
}
