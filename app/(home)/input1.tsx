import { Context, DispatchContext } from "@/wrappers/store";
import { useContext, useEffect, useState } from "react";

export const Input1 = ({ marker }: any) => {
    const [inputValue, setInputValue] = useState<any>(""); // State to manage the input value
    const dispatch: any = useContext(DispatchContext);
    const handleBlur = () => {
        if (inputValue.length === 0) {
            setInputValue(11.4);

            dispatch({ type: "field1", payload: 11.4 });
        } else {
            dispatch({ type: "field1", payload: inputValue });
        }
    };

    return (
        <div
            className={`flex flex-col ${
                marker === 2
                    ? "opacity-100"
                    : "opacity-0 absolute pointer-events-none"
            }`}
        >
            <label className="text-sm mb-0.5 " htmlFor="intro">
                Your Handicap Index
            </label>
            <input
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleBlur}
                type="number"
                placeholder={inputValue.length === 0 ? "11.4" : ""}
                value={inputValue.length === 0 ? "" : inputValue}
                className="border text-sm border-grey rounded-md mb-6 py-1 px-2"
                id="intro"
            />
        </div>
    );
};
