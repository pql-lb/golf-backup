import { useState } from "react";

const text =
    "I have good distance with my driving but I leak it to the right quite often and snap hook it a bit too. I am not very accurate with my irons and feel like there's not much of a difference distance wise between my 5 iron and 7 iron. I am a terrible putter especially from short range. I have a fairly good mindset on the golf course, I do not let it bother me too much";
export const Input2 = ({ marker, content, state, setState }: any) => {
    const [inputValue, setInputValue] = useState<any>(""); // State to manage the input value
    const text = "Example: " + content.input1PlaceholderText;
    const handleBlur = () => {
        setState({ ...state, 2: inputValue });
    };
    return (
        <div
            className={`flex flex-col ${
                marker === 2
                    ? "opacity-100"
                    : "opacity-0 absolute pointer-events-none"
            }`}
        >
            <label className="text-sm mb-0.5 " htmlFor="answer">
                Describe Your Golf Game
            </label>
            <textarea
                className="border text-sm py-1 px-2 border-grey rounded-md mb-6 min-h-[160px]"
                id="answer"
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleBlur}
                placeholder={inputValue.length === 0 ? text : ""}
                value={inputValue.length === 0 ? "" : inputValue}
            />
        </div>
    );
};
