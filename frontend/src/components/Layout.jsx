import React from 'react';
import Sidebar from './Sidebar';
import SystemStatus from './SystemStatus';
import { motion } from 'framer-motion';
import Chatbot from './Chatbot';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-background text-white overflow-hidden font-sans relative selection:bg-accent/30 selection:text-white">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
            </div>

            <Sidebar />

            <main className="flex-1 overflow-auto relative z-10 custom-scrollbar">
                <div className="p-8 pb-32">
                    <header className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <SystemStatus />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center shadow-lg">
                                <span className="text-sm font-bold text-accent">JD</span>
                            </div>
                        </div>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-7xl mx-auto relative z-0"
                    >
                        {children}
                    </motion.div>
                </div>
            </main>

            <Chatbot />
        </div>
    );
};

export default Layout;
