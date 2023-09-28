import React, { createContext, useContext, ReactNode, useState } from "react";

interface FormData {
    repository: string;
    metric: string;
}

interface AppContextType {
    userInput: FormData;
    setUserInput: (data: FormData) => void;
    formData: FormData;
    setFormData: (data: FormData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
    const [userInput, setUserInput] = useState<FormData>({
        repository: "",
        metric: "",
    });

    const [formData, setFormData] = useState<FormData>({
        repository: "",
        metric: "",
    });


    return (
        <AppContext.Provider
            value={{
                userInput,
                setUserInput,
                formData,
                setFormData
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider"
        );
    }
    return context;
}
