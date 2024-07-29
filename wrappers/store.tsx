"use client";
import { SessionProvider } from "next-auth/react";
import React, { createContext, useReducer, useEffect, Dispatch } from "react";

const initialState = {
    loaded: false,
    session: null,
    subscription: null,
    field1: "",
    field2: "",
    field3: "",
};
export interface State {
    state: {
        loaded: boolean;
        session: any;
        subscription: any;
        field1: any;
        field2: any;
        field3: any;
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
        case "subscription": {
            return { ...state, subscription: action.payload };
        }
        case "loaded": {
            return { ...state, loaded: action.payload };
        }
        case "session": {
            return { ...state, session: action.payload };
        }
        case "field1": {
            return { ...state, field1: action.payload };
        }
        case "field2": {
            return { ...state, field1: action.payload };
        }
        case "field3": {
            return { ...state, field1: action.payload };
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
