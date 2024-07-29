import { useEffect, useState } from "react";
const text = "Placeholder text";

const Checkbox = ({ marker, check, setCheck }: any) => {
    return (
        <div
            className={`flex  mb-5 ${
                marker === 3
                    ? "opacity-100"
                    : "opacity-0 absolute pointer-events-none"
            }`}
        >
            <input
                checked={check}
                onChange={() => setCheck(!check)}
                type="checkbox"
                id="auth"
            />
            <label className="text-xs  pl-1.5 " htmlFor="auth">
                I agree to receive emails from Feedback Golf
            </label>
        </div>
    );
};

export const Input3 = ({
    marker,
    check,
    setCheck,
    content,
    state,
    setState,
    update,
}: any) => {
    const [inputValue, setInputValue] = useState<any>(""); // State to manage the input value
    const text = content.input5PlaceholderText;
    const handleBlur = () => {
        setState({ ...state, 3: inputValue });
    };
    useEffect(() => {
        if (inputValue && update) {
            fetch("api/update-session", {
                method: "POST",
                body: JSON.stringify({ input: inputValue, key: "input3" }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                });
        }
    }, [inputValue]);
    return (
        <div
            className={`flex flex-col ${
                marker === 3
                    ? "opacity-100"
                    : "opacity-0 absolute pointer-events-none"
            }`}
        >
            <label className="text-sm mb-0.5 " htmlFor="email">
                Please enter your email address
            </label>
            <input
                className="border text-sm py-1 px-2 border-grey rounded-md mb-3 "
                id="email"
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleBlur}
                placeholder={inputValue.length === 0 ? text : ""}
                value={inputValue.length === 0 ? "" : inputValue}
            />
            <Checkbox marker={marker} check={check} setCheck={setCheck} />
        </div>
    );
};
