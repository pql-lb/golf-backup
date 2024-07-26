import { Footer } from "@/shared/footer";
import { Header } from "@/shared/header";
import { AppContextProvider } from "@/wrappers/combineComponents";
import { createClient } from "contentful";

import { headers } from "next/headers";

export default async function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = headers();

    const spaceId: any = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const token: any = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
    const client = createClient({
        space: spaceId,
        accessToken: token,
    });
    const entryId: any = process.env.ENTRY_ID;
    const entry: any = await client.getEntry(entryId);

    const content = entry.fields;
    return (
        <>
            <AppContextProvider>
                <Header content={content} />
                {content && (
                    <div
                        style={{ color: String(content.colourText) }}
                        className={`
                            ${
                                content.headingFontSize
                                    ? `heading1-${content.headingFontSize.toLocaleLowerCase()}`
                                    : ""
                            }
                            ${
                                content.headingTwoFontSize
                                    ? `heading2-${content.headingTwoFontSize.toLocaleLowerCase()}`
                                    : ""
                            }
                            ${
                                content.paragraphFontSize
                                    ? `para-${content.paragraphFontSize.toLocaleLowerCase()}`
                                    : ""
                            }
                          `.trim()}
                    >
                        {children}
                    </div>
                )}
                <Footer />
            </AppContextProvider>
        </>
    );
}
