import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const ColouredSection = ({ content }: any) => {
    return (
        <>
            {content.colouredSectionTitle ||
                (content.colouredSectionContent && (
                    <div className="wrapper py-10">
                        <div className="rounded-md text-teal-50 font-sans bg-deepGreen px-10 py-14">
                            <h2 className="mb-5 heading-1">
                                {content.colouredSectionTitle}
                            </h2>
                            <div className="mb-8 text-md font-light para rich-text">
                                {documentToReactComponents(
                                    content.colouredSectionContent,
                                    {}
                                )}
                            </div>
                            <Link
                                className="button--light bg-white w-fit hover:bg-teal-100"
                                href={content.colouredSectionButtonUrl}
                            >
                                {content.colouredSectionButtonText}
                            </Link>
                        </div>
                    </div>
                ))}
        </>
    );
};
