import { cookies } from "next/headers";
import { Child } from "./child";
import { createClient } from "contentful";

export default async function Page({ params, searchParams }: any) {
    //const session = await getServerSession(authOptions);
    const cookieStore = cookies();
    let cookie: any = cookieStore.get("next-auth.session-token");
    if (!cookie) {
        cookie = cookieStore.get("__Secure-next-auth.session-token");
    }
    const token = cookie ? cookie.value : null;

    const res = await fetch(`${process.env.HOME_URL}/api/update-pi`, {
        method: "POST",
        body: JSON.stringify({
            token: token,
            pi: searchParams.payment_intent,
            //check for login token (applied when user logs in) & if present update both user collection & session collection WITH userId
        }),
    });
    const data = await res.json();

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
            {data && data.data ? (
                <>
                    <Child items={entry} />
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
