import { cookies } from "next/headers";

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

    return (
        <div className="bg-lightGreen h-[100vh] py-20 font-sans">
            <div className="wrapper">
                {data && data.data ? (
                    <>
                        <h1 className="heading-1 mb-4">Payment Success</h1>
                        <p>You will receive your email in X days</p>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
