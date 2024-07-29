import { createClient } from "contentful";
import { WrapperChild } from "./(home)/child";
import { headers } from "next/headers";

export default async function Home() {
    const headersList = headers();
    const spaceId: any = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const token: any = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
    const client = createClient({
        space: spaceId,
        accessToken: token,
    });

    const entryId: any = process.env.ENTRY_ID;
    const entry = await client.getEntry(entryId);

    return entry && <WrapperChild items={entry} />;
}
