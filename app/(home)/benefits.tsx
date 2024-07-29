export const Benefits = ({ content }: any) => {
    return (
        <>
            {" "}
            {content?.benefits?.length > 0 && (
                <div className="wrapper my-20 ">
                    <div className="grid gap-5 sm:grid-cols-3 ">
                        {content.benefits.map((item: any, i: number) => {
                            let image;
                            if (item.image) {
                                image = item.image.fields.file["en-US"].url;
                            }

                            return (
                                <div
                                    key={"b" + item.title + String(i)}
                                    className="pb-5 "
                                >
                                    {image && (
                                        <img
                                            className="mb-2 mx-auto max-w-[75px]"
                                            src={image}
                                        />
                                    )}
                                    <h2 className="mb-2  text-center font-semibold text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="text-base text-center">
                                        {item.content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};
