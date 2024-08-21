"use client"

import Header from "./components/Header"
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/db/firebaseConfig"
import Galerie from "./components/Galerie"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductsTypes } from "./Types/productsType";
import Footer from "./components/Footer";
import { MdKeyboardArrowDown } from "react-icons/md"

export default function Home() {
  
  const [dataProducts, setDataProducts] = useState<ProductsTypes[]>([])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const productsCollection = collection(db, "products")
    const productsSnapshot = await getDocs(productsCollection)
    const productsData = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as ProductsTypes[];
    setDataProducts(productsData)
  }

  return (
    <>
    <ToastContainer/>
      <Header/>

      <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTcxMzA4Ni13aWtpbWVkaWEtaW1hZ2Utam9iNTcyLTEuanBn.jpg)"}}
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center flex-col">
        <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-8x1" >Coofee<span className="text-[#f9bd93]" >SHOP</span></h1>
        <p className="text-white font-bold m-2 text-center text-[12px] md:text-[14px] lg:text-[16px] " >Confira todos nossos produtos</p>
        <a href="#products" className="text-white text-4xl cursor-pointer hover:text-[#f9bd93] hover:scale-110 transition-all" ><MdKeyboardArrowDown/></a>
        
        </div>

    </div>

    <div>
    <Galerie dataProducts={dataProducts} />

    </div>

      
      <Footer />
    </>
  );
}
