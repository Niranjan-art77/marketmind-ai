import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const navLinks = [
        { name: 'Strategy', path: '/' },
        { name: 'Competitor', path: '/competitor' },
        { name: 'Revenue', path: '/revenue' },
        { name: 'Campaign', path: '/campaign' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#2A1B24]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/" className="text-2xl font-bold tracking-widest uppercase text-white flex items-center gap-2">
                    MarketMind<span className="text-accent w-2 h-2 rounded-full bg-accent inline-block"></span>
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-medium tracking-wide transition-all hover:text-accent ${isActive ? 'text-white' : 'text-gray-400'}`
                            }
                        >
                            {link.name.toUpperCase()}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent shadow-[0_0_15px_rgba(233,189,67,0.2)]">
                                    <User size={18} />
                                </div>
                                <span className="text-sm font-medium text-gray-200 hidden lg:block tracking-wide">{user.name}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-gray-500 hover:text-accent transition-colors flex items-center gap-2 group"
                            >
                                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <NavLink to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide">
                            LOG IN
                        </NavLink>
                    )}
                    <NavLink to="/competitor" className="bg-accent text-[#2A1B24] px-8 py-3 rounded-none font-bold text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(233,189,67,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] tracking-wider uppercase clip-path-slant">
                        Analyze Market
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#2A1B24] border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            {user && (
                                <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">{user.name}</p>
                                        <p className="text-xs text-gray-400">@{user.username}</p>
                                    </div>
                                </div>
                            )}

                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `text-xl font-bold tracking-wider uppercase ${isActive ? 'text-accent' : 'text-gray-400'}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <hr className="border-white/10" />

                            {user ? (
                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="w-full text-left text-lg font-bold text-red-400 py-2 flex items-center gap-2 tracking-wide"
                                >
                                    <LogOut size={20} /> LOG OUT
                                </button>
                            ) : (
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-left text-lg font-bold text-white py-2 tracking-wide"
                                >
                                    LOG IN
                                </NavLink>
                            )}

                            <NavLink to="/competitor" onClick={() => setIsOpen(false)} className="w-full block text-center bg-accent text-[#2A1B24] px-6 py-4 font-bold text-lg hover:bg-white transition-all tracking-widest uppercase">
                                Analyze Market
                            </NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
