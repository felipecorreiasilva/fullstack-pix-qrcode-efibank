"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface CartModalProviderProps {
    children: ReactNode;
}

const CartModalContext = createContext({
    cartModal: false,
    setCartModal: function (value:any) { return value },
})


export const CartModalProvider : React.FC<CartModalProviderProps> = ({children}) => {

    const [cartModal, setCartModal] = useState(false);

    const value = {
        cartModal,
        setCartModal,
    }

    return (
        <CartModalContext.Provider value={value} >{children}</CartModalContext.Provider>
    ) 
}

export const useCartModalContext = () => {
    
    const context = useContext(CartModalContext);

    if (!context) {
        throw new Error('Error')
    }

    return context;
}