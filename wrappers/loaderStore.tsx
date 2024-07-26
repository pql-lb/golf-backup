"use client";
import React, { createContext, useReducer, useEffect, Dispatch } from "react";

const initialState = {
    loaded: false,
};
export interface State {
    state: {
        loaded: boolean;
    };
    dispatch?: React.Dispatch<any>;
}
export const ContextLoader = createContext<State>({
    state: { ...initialState },
});
interface Action {
    type: string;
    payload?: any;
}
export type AppDispatch = Dispatch<Action>;
export const DispatchContextLoader = createContext<AppDispatch | null>(null);

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "loaded": {
            return { ...state, loaded: action.payload };
        }
        default: {
            return state;
        }
    }
};

export const ContextLoaderProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value: any = React.useMemo(
        () => ({
            state,
        }),
        [state]
    );

    return (
        <ContextLoader.Provider value={value}>
            <DispatchContextLoader.Provider value={dispatch}>
                {children}
            </DispatchContextLoader.Provider>
        </ContextLoader.Provider>
    );
};
