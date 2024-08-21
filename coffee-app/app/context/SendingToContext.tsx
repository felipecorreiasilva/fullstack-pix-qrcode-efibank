"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface SendingToProviderProps {
    children: ReactNode;
}

const SendingToContext = createContext({

    firstname: undefined,
    setFirstname: function (value:any) { return value },
    lastname: undefined,
    setLastname: function (value:any) { return value },
    country: undefined,
    setCountry: function (value:any) { return value },
    cep: undefined,
    setCep: function (value:any) { return value },
    adresses: undefined,
    setAdresses: function (value:any) { return value },
    houseNumber: undefined,
    setHouseNumber: function (value:any) { return value },
    cityComplement: undefined,
    setCityComplement: function (value:any) { return value },
    neighborhood: undefined,
    setNeighborhood: function (value:any) { return value },
    city: undefined,
    setCity: function (value:any) { return value },
    uf: undefined,
    setUf: function (value:any) { return value },
    verifiedSendingTo: false,
    setVerifiedSendingTo: function (value:any) { return value }

})

const getInitialFirstname = () => {
    const firstname = (typeof window !== 'undefined') && localStorage.getItem('firstname')
    return firstname && JSON.parse(firstname)
}

const getInitialLastname = () => {
    const lastname = (typeof window !== 'undefined') && localStorage.getItem('lastname')
    return lastname && JSON.parse(lastname)
}

const getInitialCountry = () => {
    const country = (typeof window !== 'undefined') && localStorage.getItem('country')
    return country ? JSON.parse(country) : null
}

const getInitialCep = () => {
    const cep = (typeof window !== 'undefined') && localStorage.getItem('cep')
    return cep ? JSON.parse(cep) : null
}

const getInitialAdresses = () => {
    const adresses = (typeof window !== 'undefined') && localStorage.getItem('adresses')
    return adresses ? JSON.parse(adresses) : null
}

const getInitialHouseNumber = () => {
    const houseNumber = (typeof window !== 'undefined') && localStorage.getItem('houseNumber')
    return houseNumber ? JSON.parse(houseNumber) : null
}

const getInitialCityComplement = () => {
    const cityComplement = (typeof window !== 'undefined') && localStorage.getItem('cityComplement')
    return cityComplement ? JSON.parse(cityComplement) : null
}

const getInitialNeighborhood = () => {
    const neighborhood = (typeof window !== 'undefined') && localStorage.getItem('neighborhood')
    return neighborhood ? JSON.parse(neighborhood) : null
}

const getInitialCity = () => {
    const city = (typeof window !== 'undefined') && localStorage.getItem('city')
    return city ? JSON.parse(city) : null
}

const getInitialUf = () => {
    const uf = (typeof window !== 'undefined') && localStorage.getItem('uf')
    return uf ? JSON.parse(uf) : null
}

const getInitialVerified = () => {
    const verifiedSendingTo = (typeof window !== 'undefined') && localStorage.getItem('verifiedSendingTo')
    return verifiedSendingTo ? JSON.parse(verifiedSendingTo) : null
}

export const SendingToProvider : React.FC<SendingToProviderProps> = ({children}) => {

    const [firstname, setFirstname] = useState(getInitialFirstname);
    const [lastname, setLastname] = useState(getInitialLastname);
    const [country, setCountry] = useState(getInitialCountry);
    const [cep, setCep] = useState(getInitialCep);
    const [adresses, setAdresses] = useState(getInitialAdresses);
    const [houseNumber, setHouseNumber] = useState(getInitialHouseNumber);
    const [cityComplement, setCityComplement] = useState(getInitialCityComplement);
    const [neighborhood, setNeighborhood] = useState(getInitialNeighborhood);
    const [city, setCity] = useState(getInitialCity);
    const [uf, setUf] = useState(getInitialUf);
    const [verifiedSendingTo, setVerifiedSendingTo] = useState<boolean>(getInitialVerified);
    
    useEffect(() => {
        localStorage.setItem('firstname', JSON.stringify(firstname))
    }, [firstname]);
    
    useEffect(() => {
        localStorage.setItem('lastname', JSON.stringify(lastname))
    }, [lastname]);
    
    useEffect(() => {
        localStorage.setItem('country', JSON.stringify(country))
    }, [country]);
    
    useEffect(() => {
        localStorage.setItem('cep', JSON.stringify(cep))
    }, [cep]);
    
    useEffect(() => {
        localStorage.setItem('adresses', JSON.stringify(adresses))
    }, [adresses]);
    
    useEffect(() => {
        localStorage.setItem('houseNumber', JSON.stringify(houseNumber))
    }, [houseNumber]);
    
    useEffect(() => {
        localStorage.setItem('cityComplement', JSON.stringify(cityComplement))
    }, [cityComplement]);
    
    useEffect(() => {
        localStorage.setItem('neighborhood', JSON.stringify(neighborhood))
    }, [neighborhood]);
    
    useEffect(() => {
        localStorage.setItem('city', JSON.stringify(city))
    }, [city]);
    
    useEffect(() => {
        localStorage.setItem('uf', JSON.stringify(uf))
    }, [uf]);

    useEffect(() => {
        localStorage.setItem('verifiedSendingTo', JSON.stringify(verifiedSendingTo))
    }, [verifiedSendingTo]);

    const value = {
        firstname,
        setFirstname,
        lastname,
        setLastname,
        country,
        setCountry,
        cep,
        setCep,
        adresses,
        setAdresses,
        houseNumber,
        setHouseNumber,
        cityComplement,
        setCityComplement,
        neighborhood,
        setNeighborhood,
        city,
        setCity,
        uf,
        setUf,
        verifiedSendingTo,
        setVerifiedSendingTo
    }

    return (
        <SendingToContext.Provider value={value} >{children}</SendingToContext.Provider>
    ) 

}


export const useSendingToContext = () => {
    
    const context = useContext(SendingToContext)
    
    if (!context) {
        throw new Error('Error')
    }

    return context;
}