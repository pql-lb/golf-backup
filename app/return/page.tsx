import { cookies } from "next/headers";
import { Child, WrapperChild } from "./child";
import { createClient } from "contentful";

export default async function Page({}: any) {
    const spaceId: any = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const token2: any = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
    const client = createClient({
        space: spaceId,
        accessToken: token2,
    });

    const entryId: any = "q9oA1kJ6mRbIrHDFGUsjq";
    const entry = await client.getEntry(entryId);

    return (
        <div>
            <>
                <WrapperChild items={entry} />
            </>
        </div>
    );
}
