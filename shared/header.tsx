"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = ({ content }: any) => {
    console.log("here", content);
    const path = usePathname();
    if (path !== "/") {
        return (
            <header className="z-[999] fixed top-0 w-full  left-0">
                {content &&
                content.displayHeader &&
                content.displayHeader === "Yes" &&
                content.headerImage &&
                content.headerImage.fields.file.url ? (
                    <>
                        <img
                            className="h-full w-full max-h-[100px] "
                            src={content.headerImage.fields.file.url}
                        />
                    </>
                ) : (
                    <div className="wrapper relative py-2 flex justify-between">
                        <div className="relative max-w-[150px] md:max-w-[200px] lg:max-w-[250px] w-fit ">
                            <Link href="/">
                                <img
                                    className="w-full object-cover"
                                    src="/images/logo.png"
                                />
                            </Link>
                        </div>
                        <div className="flex gap-5 items-center"></div>
                    </div>
                )}
            </header>
        );
    } else {
        return <></>;
    }
};
