import "../css/index.css";
import { ContextProvider } from "@/wrappers/store";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Feedback Golf",
    description: "Company Description",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body suppressHydrationWarning={true}>
                <ContextProvider>{children}</ContextProvider>
            </body>
        </html>
    );
}
