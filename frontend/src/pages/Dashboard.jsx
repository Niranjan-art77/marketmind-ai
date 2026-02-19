import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    BarChart2,
    Zap,
    ArrowRight,
    TrendingUp,
    Target,
    Globe,
    Cpu,
    Activity
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#2A1B24] text-white">

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(74,44,64,0.4),transparent_60%)]" />
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(125,55,128,0.2),transparent_50%)]" />
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#2A1B24]/0 via-[#2A1B24]/50 to-[#2A1B24]" />

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4">
                                Corporate Intelligence v2.0
                            </h2>
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight uppercase tracking-tighter">
                                Unleash <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Revenue</span> <br />
                                Intelligence
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg text-gray-400 max-w-lg leading-relaxed border-l-2 border-accent/50 pl-6"
                        >
                            Transform competitor insights into strategic growth with AI.
                            Predict market shifts before they happen.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <NavLink to="/competitor" className="bg-accent text-[#2A1B24] px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_25px_rgba(233,189,67,0.4)] clip-path-slant flex items-center gap-2 group">
                                Start Analysis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </NavLink>
                            <NavLink to="/revenue" className="px-8 py-4 border border-white/20 font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2">
                                View Strategy
                            </NavLink>
                        </motion.div>
                    </div>

                    {/* Right Visual - Abstract Cinematic UI */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main Glass Panel */}
                        <div className="relative bg-[#4A2C40]/30 backdrop-blur-md border border-white/10 p-6 rounded-none w-full max-w-[600px] mx-auto shadow-2xl">
                            {/* Fake UI Header */}
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                </div>
                                <div className="text-xs font-mono text-gray-500 tracking-widest">SYSTEM_LIVE</div>
                            </div>

                            {/* Data Visualization Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Card 1 */}
                                <div className="bg-[#2A1B24]/80 p-6 border border-white/5 space-y-2">
                                    <Activity className="text-accent mb-2" size={24} />
                                    <div className="text-4xl font-bold text-white">98.4<span className="text-sm text-gray-500">%</span></div>
                                    <div className="text-xs uppercase tracking-widest text-gray-400">Prediction Accuracy</div>
                                    <div className="w-full bg-gray-800 h-1 mt-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "98%" }}
                                            transition={{ delay: 1, duration: 1.5 }}
                                            className="h-full bg-accent"
                                        />
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-[#2A1B24]/80 p-6 border border-white/5 space-y-2">
                                    <Cpu className="text-purple-400 mb-2" size={24} />
                                    <div className="text-4xl font-bold text-white">24ms</div>
                                    <div className="text-xs uppercase tracking-widest text-gray-400">Latency</div>
                                </div>

                                {/* Card 3 - Wide */}
                                <div className="col-span-2 bg-[#2A1B24]/80 p-6 border border-white/5 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Market Trend</div>
                                        <div className="text-xl font-bold text-green-400 flex items-center gap-2">
                                            +12.5% <TrendingUp size={16} />
                                        </div>
                                    </div>
                                    <div className="h-10 flex items-end gap-1">
                                        {[40, 60, 45, 70, 50, 80, 65, 90].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                                                className="w-2 bg-gradient-to-t from-accent to-purple-500 opacity-80"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 bg-[#7D3780] p-4 shadow-lg border border-white/20 backdrop-blur-md"
                        >
                            <Zap size={24} className="text-white" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* --- FEATURES SECTION --- */}
            <section className="py-24 bg-[#1A0F16] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <NavLink to="/competitor" className="group block">
                            <div className="bg-[#2A1B24] border border-white/5 p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(74,44,64,0.6)]">
                                <div className="w-14 h-14 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-[#2A1B24] transition-colors">
                                    <Search size={28} className="text-accent group-hover:text-[#2A1B24]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Competitor <br /> Intelligence</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Deep-dive analysis of competitor strategies. Decode their pricing, keywords, and traffic sources instantly.
                                </p>
                                <span className="text-accent font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Analyze Now <ArrowRight size={16} />
                                </span>
                            </div>
                        </NavLink>

                        {/* Feature 2 */}
                        <NavLink to="/revenue" className="group block">
                            <div className="bg-[#2A1B24] border border-white/5 p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(125,55,128,0.4)]">
                                <div className="w-14 h-14 bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <BarChart2 size={28} className="text-purple-500 group-hover:text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Revenue <br /> Simulation</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Predict future outcomes with military-grade precision. Simulate conversion rates and ad spend impact.
                                </p>
                                <span className="text-purple-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Simulate ROI <ArrowRight size={16} />
                                </span>
                            </div>
                        </NavLink>

                        {/* Feature 3 */}
                        <NavLink to="/campaign" className="group block">
                            <div className="bg-[#2A1B24] border border-white/5 p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                                <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Target size={28} className="text-blue-500 group-hover:text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Campaign <br /> Generator</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    AI-crafted marketing campaigns that convert. Generate copy and strategy in seconds.
                                </p>
                                <span className="text-blue-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Create Campaign <ArrowRight size={16} />
                                </span>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
