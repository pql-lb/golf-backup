"use client";
import { SessionProvider } from "next-auth/react";
import React, { createContext, useReducer, useEffect, Dispatch } from "react";

const initialState = {
    loaded: false,
    menuState: false,
    darkMode: true,
    hover: "",
    booking: [],
};
export interface State {
    state: {
        loaded: boolean;
        menuState: boolean;
        darkMode?: boolean;
        hover?: string;
        booking: any;
    };
    dispatch?: React.Dispatch<any>;
}
export const Context = createContext<State>({ state: { ...initialState } });
interface Action {
    type: string;
    payload?: any;
}
export type AppDispatch = Dispatch<Action>;
export const DispatchContext = createContext<AppDispatch | null>(null);

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "darkMode": {
            return { ...state, darkMode: action.payload };
        }
        case "menuState": {
            return { ...state, menuState: action.payload };
        }
        case "loaded": {
            return { ...state, loaded: action.payload };
        }
        case "hover": {
            return { ...state, hover: action.payload };
        }
        case "booking": {
            return { ...state, booking: action.payload };
        }
        default: {
            return state;
        }
    }
};

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value: any = React.useMemo(
        () => ({
            state,
        }),
        [state]
    );

    return (
        <Context.Provider value={value}>
            <DispatchContext.Provider value={dispatch}>
                <SessionProvider>
                    <div className={value.state.darkMode ? "dark " : ""}>
                        {children}
                    </div>
                </SessionProvider>
            </DispatchContext.Provider>
        </Context.Provider>
    );
};
