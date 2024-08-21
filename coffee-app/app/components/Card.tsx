import React, { useState } from 'react'

import {toast} from "react-toastify"
import { ProductsTypes } from "../Types/productsType";
import { BiWorld, BiSolidCoffeeBean } from "react-icons/bi";
import { RiRedPacketFill } from "react-icons/ri";
import { useProductsContext } from '../context/CartContext'
import CartModal from './CartModal';
import styles from '@/app/styles/Navbar.module.css'
import { useCartModalContext } from '../context/CartModalContext';

interface CardProps {
    item: ProductsTypes;
}

export default function Card({item}: CardProps) {

    const {addToCart} = useProductsContext();
    const {cartModal,setCartModal}=useCartModalContext();


    const handleAddToCart = () => {
        
        addToCart(item)
        setCartModal(true)
        toast.success(`x1 ${item.name} adicionado ao seu carrinho`)
    }

  return (
    
    <div>

      <div className={styles.cartModal}>
      <CartModal />
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 relative flex flex-col justify-between  gap-2">
      
      <img src={item.image} alt={item.name} className="w-full object-cover mb-4 rounded-md" />
      <h2 className="text-[16] font-bold uppercase">{item.name}</h2>
      <p className="text-[12px] text-gray-900 flex items-center gap-2"><span className="font-bold flex items-center gap-1"><RiRedPacketFill/> Quantidade: </span><span>Pacote de {item.amountPack}g</span></p>
      <p className="text-[12px] text-gray-900 flex items-center gap-2"><span className="font-bold flex items-center gap-1"><BiSolidCoffeeBean/> Força: </span><span>{item.strength}</span></p>
      <p className="text-[12px] text-gray-900 flex items-center gap-2"><span className="font-bold flex items-center gap-1"><BiWorld/> País: </span><span>{item.country}</span></p>

      <p className="text-[14px] text-gray-400 ">{item.desc}</p>
   
      <p className="bg-orange-400 text-white font-bold mt-2 absolute top-2 right-2 p-4 rounded-full">{item.price} R$</p>

      <button onClick={handleAddToCart}  className="self-end bg-orange-400 hover:bg-orange-600 rounded-md text-white p-2">Adicionar ao carrinho</button>
    </div>

    </div>
    
    
  )
}
