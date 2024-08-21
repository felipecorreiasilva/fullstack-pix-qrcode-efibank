'use client'

import React, { useEffect, useState } from "react";
import styles from "../styles/NewRequest.module.css";
import { MdVerified } from "react-icons/md";
import { useContactContext } from "../context/MyContactContext";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

interface FormModel {
    email: string
}

export default function MyContactRequest() {

  const { emailContact, setEmailContact, verifiedEmailContact, setVerifiedEmailContact } = useContactContext();

    const handleChangeEmail = () => {
        setVerifiedEmailContact(false)
    }

  return (
    <div>
      { !verifiedEmailContact ? 
        (<div className={styles.contact}>
            <h2 className={styles.titleContact}>

            &nbsp;MEU CONTATO
            </h2>
            <div className={styles.initLogin}>
            <p>Já tem uma conta ?&nbsp;</p>
            <a className="text-cyan-500" href="Login">
                Entrar
            </a>
            </div>

            <div className={styles.areaRowDecoration}>
            {/* <div className={styles.rowDecoration}/> */}

            <span className={styles.rowDecoration}></span>
            <p>Ou continue abaixo</p>
            {/* <div className={styles.rowDecoration}></div> */}
            </div>

            <div>
            
            <Formik<FormModel> 
            initialValues={{
                email: '',
            }}
            onSubmit={(values:any) => {
                setEmailContact(emailContact)
                setVerifiedEmailContact(true)
            }}
            >
                { ( {handleSubmit, values, handleChange} ) => (

                    <Form onSubmit={handleSubmit}>

                    <label className="flex text-xs font-medium text-gray-600">
                    Endereço de email&nbsp;<span className="text-red-600">*</span>
                    </label>
        
                    <input
                    type="email"
                    name="email"
                    id="email"
                    className={styles.input}
                    autoComplete="off"
                    required
                    //   pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    // onChange={handleChange}
                      onChange={e => setEmailContact(e.target.value)}
                    value={emailContact}
                    />
        
                    <button type="submit" className={styles.contactSubmit}>
                    Prosseguir para Entrega
                    </button>
                </Form>

                )}
            
            </Formik>

            </div>
        </div>) 
        : (
            <div className={styles.contact}>
                <div className={styles.infoContact}>
                <h2 className={styles.titleContact}>
                <MdVerified />
                &nbsp;MEU CONTATO
                </h2>

                

                <div className='ml-16 flex flex-col text-start'>
                <p>{emailContact}</p>
                    <p>Sua conta será criada com as</p>
                    <p>informações fornecidas.</p>
                </div>
                    
                    

                    <button onClick={handleChangeEmail} className=''>
                    Alterar
                    </button>       
                
                </div>
            </div>
        )
      }
    </div>
  );
}
