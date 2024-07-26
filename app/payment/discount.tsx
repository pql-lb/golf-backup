export const Discount = ({ handleClick, inputs, setInputs }: any) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form className="mb-5 px-10 flex flex-col items-center  md:w-[40%] bg-deepGreen text-white rounded-md py-4 order-0 h-full md:fixed top-0 right-0 pt-20">
            <h2 className="text-sm mb-3 pt-5">
                Enter 3 email addresses to gain a discount
            </h2>
            <div className="mb-4 flex flex-col gap-4 max-w-[500px] w-full">
                <input
                    className="w-full border border-grey bg-transparent px-2 font-sans text-sm placeholder:text-sm py-1"
                    type="text"
                    name="input1"
                    value={inputs.input1}
                    onChange={handleInputChange}
                    placeholder="Email 1"
                />
                <input
                    className="w-full border border-grey bg-transparent px-2 font-sans text-sm placeholder:text-sm py-1"
                    type="text"
                    name="input2"
                    value={inputs.input2}
                    onChange={handleInputChange}
                    placeholder="Email 2"
                />
                <input
                    className="w-full border border-grey bg-transparent px-2 font-sans text-sm placeholder:text-sm py-1"
                    type="text"
                    name="input3"
                    value={inputs.input3}
                    onChange={handleInputChange}
                    placeholder="Email 3"
                />
            </div>
            <button
                className="button--light bg-white block"
                onClick={handleClick}
            >
                Claim discount
            </button>
        </form>
    );
};
