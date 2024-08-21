import Header from "./Header";
import Footer from "./Footer";
import styles from '../styles/MainContainer.module.css'
import { useState } from "react";

interface MainProps{
    children:any
}

export default function MainContainer (props:MainProps){
    
    // const [cart, setCart] = useState([1,2,3]);
  
    return (
        <>
        
            <Header/>
            
            <div className={styles.container}>{props.children}</div>

            <main>

            </main>
            <Footer/>

        </>
    )
}
