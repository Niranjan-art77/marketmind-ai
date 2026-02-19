import React from 'react';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background font-sans text-primary selection:bg-accent/20">
            <Navbar />

            <main className="flex-1 w-full pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>

            <footer className="bg-surface border-t border-gray-100 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-gray-400 text-sm">
                        © 2024 MarketMind AI. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-gray-500 text-sm font-medium">
                        <a href="#" className="hover:text-black transition-colors">Privacy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms</a>
                        <a href="#" className="hover:text-black transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>

            <Chatbot />
        </div>
    );
};

export default Layout;
