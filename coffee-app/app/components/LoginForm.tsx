'use client'

import NextLink from 'next/link';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PageWrapper } from './PageWrapper';
import { FiChevronRight } from 'react-icons/fi';
import { useAuth } from '@/app/context/AuthContext';
import { LoginType } from '@/app/Types/AuthTypes';
import styles from "../styles/SignUp.module.css";

const LoginForm = () => {

	const [data, setData] = useState<LoginType>({
		email: '',
		password: '',
	});

	// Use the signIn method from the AuthContext
	const { logIn } = useAuth();
	const router = useRouter();
	const [isShow, setIsShow] = useState(false);
	const handlePassword = () => setIsShow(!isShow);


	const handleLogin = async (e: any) => {
		e.preventDefault();
		try {
			await logIn(data.email, data.password);
			router.push('/Profile');
		} catch (error: any) {
			console.log(error.message);
		}
	};

	// Destructure data from the data object
	const { ...allData } = data;

	// Disable submit button until all fields are filled in
	const canSubmit = [...Object.values(allData)].every(Boolean);

	return (
		<PageWrapper>
			<div>
			<label className={styles.title}>Entrar</label>

			<label className={styles.subTitle}>Seja bem vindo novamente.</label>

				<div className={styles.container} >
				
					<form action="" onSubmit={handleLogin} className="">			
						
						<label className={styles.label}>Endereço de email:</label>

							<input
								type="email"
								name="email"
								id="email"
								className={styles.input}
								autoComplete="off"
								required
								pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
								placeholder="Digite seu endereço de email"
								onChange={(e: any) => {
									setData({
										...data,
										email: e.target.value,
									});
								}}
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
                        onChange={(e: any) => {
							setData({
								...data,
								password: e.target.value,
							});
						}}
                        value={data.password}
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
							
						

						<button
							type="submit"
							disabled={!canSubmit}
							className={styles.button}
						>
							Entrar
						</button>

						<div>

							<label>Não tem uma conta?</label>
							<a className={styles.al} href="Login">
								{" "}
								Inscrever-se
							</a>
							
						</div>

					</form>
				</div>
				</div>
			
		</PageWrapper>
	);
};

export default LoginForm;