'use client'

import React, { useState } from 'react'
import styles from "../styles/NewRequest.module.css";
import { Formik } from 'formik';
import { usePaymentMethodContext } from '../context/PaymentMethodContext';
import { useContactContext } from "../context/MyContactContext";
import { useDeliveryMethodContext } from "../context/DeliveryMethodContext";
import { useIdentificationContext } from "../context/IdentificationContext";
import { useSendingToContext } from "../context/SendingToContext";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../db/firebaseConfig';
import { MdVerified } from 'react-icons/md';
import { useProductsContext } from '../context/CartContext';

interface FormModel {
    paymentMethod: string

}

export default function PaymentMethodRequest() {

    const router = useRouter();
    const { emailContact, setEmailContact, verifiedEmailContact, setVerifiedEmailContact } = useContactContext();
    const { deliveryMethod, setDeliveryMethod, verifiedDeliveryMethod, setVerifiedDeliveryMethod } = useDeliveryMethodContext();
    const { 

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

    } = useSendingToContext();
    const { identificationCpf, setIdentificationCpf, identificationPhone, setIdentificationPhone, verifiedIdentification, setVerifiedIdentification } = useIdentificationContext();
    const { paymentMethod, setPaymentMethod, verifiedPaymentMethod, setVerifiedPaymentMethod, setNewRequest } = usePaymentMethodContext();
    const {products,clearCart} = useProductsContext();
    const totalPrice = products.reduce((total, product) => total + (product.price * product.amountProduct), 0);
    
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleChangePaymentMethod = () => {
        setVerifiedPaymentMethod(false)
    }
  
    return (
    <div>

        <div className={styles.contact}>
            <h2 className={styles.titleContact}>

            &nbsp;MÉTODO DE PAGAMENTO
            </h2>

            <div>
            
            <Formik<FormModel> 
            initialValues={{
                paymentMethod: '',
            }}
            onSubmit={ async (values:any) => {
                
                setButtonLoading(true);

                const paymentData = {
                    
                    emailContact,
                    firstname,
                    lastname,
                    country,
                    cep,
                    adresses,
                    houseNumber,
                    cityComplement,
                    neighborhood,
                    city,
                    uf,
                    deliveryMethod,
                    identificationCpf,
                    identificationPhone,
                    products,
                    totalPrice,
                    ...values
                    
                }
                setPaymentMethod(values.paymentMethod)
                // console.log(values.paymentMethod)
                
                switch (values.paymentMethod) {
                    case 'paymentMethodPix':
                        const result = await axios.post('http://localhost:3001/NewRequest', paymentData)

                        const locId = result.data.cobranca.loc.id
                        const newRequestData = {
                            id: locId,
                            txid: result.data.cobranca.txid,
                            pixCopiaECola: result.data.cobranca.pixCopiaECola,
                            imagemQrcode: result.data.qrcode.imagemQrcode,
                            ...paymentData
                            
                        }

                        
                        await setDoc(doc(db, "newRequest", result.data?.cobranca?.txid), newRequestData)
                        setNewRequest(newRequestData)
                        
                        clearCart()
                        router.push(`/NewRequest/v2/loc/${locId}/qrcode`);
                    break;

                    case 'paymentMethodCreditCard':
                        alert('Ainda não liberamos esse metódo de pagamento, utilize o metódo de pagamento pix.')
                        setButtonLoading(false);
                    break;
                }
                


            }}
            >
                { ( {handleSubmit, handleChange} ) => (

                    <form onSubmit={handleSubmit}>
                        <div className='space-y-2' >
                                
                            <div className='relative'>

                            <input
                            type="radio"
                            name="paymentMethod"
                            id="paymentMethodPix"
                            className='hidden peer'
                            required
                            onChange={handleChange}
                            value='paymentMethodPix'
                            />

                            <label
                            htmlFor='paymentMethodPix'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                                <div className='ml-16'>
                                    <h6 className=''>Pix</h6>
                                    <span className='text-xs opacity-60'>Pagando por Pix, seu pagamento será confirmado em poucos segundos.</span>
                                </div>
                                
                            </label>

                            <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-green-950 scale-0 peer-checked:scale-100 transition delay-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                            </div>

                            </div>

                            <div className='relative'>

                            <input
                            type="radio"
                            name="paymentMethod"
                            id="paymentMethodCreditCard"
                            className='hidden peer'
                            required
                            onChange={handleChange}
                            value='paymentMethodCreditCard'
                            />

                            <label
                            htmlFor='paymentMethodCreditCard'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                                <div className='ml-16'>
                                    <h6 className=''>Cartão de Crédito</h6>
                                    <span className='text-xs opacity-60'>Também aceitamos pagamentos com cartão de crédito.</span>
                                </div>
                                
                            </label>

                            <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-green-950 scale-0 peer-checked:scale-100 transition delay-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                            </div>

                            </div>
                    

                        </div>
                        
                    
        
                    <button type="submit" className={styles.contactSubmitEndRequest}>
                    {!buttonLoading?'Finalizar Pedido' : <div className={styles.contactSubmitEndRequestLoader}></div>}
                    </button>
                    
                </form>

                )}
            
            </Formik>

            </div>
        </div>


    </div>
  )
}
