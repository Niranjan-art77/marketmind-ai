import React, { useState } from 'react';
import { generateCampaign } from '../api/client';
import { Wand2, Target, DollarSign, Lightbulb, Users, Copy, Share2, Layers, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CampaignGenerator = () => {
    const [inputs, setInputs] = useState({
        audience: '',
        revenue_goal: '',
        competitor_insight: ''
    });
    const [loading, setLoading] = useState(false);
    const [campaign, setCampaign] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setCampaign(null);

        try {
            const data = await generateCampaign(inputs);
            setCampaign(data);
        } catch (err) {
            setError(err.detail || 'Campaign generation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Campaign Generator</h2>
                    <p className="text-gray-400 mt-2">Create high-converting ad campaigns with AI in seconds.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="glass-card h-fit lg:sticky lg:top-24"
                >
                    <div className="flex items-center gap-2 mb-6 text-accent">
                        <Wand2 size={24} />
                        <h3 className="text-xl font-bold">Campaign Details</h3>
                    </div>

                    <form onSubmit={handleGenerate} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                                <Users size={14} /> Target Audience
                            </label>
                            <input
                                type="text"
                                name="audience"
                                placeholder="e.g., Tech Founders"
                                value={inputs.audience}
                                onChange={handleInputChange}
                                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                                <Target size={14} /> Revenue Goal
                            </label>
                            <input
                                type="text"
                                name="revenue_goal"
                                placeholder="e.g., $50k MRR"
                                value={inputs.revenue_goal}
                                onChange={handleInputChange}
                                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                                <Lightbulb size={14} /> Competitor Insight
                            </label>
                            <textarea
                                name="competitor_insight"
                                placeholder="Any specific angles?"
                                value={inputs.competitor_insight}
                                onChange={handleInputChange}
                                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 h-32 resize-none transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="neon-button w-full flex justify-center items-center gap-2 mt-4"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 size={18} /> Generate Magic
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!campaign && !loading && !error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass-card h-full min-h-[400px] flex flex-col items-center justify-center border-dashed border-2 border-white/10 text-center p-12"
                        >
                            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6">
                                <Wand2 size={40} className="text-gray-600" />
                            </div>
                            <h3 className="text-xl font-medium text-white">Ready to Create</h3>
                            <p className="text-gray-400 mt-2 max-w-sm">
                                Fill in the details on the left to generate tailored ad copy and strategy.
                            </p>
                        </motion.div>
                    )}

                    {campaign && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Platform Recommendation */}
                            <div className="glass-card bg-gradient-to-r from-accent/10 to-transparent border-l-4 border-l-accent relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-20 bg-accent/10 rounded-full blur-[50px] pointer-events-none"></div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-accent mb-2 flex items-center gap-2">
                                        <Share2 size={20} /> Recommended Platform: {campaign.recommended_platform}
                                    </h3>
                                    <p className="text-gray-300">{campaign.reasoning}</p>
                                </div>
                            </div>

                            {/* Ad Copies */}
                            <div className="glass-card">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <Copy size={20} /> Ad Variations
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {campaign.ad_copies.map((ad, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={idx}
                                            className="bg-surface/50 p-5 rounded-xl border border-white/5 hover:border-accent/30 hover:bg-surface/80 transition-all cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-1 rounded">Option {idx + 1}</span>
                                                <Copy size={14} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <h4 className="font-bold text-white mb-3 text-lg leading-tight">{ad.headline}</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">{ad.body}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Value Props */}
                                <div className="glass-card">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Layers size={20} /> Value Props
                                    </h3>
                                    <ul className="space-y-3">
                                        {campaign.value_propositions.map((prop, idx) => (
                                            <li key={idx} className="flex gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                                <span className="text-success mt-1">✔</span>
                                                {prop}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Emotional Hook & CTA */}
                                <div className="space-y-6">
                                    <div className="glass-card bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                            <Heart size={20} className="text-purple-400" /> Emotional Hook
                                        </h3>
                                        <p className="text-gray-300 italic text-lg leading-relaxed">"{campaign.emotional_hook}"</p>
                                    </div>

                                    <button className="w-full bg-white text-black font-bold py-4 px-6 rounded-xl hover:bg-gray-200 transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2 text-lg">
                                        {campaign.cta} <ArrowUpRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Missing Import Fix
import { ArrowUpRight } from 'lucide-react';

export default CampaignGenerator;
