import { IoIosCloseCircle } from "react-icons/io";
import { useProductsContext } from "../context/CartContext";
import Image from "next/image"
import { FaTrash } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { useCartModalContext } from "../context/CartModalContext";
import { useState } from "react";
import styles from "../styles/NewRequest.module.css";

const CartModal: React.FC = () => {
  const { products,decrementAmount, removeFromCart,incrementAmount   } = useProductsContext();
  const {cartModal,setCartModal}=useCartModalContext();
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false)
  
  const totalPrice = products.reduce((total, product) => total + (product.price * product.amountProduct), 0); // Multiplication du prix par la quantité


  const handleNewRequest = (e:any) => {
    e.preventDefault();
    setButtonLoading(true);
    router.push('/NewRequest')
    setButtonLoading(false);
    setCartModal(false)
    
  }

  return (
    <>
      {cartModal && (
        <div className=" w-[300px] h-[100vh] overflow-y-auto fixed right-0 bg-white border border-l-gray-700 pb-16">
          <button onClick={() => setCartModal(!cartModal)} className="text-gray-700 absolute top-2 right-2">
            <IoIosCloseCircle />
          </button>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Carrinho</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="border-b py-2">
                  <Image src={product.image} alt={product.name} width={50} height={50}/>
                  <h3 className="text-lg text-gray-700 font-bold ">{product.name}</h3>
                  <p className="mt-2 text-gray-700 flex items-center gap-2"><span>Quantidade:</span><span className="font-bold ">{product.amountProduct} </span></p>
                  <p className="text-sm text-gray-500">Preço: {product.price}R$</p>

                  <div className="flex items-center gap-2">
                  <button className="mt-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 p-2 rounded-lg cursor-pointer flex items-center justify-center"  onClick={() => decrementAmount(product.id)}>
                    -
                  </button>
                  <button className="mt-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 p-2 rounded-lg cursor-pointer flex items-center justify-center"  onClick={() => incrementAmount(product.id)}>
                    +
                  </button>
                  <button className="mt-2 w-6 h-6 bg-red-500 hover:bg-red-600 p-2 rounded-lg cursor-pointer flex items-center justify-center"  onClick={() => removeFromCart(product.id)}>
                    <FaTrash />
                  </button>
                  </div>
                  
                </div>
              ))
            )}
            <p className="mt-5 text-gray-700 flex items-center gap-2"><span>Total:</span><span className="font-bold text-2xl">{totalPrice} R$</span></p>
            <button className="w-full grid mt-5 self-end place-content-center bg-orange-400 hover:bg-orange-600 rounded-md text-white p-2" onClick={(e) => handleNewRequest(e)} >
              {!buttonLoading?'Prossiga para o pagamento' : <div className={styles.contactSubmitEndRequestLoader}></div>}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;