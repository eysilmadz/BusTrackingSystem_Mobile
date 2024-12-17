import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getErrorMessage = (statusCode) => {
        const messages = {
            400: "Lütfen isteğinizi kontrol edin.",
            404: "Sayfa bulunamadı.",
            500: "Sunucuda bir hata oluştu.",
            default: "Beklenmeyen bir hata oluştu."
        };
        return messages[statusCode] || messages.default;
    };

    const setErrorWithCode = (statusCode) => {
        const errorMessage = getErrorMessage(statusCode);
        setError(errorMessage);
      };

    return <GlobalContext.Provider
            value={{
                loading,
                setLoading,
                error,
                setError,
                setErrorWithCode
            }}
        >
            {children}
        </GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext); 