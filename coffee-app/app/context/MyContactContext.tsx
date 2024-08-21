"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface ContactProviderProps {
    children: ReactNode;
}

const ContactContext = createContext({
    emailContact: '',
    setEmailContact: function (value:any) { return value },
    verifiedEmailContact: false,
    setVerifiedEmailContact: function (value:any) { return value }
})

const getInitialEmailContact = () => {
    const emailContact = (typeof window !== 'undefined') && localStorage.getItem('emailContact')
    return emailContact ? JSON.parse(emailContact) : null
}

const getInitialVerified = () => {
    const verifiedEmailContact = (typeof window !== 'undefined') && localStorage.getItem('verifiedEmailContact')
    return verifiedEmailContact ? JSON.parse(verifiedEmailContact) : null
}

export const ContactProvider : React.FC<ContactProviderProps> = ({children}) => {

    const [emailContact, setEmailContact] = useState(getInitialEmailContact);
    const [verifiedEmailContact, setVerifiedEmailContact] = useState<boolean>(getInitialVerified);

    const value = {
        emailContact,
        setEmailContact,
        verifiedEmailContact,
        setVerifiedEmailContact
    }

    useEffect(() => {
        localStorage.setItem('emailContact', JSON.stringify(emailContact))
    }, [emailContact]);

    useEffect(() => {
        localStorage.setItem('verifiedEmailContact', JSON.stringify(verifiedEmailContact))
    }, [verifiedEmailContact]);

    return (
        <ContactContext.Provider value={value} >{children}</ContactContext.Provider>
    ) 
}

export const useContactContext = () => {
    
    const context = useContext(ContactContext);

    if (!context) {
        throw new Error('Error')
    }

    return context;
}