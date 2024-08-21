'use client'

import React, { useEffect, useState } from 'react'
import styles from "../styles/NewRequest.module.css";
import { useSendingToContext } from "../context/SendingToContext";
import { useRouter } from "next/navigation";
import { InputMask } from '../utils/InputMask'
import { Field, Form, Formik } from 'formik';
import { MdVerified } from "react-icons/md";
import axios from 'axios';

export default function SendingToRequest() {
    
    const router = useRouter();

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

    const [_cep, _setCep] = useState<string|undefined>();
    const [_listUf, setListUf] = useState<any[]>([])

    useEffect(() => {
        const handleGetUf = async() => {
            const burl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
      
            let listUf = (await axios.get(burl)).data
            setListUf(listUf)
          }
          handleGetUf()
        
    }, []);
    
    

    const handleOnBlurCep = (ev:any,setFieldValue:any) => {

        const { value } = ev.target;

        const unmaskCep = value?.replace(/[^0-9]/g, '');

        if (unmaskCep?.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${unmaskCep}/json/`)
            .then((res) => res.json())
            .then((data) => {

                setFieldValue('adresses', data.logradouro)
                setFieldValue('neighborhood', data.bairro)
                setFieldValue('city', data.localidade)
                setFieldValue('uf', data.uf)

            })

    }

    const handleChangeAdresses = () => {
        setVerifiedSendingTo(false)
    }

  return (
    <div>
       { !verifiedSendingTo ?
        (<div className={styles.sendingTo}>
                    
                    <h2 className={styles.titleContact}>&nbsp;ENVIANDO PARA</h2>
                    <Formik
                        onSubmit={(values:any) => {

                            const unmaskCep = _cep?.replace(/[^0-9]/g, '');
                            setFirstname(values.firstname)
                            setLastname(values.lastname)
                            setCountry('Brasil')
                            setCep(unmaskCep)
                            setAdresses(values.adresses)
                            setHouseNumber(values.houseNumber)
                            setCityComplement(values.cityComplement)
                            setNeighborhood(values.neighborhood)
                            setCity(values.city)
                            setUf(values.uf)
                            setVerifiedSendingTo(true)
                            
            
                          }}
                        validateOnMount
                        initialValues={{

                            firstname: '',
                            lastname: '',
                            country: '',
                            cep: '',
                            adresses: '',
                            houseNumber: '',
                            cityComplement: '',
                            neighborhood: '',
                            city: '',
                            uf: '',

                        }}
                        render={({ setFieldValue, handleChange, values }) => (
                        <Form>

                        <div className='md:flex items-center'>

                            <div className='w-full w-50% flex flex-col'>

                                <label className='flex text-xs font-medium text-gray-600'>Nome&nbsp;<span className='text-red-600'>*</span></label>

                                    <Field
                                        type='text'
                                        name="firstname"
                                        id="firstname"
                                        className={styles.input}
                                        required
                                        // onChange={e => setFirstname(e.target.value)}
                                        onChange={handleChange}
                                        value={values.firstname}
                                    />

                            </div>

                            <div className='w-full w-50% flex flex-col md:ml-6'>

                                <label className='flex text-xs font-medium text-gray-600'>Sobrenome&nbsp;<span className='text-red-600'>*</span></label>

                                <Field
                                    type='text'
                                    name="lastname"
                                    id="lastname"
                                    className={styles.input}
                                    required
                                    onChange={handleChange}
                                    value={values.lastname}
                                />

                            </div>

                        </div>
                   
                    <label className='flex text-xs font-medium text-gray-600'>País&nbsp;<span className='text-red-600'>*</span></label>
                    <p className='flex font-semibold mb-2 mt-2' >Brasil</p>
     
                    <div className=''>

                    <label className='flex text-xs font-medium text-gray-600'>CEP&nbsp;<span className='text-red-600'>*</span></label>

                    <input
                        type='text'
                        name="cep"
                        id="cep"
                        className={styles.inputB}
                        required
                        // onChange={e => setCep(e.target.value)}
                        onChange={e => _setCep(InputMask('cep',e.target.value))}
                        onBlur={(ev) => handleOnBlurCep(ev, setFieldValue)}
                        value={_cep}
                    />

                    </div>

                    <div className='md:flex items-center'>
                    <div className='w-full flex flex-col'>

                    <label className='flex text-xs font-medium text-gray-600'>Endereço&nbsp;<span className='text-red-600'>*</span></label>

                    <Field
                        type='text'
                        name="adresses"
                        id="adresses"
                        className={styles.inputC}
                        required
                        onChange={handleChange}
                        value={values.adresses}
                    />

                    </div>

                    <div className='w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4'>

                        <label className='flex text-xs font-medium text-gray-600'>Número&nbsp;<span className='text-red-600'>*</span></label>

                        <Field
                            type='text'
                            name="houseNumber"
                            id="houseNumber"
                            className={styles.inputB}
                            required
                            onChange={handleChange}
                            value={values.houseNumber}
                        />

                    </div>

                    </div>

                    <label className='flex text-xs font-medium text-gray-600'>Complemento (opcional)</label>

                        <Field
                            type='text'
                            name="cityComplement"
                            id="cityComplement"
                            className={styles.input}
                            // onChange={e => setCityComplement(e.target.value)}
                            onChange={handleChange}
                            value={values.cityComplement}
                        />

                        <label className='flex text-xs font-medium text-gray-600'>Bairro&nbsp;<span className='text-red-600'>*</span></label>

                        <Field
                            type='text'
                            name="neighborhood"
                            id="neighborhood"
                            className={styles.inputB}
                            required
                            // onChange={e => setNeighborhood(e.target.value)}
                            onChange={handleChange}     
                            value={values.neighborhood}
                        />

                    <div className='md:flex items-center'>

                        <div className='w-full md:w-1/2 flex flex-col'>

                            <label className='flex text-xs font-medium text-gray-600'>Cidade&nbsp;<span className='text-red-600'>*</span></label>

                                <Field
                                    type='text'
                                    name="city"
                                    id="city"
                                    className={styles.input}
                                    required
                                    // onChange={e => setCity(e.target.value)}
                                    onChange={handleChange}
                                    value={values.city}
                                />

                        </div>

                        <div className='w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4'>

                            <label className='flex text-xs font-medium text-gray-600'>Estado&nbsp;<span className='text-red-600'>*</span></label>
                            
                            <Field
                                component="select"
                                name="uf"
                                id="uf"
                                className={styles.input}
                                required
                                onChange={handleChange}
                            >
                                <option value=''>Selecione um estado</option>
                                {
                                    
                                _listUf?.map((uf:any) => (<option key={uf.id} value={uf.sigla}>{uf.nome}</option>))
                                }
                                
                            </Field>

                        </div>

                        </div>

                    <button
                    type="submit"
                    className={styles.contactSubmit}
                    >
                    Escolher Método de Entrega
                    </button>

                    </Form>
                    
                    )}
                    

                    />

        </div>) : (
            <div className={styles.sendingTo}>
            <div className={styles.infoContact}>
            <h2 className={styles.titleContact}>
            <MdVerified />
            &nbsp;ENVIANDO PARA
            </h2>
            <div className='flex flex-col text-start'>

            <p>
                    {firstname} {lastname}
                    <br/>{adresses}, {houseNumber}
                    <br/>{neighborhood}
                    <br/>{city}
                    <br/>{uf}
                </p>
                
            </div>
                
                
            

                <button onClick={handleChangeAdresses} className=''>
                Alterar
                </button>       
            
            </div>
        </div>
        )
        }

    </div>
  )
}
