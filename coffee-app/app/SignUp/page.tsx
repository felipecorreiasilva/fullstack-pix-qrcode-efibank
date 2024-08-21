"use client"

import RegistrationForm from '@/app/components/RegistrationForm';
import { useAuth } from '@/app/context/AuthContext';
import MainContainer from "@/app/components/MainContainer";
import RedirectHomeRoute from '../components/RedirectHomeRoute';

const SignUp = () => {

    const { user } = useAuth();
    
    return (
        <>
            <RedirectHomeRoute>

                <MainContainer>
                
                    {!user.uid &&
                    (<main className="m-0 min-h-screen bg-gradient-to-br from-primary-color to-blue-400 px-4">
                        <RegistrationForm />
                    </main>)
                    }

                </MainContainer>

            </RedirectHomeRoute>
        </>
    );
};

export default SignUp;