import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DarkModeContext = createContext();

export function DarkModeSetter({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const loadDarkMode = async () => {
            try {
                const storedValue = await AsyncStorage.getItem('darkMode');
                if (storedValue !== null) {
                    setDarkMode(storedValue === 'true');
                }
            } catch (error) {
                console.log("Fout bij laden van darkMode:", error);
            }
        };
        loadDarkMode();
    }, []);

    useEffect(() => {
        const saveDarkMode = async () => {
            try {
                await AsyncStorage.setItem('darkMode', darkMode.toString());
            } catch (error) {
                console.log("Fout bij opslaan van darkMode:", error);
            }
        };
        saveDarkMode();
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    return useContext(DarkModeContext);
}
