"use client";

import { useAuth } from "@/app/context/AuthContext";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Formik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useRef } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { PageWrapper } from "./PageWrapper";
import styles from "../styles/SignUp.module.css";
import { InputMask } from '../utils/InputMask'

interface FormModel{
    
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string,
    cpf: string,
    birth: Date,

}
const RegistrationForm = () => {
  // Use the signUp method from the AuthContext
  const { signUp } = useAuth();
  const router = useRouter();
  const cpfRef = useRef(null)
  const [isShow, setIsShow] = useState(false);

  const [phone, setPhone] = useState<string|undefined>();
  const [cpf, setCpf] = useState<string|undefined>();

const handlePassword = () => setIsShow(!isShow);

  return (
    <PageWrapper>
      <div>
        
          <label className={styles.title}>Criar uma conta</label>

          <div className={styles.container}>
            <Formik<FormModel>
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                cpf: "",
                birth: new Date(),
              }}
              onSubmit={(values:any) => {

                const unmaskCpf = cpf?.replace('.', '').replace('.', '').replace('-', '')
                const unmaskPhone = phone?.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')

				        console.log(values)
                signUp({...values, cpf: unmaskCpf, phone: unmaskPhone})
				        router.push("/Profile");

              }}
            >
              {({ handleSubmit, values, handleChange }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Nome:</label>
                    <input
                      id="username"
                      name="username"
                      className={styles.input}
                      type="text"
                      required
                      placeholder="Digite seu nome de usúario"
                      onChange={handleChange}
                      value={values.username}
                    />

                    <label className={styles.label}>Endereço de email:</label>
                    <input
                      id="email"
                      name="email"
                      className={styles.input}
                      type="text"
                      required
                      placeholder="Digite seu endereço de e-mail"
                      onChange={handleChange}
                      value={values.email}
                    />

                    <label className={styles.label}>Senha:</label>

                    <label className={styles.area}>
                      <input
                        // {...props}
                        type={isShow ? "text" : "password"}
                        className={styles.input}
                        required
                        placeholder="Digite sua senha"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                      <button
                        onClick={handlePassword}
                        className="btnShowPassword"
                        type="button"
                      >
                        {!isShow && <Eye size={18} />}
                        {isShow && <EyeOff size={18} />}
                      </button>
                    </label>

                    <label className={styles.label}>Confirme sua senha:</label>
                    <input
                      type={isShow ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className={styles.input}
                      required
                      placeholder="Confirme sua senha"
                      onChange={handleChange}
                      value={values.confirmPassword}
                    />

                    <label className={styles.label}>Número de Contato:</label>
					          <input
                      maxLength={18}
                      id="phone"
                      name="phone"
                      className={styles.input}
                      type="text"
                      required
                      placeholder="Digite seu número de telefone"
                      onChange={e => setPhone(InputMask('phone',e.target.value))}
                      value={phone}

                    />

                    {/* <label
                        
                        className={styles.label}
                        >Data de nascimento:</label>
                        <input
                        id='phone'
                        name='phone'
                        className={styles.input} type='text'
                        required
                        placeholder='Digite sua data de nascimento'
                        onChange={handleChange}
                        value={values.phone}
                        /> */}

                    <label className={styles.label}>Endereço de CPF:</label>
                    <input
                      ref={cpfRef}
                      id="cpf"
                      name="cpf"
                      className={styles.input}
                      type="text"
                      required
                      placeholder="Digite seu CPF"
                      onChange={e => setCpf(InputMask('cpf',e.target.value))}
                      value={cpf}
                    />

                    <label className={styles.label}>Data de Nascimento:</label>
                    <input
                      ref={cpfRef}
                      id="birth"
                      name="birth"
                      className={styles.input}
                      type="date"
                      required
                      placeholder="Digite sua data de nascimento"
                      onChange={handleChange}
                      
                    />

                    <div>
                      <label>Eu concordo com os termos e condições</label>
                    </div>

                    <button type="submit" className={styles.button}>
                      Inscrever-se
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>

          <label>Já tem uma conta ?</label>
          <a className={styles.al} href="Login">
            {" "}
            Conecte-se
          </a>
        
      </div>
    </PageWrapper>
  );
};

export default RegistrationForm;

