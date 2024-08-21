"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface IdentificationProviderProps {
    children: ReactNode;
}

const IdentificationContext = createContext({
    identificationCpf: '',
    setIdentificationCpf: function (value:any) { return value },
    identificationPhone: '',
    setIdentificationPhone: function (value:any) { return value },
    verifiedIdentification: false,
    setVerifiedIdentification: function (value:any) { return value }
})

const getInitialIdentificationCpf = () => {
    const identificationCpf = (typeof window !== 'undefined') && localStorage.getItem('identificationCpf')
    return identificationCpf && JSON.parse(identificationCpf)
}

const getInitialIdentificationPhone = () => {
    const identificationPhone = (typeof window !== 'undefined') && localStorage.getItem('identificationPhone')
    return identificationPhone && JSON.parse(identificationPhone)
}

const getInitialVerified = () => {
    const verifiedIdentification = (typeof window !== 'undefined') && localStorage.getItem('verifiedIdentification')
    return verifiedIdentification ? JSON.parse(verifiedIdentification) : null
}

export const IdentificationProvider : React.FC<IdentificationProviderProps> = ({children}) => {

    const [identificationCpf, setIdentificationCpf] = useState(getInitialIdentificationCpf);
    const [identificationPhone, setIdentificationPhone] = useState(getInitialIdentificationPhone);
    const [verifiedIdentification, setVerifiedIdentification] = useState<boolean>(getInitialVerified);

    const value = {
        identificationCpf,
        setIdentificationCpf,
        identificationPhone,
        setIdentificationPhone,
        verifiedIdentification,
        setVerifiedIdentification
        
    }

    useEffect(() => {
        localStorage.setItem('identificationCpf', JSON.stringify(identificationCpf))
    }, [identificationCpf]);

    useEffect(() => {
        localStorage.setItem('identificationPhone', JSON.stringify(identificationPhone))
    }, [identificationPhone]);

    useEffect(() => {
        localStorage.setItem('verifiedIdentification', JSON.stringify(verifiedIdentification))
    }, [verifiedIdentification]);

    return (
        <IdentificationContext.Provider value={value} >{children}</IdentificationContext.Provider>
    ) 
}

export const useIdentificationContext = () => {
    
    const context = useContext(IdentificationContext);

    if (!context) {
        throw new Error('Error')
    }

    return context;
}