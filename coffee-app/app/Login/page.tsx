"use client"

import Head from 'next/head';
import LoginForm from '@/app/components/LoginForm';
import RedirectHomeRoute from '../components/RedirectHomeRoute';
import { useAuth } from '@/app/context/AuthContext';
import MainContainer from "@/app/components/MainContainer";

export default function Login() {
    
    const { user } = useAuth();

    return (
        <>
        <RedirectHomeRoute>
            <MainContainer>
        
            {!user.uid && 
            (
            <main className="m-0 bg-gradient-to-br from-primary-color to-blue-400 px-4">
                <LoginForm />
            </main>)
            }
            </MainContainer>
        </RedirectHomeRoute>
        </>
    );
}