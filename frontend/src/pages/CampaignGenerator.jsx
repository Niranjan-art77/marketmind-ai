import React, { useState } from 'react';
import { generateCampaign } from '../api/client';
import { Wand2, Target, DollarSign, Lightbulb, Users, Copy, Share2, Layers, Heart, Sparkles, ArrowRight } from 'lucide-react';
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
        <div className="space-y-12 pb-20">
            <div className="max-w-2xl mx-auto text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">Campaign Generator</h2>
                <p className="text-gray-500 text-lg">
                    The world's most advanced AI creative director, at your fingertips.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Form */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="lg:col-span-4 h-fit sticky top-24"
                >
                    <div className="bg-secondary text-white rounded-[2rem] p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                <Sparkles size={20} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold">Campaign Brief</h3>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Target Audience</label>
                                <input
                                    type="text"
                                    name="audience"
                                    placeholder="e.g., SaaS Founders in Europe"
                                    value={inputs.audience}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all font-medium"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Revenue Goal</label>
                                <input
                                    type="text"
                                    name="revenue_goal"
                                    placeholder="e.g., $100k Q3 Sales"
                                    value={inputs.revenue_goal}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all font-medium"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Competitor Insight</label>
                                <textarea
                                    name="competitor_insight"
                                    placeholder="e.g., Competitor X is too expensive..."
                                    value={inputs.competitor_insight}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 h-32 resize-none transition-all font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black rounded-full py-4 font-bold hover:bg-gray-200 transition-all mt-6 disabled:opacity-50 flex items-center justify-center gap-2 text-lg active:scale-95"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        Generate <Wand2 size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Results Panel */}
                <div className="lg:col-span-8 space-y-8">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!campaign && !loading && !error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-zinc-50 rounded-[2rem] h-[600px] flex flex-col items-center justify-center border-dashed border-2 border-gray-200 text-center p-12"
                        >
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <Layers size={40} className="text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Awaiting Brief</h3>
                            <p className="text-gray-400 mt-2 max-w-sm text-lg">
                                Provide your campaign details to unleash AI creativity.
                            </p>
                        </motion.div>
                    )}

                    {campaign && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Platform Recommendation */}
                            <div className="bg-black text-white rounded-[2rem] p-8 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -mr-16 -mt-16" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-accent mb-4">
                                        <Share2 size={20} />
                                        <span className="font-bold uppercase tracking-widest text-xs">Strategy Lock</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">
                                        Focus on <span className="text-accent underline decoration-4 underline-offset-4">{campaign.recommended_platform}</span>
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">{campaign.reasoning}</p>
                                </div>
                            </div>

                            {/* Ad Copies */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Copy size={20} />
                                    </div>
                                    Ad Variations
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {campaign.ad_copies.map((ad, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={idx}
                                            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/5 px-3 py-1 rounded-full">Variant {idx + 1}</span>
                                            </div>
                                            <h4 className="font-bold text-black mb-4 text-xl leading-snug">{ad.headline}</h4>
                                            <p className="text-gray-500 leading-relaxed group-hover:text-black transition-colors">{ad.body}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Value Props */}
                                <div className="bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100">
                                    <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
                                        <Layers size={20} /> Value Props
                                    </h3>
                                    <ul className="space-y-4">
                                        {campaign.value_propositions.map((prop, idx) => (
                                            <li key={idx} className="flex gap-4 text-gray-600 bg-white p-4 rounded-xl shadow-sm">
                                                <span className="text-green-500 font-bold mt-0.5">✓</span>
                                                {prop}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Emotional Hook & CTA */}
                                <div className="space-y-6">
                                    <div className="bg-purple-50 rounded-[2rem] p-8 border border-purple-100">
                                        <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                                            <Heart size={20} className="text-purple-500" /> Emotional Hook
                                        </h3>
                                        <p className="text-purple-800 italic text-xl leading-relaxed font-serif">"{campaign.emotional_hook}"</p>
                                    </div>

                                    <button className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg">
                                        {campaign.cta} <ArrowRight size={20} />
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

export default CampaignGenerator;
