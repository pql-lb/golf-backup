import image from "../app/favicon-32x32.png";

export const Footer = () => {
    return (
        <footer className="w-full relative bg-deepGreen py-2">
            <div className="wrapper flex justify-between items-center font-sans text-white text-xs">
                <img className="invert" src={image.src} />
                <p>2024 Copyright text</p>
            </div>
        </footer>
    );
};
