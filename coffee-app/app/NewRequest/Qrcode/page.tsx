// "use client"

// import React, { useState } from 'react'
// import MainContainer from '../../components/MainContainer'
// import { usePaymentMethodContext } from '../../context/PaymentMethodContext';
// import styles from "../../styles/Qrcode.module.css";
// import {CopyToClipboard} from 'react-copy-to-clipboard';
// import { TbCopy } from "react-icons/tb";
// import { TbCopyCheck } from "react-icons/tb";

// export default function page() {
//     const { newRequest, setNewRequest } = usePaymentMethodContext();
//     const [ clipboardState, setClipboardState ] = useState(false)
    
//     console.log(newRequest.txid)
//   return (
//     <MainContainer>
//         <div>
//             <div className={styles.qrcode}>
//             <div className='text-center font-medium'>
//             <h2 className='text-2xl'>Pedido Realizado</h2>
            
//                 <p className='mt-4'>ID da Transação: {newRequest.txid}</p>
//                 <p>Para: {newRequest.firstname} {newRequest.lastname}</p>
//                 <p>Estado: {newRequest.uf}, Cidade: {newRequest.city}</p>
//                 <p>Bairro: {newRequest.neighborhood}, Rua: {newRequest.adresses}</p>
                
//             </div>
//             <img className={styles.imgQrcode} src={newRequest.imagemQrcode} />
//             <div className='flex flex-col' >


//               <label className='font-medium text-2xl'>Copia e Cola</label>
              
//               <CopyToClipboard text={newRequest.pixCopiaECola}
//                 onCopy={() => setClipboardState(true)}>
//                 <button className='mt-4 break-words font-medium'>{!clipboardState ? <TbCopy className='m-auto' size={40} color='#111827'/> : null}</button>
                
//               </CopyToClipboard>
              
//               {clipboardState ? <TbCopyCheck className='m-auto' size={40} color='#111827'/> : null}

//             </div>
            
            
//             </div>
//         </div>
    
//     </MainContainer>
//   )
// }
