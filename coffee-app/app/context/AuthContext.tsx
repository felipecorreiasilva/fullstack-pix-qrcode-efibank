"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth, db } from '@/app/db/firebaseConfig';
import { ProfileType } from "../Types/AuthTypes";
import { setDoc, doc } from 'firebase/firestore'

// User data type interface
interface UserType {
    
    uid: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    phone: string | null;
    cpf: number | null;
    birth: Date | null
}

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);


const getInitialAuth = () => {
    const user = (typeof window !== 'undefined') && localStorage.getItem('user')
    return user && JSON.parse(user)
}
// Create the auth context provider
export const AuthContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    // Define the constants for the user and loading state
    const [user, setUser] = useState<UserType>({ uid: null, username:null, email: null, password: null, confirmPassword: null, phone: null, cpf: null, birth: null });
    const [userStorage, setUserStorage] = useState(getInitialAuth);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        localStorage.setItem('verifiedPaymentMethod', JSON.stringify(userStorage))
    }, [userStorage]);

    // Update the state depending on auth
    useEffect(() => {
        const unsubscribe = async () => {

            await onAuthStateChanged(auth, (userAuth) => {
                if (userAuth) {
                    setUser({
                        uid: userAuth.uid,
                        username: user.username,
                        email: userAuth.email,
                        password: user.password,
                        confirmPassword: user.confirmPassword,
                        phone: user.phone,
                        cpf: user.cpf,
                        birth: user.birth
                        
                        
                    });
                    setUserStorage({
                        uid: userAuth.uid,
                        username: user.username,
                        email: userAuth.email,
                        password: user.password,
                        confirmPassword: user.confirmPassword,
                        phone: user.phone,
                        cpf: user.cpf,
                        birth: user.birth
                        
                        
                    });
                } 
                // else {
                //     setUser({ uid: null, email: null });
                // }
            });
            
        }
        

        setLoading(false);

        unsubscribe();
    }, []);

    // Sign up the user
    const signUp = async(values:ProfileType, type:any) => {
        let {
            email,
            username,
            password,
            confirmPassword,
            phone,
            cpf,
            birth,
        } = values;
        await createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
            
            const data = {

              uid: userCred?.user.uid,
              username,
              password,
              confirmPassword,
              phone,
              cpf,
              birth,

            };
            
            setDoc(doc(db, "users", userCred?.user.uid), data).then(
              () => {
                
                setUser({
                    
                    uid: userCred?.user.uid,
                    email,
                    password,
                    confirmPassword,
                    phone,
                    cpf,
                    username,
                    birth

                });
                setUserStorage(data)
                
              }
            );
          });
    };

    // Login the user
    const logIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password).then(()=>{
            
        })
    };

    // Logout the user
    const logOut = async () => {
        setUser({ 
            
            uid: null ,
            username: null,
            email: null,
            password: null,
            confirmPassword: null,
            phone: null,
            cpf: null,
            birth: null

        });
        setUserStorage({ 
            
            uid: null ,
            username: null,
            email: null,
            password: null,
            confirmPassword: null,
            phone: null,
            cpf: null,
            birth: null

        });
        return await signOut(auth);
    };

    // Wrap the children with the context provider
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};