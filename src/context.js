import React, { createContext } from 'react';

export const Context = createContext({});

export const ContextProvider = ({ children, value }) => {
    return <Context.Provider value={ value }>{ children }</Context.Provider>;
};
