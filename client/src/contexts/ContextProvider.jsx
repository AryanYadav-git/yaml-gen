"use client"

import React, { createContext, useContext, useState } from 'react';


const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [load, setLoad] = useState(null);
    return (
        <StateContext.Provider value={{ history, setHistory, load, setLoad }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);