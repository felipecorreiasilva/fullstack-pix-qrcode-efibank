'use client'

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react';

const RedirectHomeRoute = ({ children }: { children: React.ReactNode }) => {
    
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        
        if (user?.uid) {
            router.push('/');
        }
    }, [router, user]);

    return <div>{user ? children : null}</div>;
};

export default RedirectHomeRoute;