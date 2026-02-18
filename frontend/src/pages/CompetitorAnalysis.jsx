import React, { useState } from 'react';
import { analyzeCompetitor } from '../api/client';
import { Search, AlertCircle, CheckCircle, BarChart2, Shield, Target, Lightbulb } from 'lucide-react';
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
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Competitor Intelligence</h2>
                    <p className="text-gray-400 mt-2">AI-powered analysis of competitor websites to find gaps and opportunities.</p>
                </div>
            </div>

            {/* Input Section */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-card bg-gradient-to-r from-surface/50 to-blue-900/10"
            >
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="url"
                            placeholder="Enter competitor URL (e.g., https://example.com)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="neon-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-8"
                    >
                        {loading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                Scanning...
                            </>
                        ) : (
                            <>
                                <span>Analyze</span>
                                <Target size={18} />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3"
                    >
                        <AlertCircle size={20} />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Section */}
            {result && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Main Positioning Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card md:col-span-2 bg-gradient-to-br from-surface/40 to-accent/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <BarChart2 className="text-accent" />
                                Market Positioning
                            </h3>
                            <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                                Confidence: {result.confidence_score}%
                            </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg relative z-10">
                            {result.positioning}
                        </p>
                    </motion.div>

                    {/* Strengths */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card border-l-4 border-l-green-500"
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <CheckCircle className="text-green-500" /> Strengths
                        </h3>
                        <ul className="space-y-3">
                            {result.strengths.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Weaknesses */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card border-l-4 border-l-red-500"
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <AlertCircle className="text-red-500" /> Weaknesses
                        </h3>
                        <ul className="space-y-3">
                            {result.weaknesses.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Market Gaps */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card border-l-4 border-l-yellow-500"
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Target className="text-yellow-500" /> Market Gaps
                        </h3>
                        <ul className="space-y-3">
                            {result.market_gaps.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Recommended Strategy */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card border-l-4 border-l-blue-500"
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Lightbulb className="text-blue-500" /> Strategy
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {result.recommended_strategy}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default CompetitorAnalysis;
