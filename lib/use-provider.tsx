'use client';

import {
    FC,
    ReactNode,
    createContext,
    useContext,
    type Context
} from "react";

const _Map = <T,>() => new Map<string, T>();
const Context = createContext(_Map());

export const Provider: FC<{ children: ReactNode }> = ({ children }) =>
    <Context.Provider value={_Map()}>{children}</Context.Provider>;

const useContextProvider = <T,>(key: string) => {
    const context = useContext(Context);
    return {
        set value(v: T) { context.set(key, v); },
        get value() {
            if (!context.has(key)) {
                throw Error(`Context key '${key}' Not Found!`);
            }
            return context.get(key) as T;
        }
    }
};

export const useProvider = <T,>(key: string, initialValue?: T) => {
    const provider = useContextProvider<Context<T>>(key);
    if (initialValue !== undefined) {
        const Context = createContext<T>(initialValue);
        provider.value = Context;
    }
    return useContext(provider.value);
};

export const useShared = <T,A>(key: string, fn: (value?: A) => T, initialValue?: A) => {
    let state = undefined;
    if (initialValue !== undefined) {
        state = fn(initialValue);
    }
    return useProvider(key, state);
};