import React, { createContext, useState } from 'react';
import { color } from './colors';

const themes = {
    dark: {
        backgroundColor: color.verydarkgreen,
        backgroundCard: color.verydarkgreen,
        color: color.darkgreen,
        textColor: "white",
        transparent: color.darkgreentransparent
    },
    light: {
        backgroundColor: color.lightgreen,
        backgroundCard: '#fff',
        color: color.green,
        textColor: "black",
        transparent: color.greentransparent
    }
}

const initialState = {
    dark: false,
    theme: themes.light,
    toggle: () => {}
}
const ThemeContext = createContext(initialState);

function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false) // Default: light

    const toggle = () => {
        setDark(!dark)
    }

    const theme = dark ? themes.dark : themes.light

    return (
        <ThemeContext.Provider value={{ dark, theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }