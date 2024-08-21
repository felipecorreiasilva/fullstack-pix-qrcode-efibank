"use client"

import React, { useEffect, useState } from 'react'
import MainContainer from '@/app/components/MainContainer';
import { usePaymentMethodContext } from '@/app/context/PaymentMethodContext';
import styles from "../../../../../styles/Qrcode.module.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { TbCopy } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/db/firebaseConfig';
import { useParams } from 'next/navigation';
interface newRequestDataType {
    
    id: number,
    txid: string,
    firstname: string,
    lastname: string,
    uf: string,
    city: string,
    neighborhood: string,
    adresses: string,
    imagemQrcode: string,
    pixCopiaECola: string,
}

export default function page() {
    const { newRequest, setNewRequest } = usePaymentMethodContext();
    const [newRequestData, setNewRequestData] = useState<newRequestDataType>(
        {
            id:0,txid:'',firstname:'',lastname:'',uf:'',city:'',neighborhood:'',
            adresses:'', imagemQrcode:'',pixCopiaECola:''
        });
    
    const [ clipboardState, setClipboardState ] = useState(false)
    const params = useParams()
    const locId = params?.id
    const [_locId, setLocId] = useState(locId)

    useEffect(() => {
        const handleGetNewRequestData = async () => {

            const collectionRef = collection(db, "newRequest");

            const whereRef = where('id', '==', parseInt(locId.toString()));
                  
            const qRef = query(collectionRef, whereRef)

            const postsSnapshot = await getDocs(qRef)
            postsSnapshot.docs.map((doc) => {
                
                const newRequestRef = doc.data();

                const data = {

                    id: newRequestRef.id,
                    txid: newRequestRef.txid,
                    firstname: newRequestRef.firstname,
                    lastname: newRequestRef.lastname,
                    uf: newRequestRef.uf,
                    city: newRequestRef.city,
                    neighborhood: newRequestRef.neighborhood,
                    adresses: newRequestRef.adresses,
                    imagemQrcode: newRequestRef.imagemQrcode,
                    pixCopiaECola: newRequestRef.pixCopiaECola,
                    
        
                }
                setNewRequestData({...data})
            });
            

        }
        handleGetNewRequestData()
        
    }, []);

  return (
    <MainContainer>
        <div>
            <div className={styles.qrcode}>
            <div className='text-center font-medium'>
            <h2 className='text-2xl'>Pedido Realizado</h2>
            
                <p className='mt-4 break-words'>ID da Transação: {newRequestData.txid}</p>
                <p>Para: {newRequestData.firstname} {newRequestData.lastname}</p>
                <p>Estado: {newRequestData.uf}, Cidade: {newRequestData.city}</p>
                <p>Bairro: {newRequestData.neighborhood}, Rua: {newRequestData.adresses}</p>
                
            </div>
            <img className={styles.imgQrcode} src={newRequest.imagemQrcode} />
            <div className='flex flex-col' >


              <label className='font-medium text-2xl'>Copia e Cola</label>
              
              <CopyToClipboard text={newRequest.pixCopiaECola}
                onCopy={() => setClipboardState(true)}>
                <button className='mt-4 break-words font-medium'>{!clipboardState ? <TbCopy className='m-auto' size={40} color='#111827'/> : null}</button>
                
              </CopyToClipboard>
              
              {clipboardState ? <TbCopyCheck className='m-auto' size={40} color='#111827'/> : null}

            </div>
            
            
            </div>
        </div>
    
    </MainContainer>
  )
}
