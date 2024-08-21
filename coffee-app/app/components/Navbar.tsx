'use client'

import { FaCartShopping } from "react-icons/fa6";
import { GiCoffeeBeans } from "react-icons/gi";
import Link from "next/link"
import CartModal from "./CartModal";
import { useProductsContext } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/db/firebaseConfig"
import styles from '@/app/styles/Navbar.module.css'
import { useRouter } from 'next/navigation'
import { MdAccountCircle } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { useCartModalContext } from "../context/CartModalContext";

interface UserType {
    
  uid: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  phone: number | null;
  cpf: number | null;
}

export default function Navbar() {

  const { user, logOut } = useAuth();
  const {cartModal,setCartModal}=useCartModalContext();
  
  const router = useRouter();

  const [dataUser, setDataUser] = useState<UserType>({ uid: null, username:null, email: null, password: null, confirmPassword: null, phone: null, cpf: null })
  
  const handleCartModal = () => {
    setCartModal(!cartModal)
  }

  const { products } = useProductsContext();
  const totalProductCount = products.reduce((totalCount, product) => totalCount + product.amountProduct, 0)

  const handleLogout = () => {
    logOut();
		router.push('/');
  };

  const handleProfile = () => {
    
		router.push('/Profile');

  };

  useEffect(() => {
    const fetchData = async () => {

      if (user.uid){

        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
  
        const {uid, username, email, password, confirmPassword, phone, cpf} = docSnap.data()
        
        setDataUser({
          uid,
          username,
          email,
          password,
          confirmPassword,
          phone,
          cpf
        })
      }

      }   
      
    }
    fetchData();
  }, [db])

  

  

  return (
    
    <div>

    <div className={styles.cartModal}>
    <CartModal />
    </div>

    <div>

    <nav 
    className={styles.navbar}>

      <ul>
      <li className={styles.logo}><Link href={"/"} ><GiCoffeeBeans/></Link></li>

      {/* {user.uid && (<p className={styles.username}>Olá tudo bem {dataUser.username}</p>)} */}


        <li><Link className={styles.hover} href={"/"} >Sobre</Link>
      <div className={styles.subMenuA}>
        <ul>
            <li/><Link className={styles.hover} href={'/#products'}>Produtos</Link>
            
            <li/><Link className={styles.hover} href={'/'}>Segurança</Link>
        </ul>
      </div>
      </li>

      
      
      {!user.uid && (<li><Link className={styles.hover} href={"/SignUp"} >Criar Conta</Link></li>)}
      {!user.uid && (<li><Link className={styles.hover} href={"/Login"} >Entrar</Link></li>)}
      {user.uid && (<button 
      className="p-2 flex items-center justify-center max w-24 h-24 hover:bg-neutral-900 relative cursor-pointer"
      onClick={handleProfile}><li><MdAccountCircle size={25} className={styles.iconProfile}/></li></button>)}
      {user.uid && (<button
      className="p-2 flex items-center justify-center max w-24 h-24 hover:bg-neutral-900 relative cursor-pointer"
      onClick={handleLogout}
      ><li><TbLogout size={25} className={styles.iconLogout}/></li></button>)}
      

      <button onClick={handleCartModal} className="p-2 flex items-center justify-center max w-24 h-24 hover:bg-neutral-900 relative cursor-pointer">
        <span className="absolute top-7 right-5 bg-red-500 rounded-full p-1 text-[11px] flex items-center justify-center h-4 w-4" >{totalProductCount}</span>
        <FaCartShopping size={20} className={styles.iconCart}/>
      </button>
      
     </ul>
    
    </nav>

    </div>
    

    </div>
    
  )
}
