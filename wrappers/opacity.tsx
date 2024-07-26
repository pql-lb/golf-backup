import Link from "next/link";
import Image from "../../images/showroom.jpg";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

export const Wrapper = ({
    children,
    classes,
}: {
    children: any;
    classes?: any;
}) => {
    gsap.registerPlugin(ScrollTrigger);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(
                ref.current,
                { opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 80%",
                        end: "top 40%",

                        toggleActions: "play none none reverse",
                    },
                    opacity: 1,

                    duration: 1.5,
                }
            );
        }
    }, []);
    return (
        <div className={classes} ref={ref}>
            {children}
        </div>
    );
};
