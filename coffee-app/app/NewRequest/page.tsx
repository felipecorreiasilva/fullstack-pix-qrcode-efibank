"use client"

import React, { useState } from 'react'
import MainContainer from '../components/MainContainer'
import MyContactRequest from '../components/MyContactRequest';
import SendingToRequest from '../components/SendingToRequest';
import { useContactContext } from "../context/MyContactContext";
import DeliveryMethodRequest from '../components/DeliveryMethodRequest';
import IdentificationRequest from '../components/IdentificationRequest';
import PaymentMethodRequest from '../components/PaymentMethodRequest';
import { useSendingToContext } from '../context/SendingToContext';
import { useDeliveryMethodContext } from '../context/DeliveryMethodContext';
import { useIdentificationContext } from '../context/IdentificationContext';
export default function page() {
    const { verifiedEmailContact } = useContactContext();
    const { verifiedSendingTo } = useSendingToContext()
    const { verifiedDeliveryMethod } = useDeliveryMethodContext();
    const { verifiedIdentification } = useIdentificationContext();
    
  return (
    <MainContainer>
        <div>
            <div className=''> 

            <MyContactRequest/>
            {verifiedEmailContact && <SendingToRequest/>}
            {verifiedEmailContact && verifiedSendingTo && <DeliveryMethodRequest/>}
            {verifiedEmailContact && verifiedSendingTo && verifiedDeliveryMethod && <IdentificationRequest/>}  
            {verifiedEmailContact && verifiedSendingTo && verifiedDeliveryMethod && verifiedIdentification && <PaymentMethodRequest/>}

                
            </div>
        </div>
    </MainContainer>
    
  )
}
