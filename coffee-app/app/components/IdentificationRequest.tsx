'use client'

import React, { useState } from 'react'
import styles from "../styles/NewRequest.module.css";
import { Formik, Form } from 'formik';
import { useIdentificationContext } from "../context/IdentificationContext";
import { InputMask } from '../utils/InputMask'
import { MdVerified } from "react-icons/md";

interface FormModel {
  identificationCpf: string
  identificationPhone: string
}

export default function IdentificationRequest() {
    
    const { identificationCpf, identificationPhone, setIdentificationCpf, verifiedIdentification, setVerifiedIdentification, setIdentificationPhone } = useIdentificationContext();
    const [phone, setPhone] = useState<string|undefined>();
    const [cpf, setCpf] = useState<string|undefined>();

    const handleChangeIdentification = () => {
      setVerifiedIdentification(false)
    }
    
    
  return (
    <div>

      {!verifiedIdentification ?
      (<div className={styles.contact}>
            <h2 className={styles.titleContact}>

            &nbsp;IDENTIFICAÇÃO
            </h2>


            <div>
            
            <Formik<FormModel> 
            initialValues={{
              identificationCpf: '',
              identificationPhone: '',
            }}
            onSubmit={(values:any) => {

                const unmaskCpf = cpf?.replace('.', '').replace('.', '').replace('-', '')
                const unmaskPhone = phone?.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
                
                setIdentificationCpf(unmaskCpf)
                setIdentificationPhone(unmaskPhone)
                setVerifiedIdentification(true)
                

            }}
            >
                { ( {handleSubmit, handleChange, values} ) => (

                    <Form onSubmit={handleSubmit}>

                    <label className="flex text-xs font-medium text-gray-600">
                    Endereço de CPF&nbsp;<span className="text-red-600">*</span>
                    </label>

                    <input
                    
                    name="identificationCpf"
                    id="identificationCpf"
                    className={styles.input}
                    required
                    onChange={e => setCpf(InputMask('cpf',e.target.value))}
                    value={cpf}
                    />

                    <label className="flex text-xs font-medium text-gray-600">
                    Telefone&nbsp;<span className="text-red-600">*</span>
                    </label>

                    <input
                    
                    name="identificationPhone"
                    id="identificationPhone"
                    className={styles.input}
                    required
                    onChange={e => setPhone(InputMask('phone',e.target.value))}
                    value={phone}
                    />

                    <button type="submit" className={styles.contactSubmit}>
                    Escolher Formas de Pagamento
                    </button>
                    </Form>

                )}
            
            </Formik>

            </div>
      </div>) 
      :
      <div className={styles.contact}>
                <div className={styles.infoContact}>
                <h2 className={styles.titleContact}>
                <MdVerified />
                &nbsp;MÉTODO DE IDENTIFICAÇÃO
                </h2>
                    <div className='flex flex-col text-start'>

                      <p>Sua Identificação foi confirmada</p>
                      <p>CPF: {identificationCpf}</p>
                      <p>Telefone: {identificationPhone}</p>

                    </div>
                    
                    

                    <button onClick={handleChangeIdentification} className=''>
                    Alterar
                    </button>       
                
                </div>
        </div>
        }

    </div>
  )
}
