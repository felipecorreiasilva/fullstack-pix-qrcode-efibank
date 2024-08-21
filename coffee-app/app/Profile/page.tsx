"use client"

import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/context/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react';

const Profile = () => {
	
	const { user, logOut } = useAuth();
	const router = useRouter();
    
	return (

        <div>

			{user?.uid &&

            (<div className="flex py-2 container mx-auto min-h-screen items-center">
				<div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
                        Você está logado! {user.email}
					</h2>

					<div className="flex justify-center items-center mb-8">
						<button
							onClick={() => {
								logOut();
								router.push('/');
							}}
							className="bg-green-600 hover:bg-green-700 px-10 py-3 rounded-md shadow-sm text-white"
						>
							Logout
						</button>
					</div>
				</div>
			</div>) 
			// :(<ProtectedRoute><div></div></ProtectedRoute>)

            }
		</div>
		

	);
};

export default Profile;