'use client'

import React from 'react'
import styles from "../styles/NewRequest.module.css";

import { Formik } from 'formik';
import { useDeliveryMethodContext } from "../context/DeliveryMethodContext";
import { MdVerified } from "react-icons/md";

interface FormModel {
    deliveryMethod: string
}

export default function DeliveryMethodRequest() {

    const { deliveryMethod, setDeliveryMethod, verifiedDeliveryMethod, setVerifiedDeliveryMethod } = useDeliveryMethodContext();
    
    const handleChangeDeliveryMethod = () => {
        setVerifiedDeliveryMethod(false)
    }

  return (
    <div>
        {!verifiedDeliveryMethod ?
        (<div className={styles.contact}>
            <h2 className={styles.titleContact}>

            &nbsp;MÉTODO DE ENTREGA
            </h2>


            <div>
            
            <Formik<FormModel> 
            initialValues={{
                deliveryMethod: '',
            }}
            onSubmit={(values:any) => {
                
                setDeliveryMethod(values.deliveryMethod)
                setVerifiedDeliveryMethod(true)

            }}
            >
                { ( {handleSubmit, handleChange} ) => (

                    <form onSubmit={handleSubmit}>
                        <div className='space-y-2' >
                                
                            <div className='relative'>

                            <input
                            type="radio"
                            name="deliveryMethod"
                            id="deliveryMethodA"
                            className='hidden peer'
                            // className={styles.deliveryBoxInput}
                            required
                            onChange={handleChange}
                            value='deliveryMethodMain'
                            />

                            <label
                            htmlFor='deliveryMethodA'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                                <div className='ml-16'>
                                    <h6 className=''>Principal</h6>
                                    <span className='text-xs opacity-60'>Entrega em até x dias</span>
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
                            name="deliveryMethod"
                            id="deliveryMethodB"
                            className='hidden peer'
                            // className={styles.deliveryBoxInput}
                            required
                            onChange={handleChange}
                            value='deliveryMethodFree'
                            />

                            <label
                            htmlFor='deliveryMethodB'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                                <div className='ml-16'>
                                    <h6 className=''>Grátis</h6>
                                    <span className='text-xs opacity-60'>Entrega em até x dias</span>
                                </div>
                                
                            </label>

                            <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-green-950 scale-0 peer-checked:scale-100 transition delay-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                            </div>

                            </div>

                        </div>
                        
                    
        
                    <button type="submit" className={styles.contactSubmit}>
                    Escolher Identificação
                    </button>
                </form>

                )}
            
            </Formik>

            </div>
        </div>)
        :
        <div className={styles.contact}>
                <div className={styles.infoContact}>
                <h2 className={styles.titleContact}>
                <MdVerified />
                &nbsp;MÉTODO DE ENTREGA
                </h2>
                    
                <div className='flex flex-col text-start'>
                <p>Você escolheu <br></br> o método de entrega {deliveryMethod === 'deliveryMethodMain'?'Principal':'Grátis'}</p>
                </div>
                    

                    <button onClick={handleChangeDeliveryMethod} className=''>
                    Alterar
                    </button>       
                
                </div>
        </div>
        }
    </div>
  )
}
