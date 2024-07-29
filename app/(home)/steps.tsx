export const Steps = ({ content }: any) => {
    return (
        <>
            {" "}
            {content?.steps?.length > 0 && (
                <div className="bg-green-50 py-10">
                    <div className="wrapper my-20  ">
                        <div className="grid sm:grid-cols-3 gap-10">
                            {content.steps.map((item: any) => {
                                let image;
                                if (item.image) {
                                    image = item.image.fields.file["en-US"].url;
                                }

                                return (
                                    <div
                                        key={item.title}
                                        className="flex flex-col items-center"
                                    >
                                        {image && (
                                            <img
                                                className="mb-2 mx-auto max-w-[75px]"
                                                src={image}
                                            />
                                        )}
                                        <h2 className="mb-2 font-semibold text-lg">
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
                </div>
            )}
        </>
    );
};
