import React, { ComponentProps, FC } from "react";
import { ContextLoaderProvider } from "./loaderStore";
import Motion from "./motion";
import Cookie from "./cookie";

const combineComponents = (...components: any[]): any => {
    return components.reduce(
        (AccumulatedComponents: any, CurrentComponent: any) => {
            return ({ children }: any): JSX.Element => {
                return (
                    <AccumulatedComponents>
                        <CurrentComponent>{children}</CurrentComponent>
                    </AccumulatedComponents>
                );
            };
        },
        ({ children }: any) => <>{children}</>
    );
};
const providers: any = [ContextLoaderProvider, Motion];
const providers2: any = [ContextLoaderProvider, Motion, Cookie];
export const AppContextProvider = combineComponents(...providers);
export const AppContextProvider2 = combineComponents(...providers2);
