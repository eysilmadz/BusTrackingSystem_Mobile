import React, { createContext, useContext, useState } from 'react';

const LoadingErrorContext = createContext();

export const LoadingErrorProvider = ({children}) => {
    const [loading, setLoading] =useState(false);
    const [error, setError] =useState(null);

    const getErrorMessage = (statusCode) => {
        const messages = {
            400: "Lütfen isteğinizi kontrol edin.",
            404: "Sayfa bulunamadı.",
            500: "Sunucuda bir hata oluştu.",
            default: "Beklenmeyen bir hata oluştu."
        };
        return messages[statusCode] || messages.default;
    };

    return (
        <LoadingErrorContext.Provider value={{
            loading,
            setLoading,
            error,
            setError,
            getErrorMessage
        }}>
            {children}
        </LoadingErrorContext.Provider>
    );
};

export const useLoadingError = () => useContext(LoadingErrorContext);