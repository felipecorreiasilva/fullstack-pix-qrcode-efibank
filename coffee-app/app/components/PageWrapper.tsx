'use client';
import { motion, AnimatePresence } from 'framer-motion';

export const PageWrapper = ({ children }: { children: any }) => {
	return (
		<>
			<AnimatePresence>
				<motion.div
					initial={{
						opacity: 0,
						y: 0,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					exit={{ opacity: 0, y: 0 }}
					transition={{ delay: 0.3 }}
					className="min-h-screen flex justify-center items-center"
				>
					<div>
						{children}
						
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
};