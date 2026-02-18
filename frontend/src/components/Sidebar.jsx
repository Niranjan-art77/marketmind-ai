import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Globe, TrendingUp, Megaphone, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const navItems = [
        { name: 'Strategy Board', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Competitor Intel', path: '/competitor', icon: <Globe size={20} /> },
        { name: 'Revenue Sim', path: '/revenue', icon: <TrendingUp size={20} /> },
        { name: 'Campaign Gen', path: '/campaign', icon: <Megaphone size={20} /> },
    ];

    return (
        <aside className="w-72 glass border-r border-white/10 hidden md:flex flex-col z-20 shadow-2xl">
            <div className="h-20 flex items-center px-8 border-b border-white/10">
                <span className="text-3xl font-bold tracking-wider text-white">MMAI</span>
            </div>

            <nav className="flex-1 py-8 space-y-2 px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                ? 'text-white font-medium bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`transition-transform duration-300 ${isActive ? 'scale-110 text-accent' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                <span className="relative z-10">{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-accent/5 rounded-xl -z-0"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-white/10">
                <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full px-4 py-3 rounded-xl hover:bg-white/5">
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
                <div className="mt-4 text-xs text-center text-gray-600">
                    © 2024 MarketMind AI
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
