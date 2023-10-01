import React, { createContext, useContext, ReactNode, useState } from "react";

interface FormData {
    repository: string;
    metric: string;
}

interface RawData {
    [date: string]: number;
}

interface AppContextType {
    rawData: RawData;
    setRawData: (data: RawData) => void;
    formData: FormData;
    setFormData: (data: FormData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {

    const [rawData, setRawData] = useState<RawData>({})

    const [formData, setFormData] = useState<FormData>({
        repository: "",
        metric: "",
    });


    return (
        <AppContext.Provider
            value={{
                rawData,
                setRawData,
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
