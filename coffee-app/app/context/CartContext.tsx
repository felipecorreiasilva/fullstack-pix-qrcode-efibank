"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { ProductsTypes } from '../Types/productsType'

interface ProductsContextType {
    products: ProductsTypes[];
    addToCart: (product: ProductsTypes ) => void;
    decrementAmount: (productId: string) => void;
    incrementAmount: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

interface ProductsProviderProps {
    children: ReactNode;
}

const getInitialProducts = () => {
    const products = (typeof window !== 'undefined') && sessionStorage.getItem('products')
    return products ? JSON.parse(products) : []
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const ProductsProvider : React.FC<ProductsProviderProps> = ({children}) => {
    const [products, setProducts] = useState<ProductsTypes[]>(getInitialProducts);

    useEffect(() => {
        sessionStorage.setItem('products', JSON.stringify(products))
    }, [products]);

    const addToCart = (product: ProductsTypes) => {
        
        const existingProductIndex = products.findIndex((p) => p.id === product.id);
        
        if (existingProductIndex !== -1) {
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex].amountProduct += 1;
            setProducts(updatedProducts)
        }
        else {
            // Le produit n'existe pas dans le panier, nous l'ajoutons avec une quantité de 1
            setProducts([...products, { ...product, amountProduct: 1 }]);
          }
    }

    const decrementAmount = (productId: string) => {

        const updatedProducts = products.map(product => {
            
            if (product.id === productId){
                if( product.amountProduct > 1 ){
                    return { ...product, amountProduct: product.amountProduct - 1 }
                } else {
                    return null
                }
            }
            return product;

        }).filter(product => product !== null) as ProductsTypes[];
        setProducts(updatedProducts);

    }

    const incrementAmount = (productId: string) => {
        setProducts(prevProducts => prevProducts.map(product => product.id === productId ? {...product, amountProduct: product.amountProduct + 1} : product))
    }

    const removeFromCart = (productId: string)=> {
        setProducts(products.filter(product => product.id !== productId))
    }

    const clearCart = () => {
        setProducts([]); // set the cart items to an empty array
      };

    return (
        <ProductsContext.Provider value={{products, addToCart, removeFromCart, decrementAmount, incrementAmount, clearCart}} >{children}</ProductsContext.Provider>
    )

}

export const useProductsContext = () => {
    
    const context = useContext(ProductsContext)
    
    if (!context) {
        throw new Error('Error')
    }

    return context;
}