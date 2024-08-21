"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface DeliveryMethodProviderProps {
    children: ReactNode;
}

const DeliveryMethodContext = createContext({
    deliveryMethod: '',
    setDeliveryMethod: function (value:any) { return value },
    verifiedDeliveryMethod: false,
    setVerifiedDeliveryMethod: function (value:any) { return value }
})

const getInitialDeliveryMethod = () => {
    const deliveryMethod = (typeof window !== 'undefined') && localStorage.getItem('deliveryMethod')
    return deliveryMethod ? JSON.parse(deliveryMethod) : null
}

const getInitialVerified = () => {
    const verifiedDeliveryMethod = (typeof window !== 'undefined') && localStorage.getItem('verifiedDeliveryMethod')
    return verifiedDeliveryMethod ? JSON.parse(verifiedDeliveryMethod) : null
}

export const DeliveryMethodProvider : React.FC<DeliveryMethodProviderProps> = ({children}) => {

    const [deliveryMethod, setDeliveryMethod] = useState(getInitialDeliveryMethod);
    const [verifiedDeliveryMethod, setVerifiedDeliveryMethod] = useState<boolean>(getInitialVerified);

    const value = {
        deliveryMethod,
        setDeliveryMethod,
        verifiedDeliveryMethod,
        setVerifiedDeliveryMethod
    }

    useEffect(() => {
        localStorage.setItem('deliveryMethod', JSON.stringify(deliveryMethod))
    }, [deliveryMethod]);

    useEffect(() => {
        localStorage.setItem('verifiedDeliveryMethod', JSON.stringify(verifiedDeliveryMethod))
    }, [verifiedDeliveryMethod]);

    return (
        <DeliveryMethodContext.Provider value={value} >{children}</DeliveryMethodContext.Provider>
    ) 
}

export const useDeliveryMethodContext = () => {
    
    const context = useContext(DeliveryMethodContext);

    if (!context) {
        throw new Error('Error')
    }

    return context;
}