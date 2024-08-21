'use client'

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/db/firebaseConfig"

interface UserType {
    
    uid: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    phone: number | null;
    cpf: number | null;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    
    const router = useRouter();
    const { user } = useAuth();
    const [dataUser, setDataUser] = useState<UserType>({ uid: null, username:null, email: null, password: null, confirmPassword: null, phone: null, cpf: null })


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

            console.log(user?.uid)
            if (!user?.uid) {
                router.push('/');
            }
            
        
            
            
            
          }
          fetchData();

        

    }, [user]);

    return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;