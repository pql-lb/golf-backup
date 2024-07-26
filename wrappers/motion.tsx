"use client";
import { motion, useAnimation } from "framer-motion";
import { useContext, useEffect } from "react";
import { ContextLoader } from "./loaderStore";
import { usePathname } from "next/navigation";

const Motion = ({ children }: any) => {
    const { state } = useContext(ContextLoader);

    return (
        <div>
            <div
                style={{ minHeight: "100vh" }}
                className=" custom relative w-full bg-white dark:bg-offblack"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { duration: 1, delay: 0.5 },
                    }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default Motion;
