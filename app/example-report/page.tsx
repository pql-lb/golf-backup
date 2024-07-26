import { createClient } from "contentful";

import { headers } from "next/headers";
import { Child } from "./child";

export default async function Home() {
    const headersList = headers();
    const spaceId: any = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const token: any = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
    const client = createClient({
        space: spaceId,
        accessToken: token,
    });

    const assets = await client.getAssets();

    return (
        <div className="min-h-[100vh] flex justify-center py-20">
            <Child assets={assets} />
        </div>
    );
}
