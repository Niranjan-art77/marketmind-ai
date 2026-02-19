import React, { useState } from 'react';
import { analyzeCompetitor } from '../api/client';
import { Search, AlertCircle, CheckCircle, BarChart2, Shield, Target, Lightbulb, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CompetitorAnalysis = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await analyzeCompetitor(url);
            setResult(data);
        } catch (err) {
            setError(err.detail || 'Failed to analyze competitor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center pb-20 pt-24 px-4">

            {/* Header Section */}
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-mono tracking-wider uppercase mb-4"
                >
                    <Shield size={14} /> Market Intelligence
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">Competitor Intelligence</h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                    Decode your competition. Uncover gaps. Win the market.
                </p>
            </div>

            {/* Input Section */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="max-w-3xl mx-auto w-full mb-16"
            >
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-purple-600 to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                    <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/10 rounded-full p-2 pr-2 shadow-2xl">
                        <div className="pl-6 text-gray-400">
                            <Search size={24} />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter competitor URL (e.g., https://cowboy.com) or Name (e.g., 'Tesla')"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-transparent border-none px-4 py-4 text-white text-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-accent text-[#2A1B24] rounded-full px-8 py-4 font-bold text-lg hover:bg-white transition-all disabled:opacity-50 flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(233,189,67,0.3)] hover:shadow-[0_0_30px_rgba(233,189,67,0.5)]"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-[#2A1B24]/30 border-t-[#2A1B24] rounded-full animate-spin" />
                            ) : (
                                <>
                                    Analyze <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="max-w-3xl mx-auto bg-red-500/10 text-red-400 p-4 rounded-xl flex items-center gap-3 border border-red-500/20 mb-8"
                    >
                        <AlertCircle size={20} />
                        <span className="font-medium">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Section */}
            {result && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8 max-w-7xl mx-auto w-full"
                >
                    {/* Main Positioning Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-[#7D3780] to-[#4A2C40] text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl border border-white/10"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/30 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 items-start">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-3 opacity-90">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <BarChart2 size={24} className="text-accent" />
                                    </div>
                                    <span className="text-sm font-bold tracking-widest uppercase">Target Positioning</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                                    {result.positioning}
                                </h3>
                            </div>
                            <div className="shrink-0">
                                <div className="bg-black/30 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/10 flex flex-col items-center gap-2">
                                    <span className="text-xs opacity-70 uppercase tracking-wider font-bold">AI Confidence</span>
                                    <span className="font-bold text-5xl text-accent">{result.confidence_score}%</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Strengths */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-white/10 transition-colors group"
                        >
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircle size={24} />
                                </div>
                                Competitor Strengths
                            </h3>
                            <ul className="space-y-4">
                                {result.strengths.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 text-gray-300 leading-relaxed font-medium group/item hover:text-white transition-colors">
                                        <span className="w-2 h-2 rounded-full bg-green-500 mt-2.5 shrink-0 group-hover/item:shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-shadow" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Weaknesses */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-white/10 transition-colors group"
                        >
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform duration-300">
                                    <AlertCircle size={24} />
                                </div>
                                Exploitable Weaknesses
                            </h3>
                            <ul className="space-y-4">
                                {result.weaknesses.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 text-gray-300 leading-relaxed font-medium group/item hover:text-white transition-colors">
                                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2.5 shrink-0 group-hover/item:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-shadow" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Market Gaps */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-white/10 transition-colors group"
                        >
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                                    <Target size={24} />
                                </div>
                                Market Opportunities
                            </h3>
                            <ul className="space-y-4">
                                {result.market_gaps.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 text-gray-300 leading-relaxed font-medium group/item hover:text-white transition-colors">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2.5 shrink-0 group-hover/item:shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-shadow" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Strategy */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-black to-zinc-900 border border-white/10 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] group-hover:bg-accent/20 transition-colors duration-500" />

                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-accent text-[#2A1B24] flex items-center justify-center shadow-[0_0_20px_rgba(233,189,67,0.3)] group-hover:scale-110 transition-transform duration-300">
                                    <Zap size={24} fill="currentColor" />
                                </div>
                                Strategic Recommendation
                            </h3>
                            <p className="text-xl leading-relaxed text-gray-300 font-medium relative z-10">
                                {result.recommended_strategy}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CompetitorAnalysis;
