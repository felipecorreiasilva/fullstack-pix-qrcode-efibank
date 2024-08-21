"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface PaymentMethodProviderProps {
    children: ReactNode;
}

const PaymentMethodContext = createContext({
    paymentMethod: '',
    setPaymentMethod: function (value:any) { return value },
    newRequest: {
        firstname: '',
        lastname: '',
        uf: '',
        neighborhood: '',
        city: '',
        adresses: '',
        txid: '',
        imagemQrcode: '',
        pixCopiaECola: '',
    },
    setNewRequest: function (value:any) { return value },
    verifiedPaymentMethod: false,
    setVerifiedPaymentMethod: function (value:any) { return value }
})

const getInitialPaymentMethod = () => {
    const paymentMethod = (typeof window !== 'undefined') && localStorage.getItem('paymentMethod')
    return paymentMethod ? JSON.parse(paymentMethod) : null
}

const getInitialNewRequest = () => {
    const newRequest = (typeof window !== 'undefined') && localStorage.getItem('newRequest')
    return newRequest ? JSON.parse(newRequest) : null
}

const getInitialVerified = () => {
    const verifiedPaymentMethod = (typeof window !== 'undefined') && localStorage.getItem('verifiedPaymentMethod')
    return verifiedPaymentMethod ? JSON.parse(verifiedPaymentMethod) : null
}

export const PaymentMethodProvider : React.FC<PaymentMethodProviderProps> = ({children}) => {

    const [paymentMethod, setPaymentMethod] = useState(getInitialPaymentMethod);
    const [newRequest, setNewRequest] = useState(getInitialNewRequest);
    const [verifiedPaymentMethod, setVerifiedPaymentMethod] = useState<boolean>(getInitialVerified);

    const value = {
        paymentMethod,
        setPaymentMethod,
        newRequest,
        setNewRequest,
        verifiedPaymentMethod,
        setVerifiedPaymentMethod
    }

    useEffect(() => {
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
    }, [paymentMethod]);

    useEffect(() => {
        localStorage.setItem('newRequest', JSON.stringify(newRequest))
    }, [newRequest]);

    useEffect(() => {
        localStorage.setItem('verifiedPaymentMethod', JSON.stringify(verifiedPaymentMethod))
    }, [verifiedPaymentMethod]);

    return (
        <PaymentMethodContext.Provider value={value} >{children}</PaymentMethodContext.Provider>
    ) 
}

export const usePaymentMethodContext = () => {
    
    const context = useContext(PaymentMethodContext);

    if (!context) {
        throw new Error('Error')
    }

    return context;
}