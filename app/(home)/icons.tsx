const Item = ({ content }: any) => {
    return (
        <div className=" font-sans text-center px-4 ">
            <h2 className="text-3xl font-medium capitalize mb-2">
                {content.title}
            </h2>
            <h3 className="text-lg font-medium capitalize mb-2">
                {content.subtitle}
            </h3>
            <p className="text-sm font-light">{content.content}</p>
        </div>
    );
};

export const Icons = ({ content }: any) => {
    return (
        <div className="wrapper py-14">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
                <Item content={content.informationItem1} />
                <Item content={content.informationItem2} />
                <Item content={content.informationItem3} />
                <Item content={content.informationItem4} />
            </div>
        </div>
    );
};
