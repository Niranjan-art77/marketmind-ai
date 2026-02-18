import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { simulateRevenue } from '../api/client';
import { TrendingUp, DollarSign, Users, MousePointer, Download, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const RevenueSimulator = () => {
    const [inputs, setInputs] = useState({
        visitors: 10000,
        conversion_rate: 2.5,
        average_order_value: 50,
        ad_spend: 1000
    });

    const [simulation, setSimulation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const handleSimulate = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await simulateRevenue(inputs);
            setSimulation(data);
        } catch (err) {
            setError(err.detail || 'Simulation failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        if (!simulation) return;
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Month,Revenue,Growth\n"
            + simulation.projections.map(e => `${e.month},${e.revenue},${e.growth}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "revenue_projection.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#94a3b8' }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 12,
                titleColor: '#fff',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                displayColors: false,
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#94a3b8', callback: (value) => '$' + value }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            }
        }
    };

    const chartData = simulation ? {
        labels: simulation.graph_data.labels,
        datasets: [{
            label: 'Projected Revenue ($)',
            data: simulation.graph_data.datasets[0].data,
            borderColor: '#06b6d4',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(6, 182, 212, 0.5)');
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
                return gradient;
            },
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#06b6d4',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
        }]
    } : null;

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Revenue Simulator</h2>
                    <p className="text-gray-400 mt-2">Project future growth based on key metrics with interactive modeling.</p>
                </div>
                {simulation && (
                    <button onClick={handleExport} className="glass px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                        <Download size={16} /> Export CSV
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls Panel */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="glass-card h-fit lg:sticky lg:top-24"
                >
                    <div className="flex items-center gap-2 mb-6 text-accent">
                        <TrendingUp size={24} />
                        <h3 className="text-xl font-bold">Input Metrics</h3>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                                <Users size={14} /> Monthly Visitors
                            </label>
                            <input
                                type="number"
                                name="visitors"
                                value={inputs.visitors}
                                onChange={handleInputChange}
                                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                                <MousePointer size={14} /> Conversion Rate (%)
                            </label>
                            <input
                                type="number"
                                name="conversion_rate"
                                step="0.1"
                                value={inputs.conversion_rate}
                                onChange={handleInputChange}
                                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                                <DollarSign size={14} /> Avg. Order Value ($)
                            </label>
                            <input
                                type="number"
                                name="average_order_value"
                                value={inputs.average_order_value}
                                onChange={handleInputChange}
                                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                                <DollarSign size={14} /> Ad Spend ($)
                            </label>
                            <input
                                type="number"
                                name="ad_spend"
                                value={inputs.ad_spend}
                                onChange={handleInputChange}
                                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                            />
                        </div>

                        <button
                            onClick={handleSimulate}
                            disabled={loading}
                            className="w-full neon-button mt-6 justify-center flex items-center gap-2"
                        >
                            {loading ? 'Calculating...' : (
                                <>
                                    <TrendingUp size={18} /> Run Simulation
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-6">
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

                    {simulation ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Key Metrics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="glass-card p-5 text-center bg-gradient-to-br from-surface to-blue-900/10">
                                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Est. Leads</p>
                                    <p className="text-3xl font-bold text-white">{simulation.current_performance.leads.toLocaleString()}</p>
                                </div>
                                <div className="glass-card p-5 text-center bg-gradient-to-br from-surface to-green-900/10 border-b-4 border-b-green-500/50">
                                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Est. Revenue</p>
                                    <p className="text-3xl font-bold text-green-400">${simulation.current_performance.revenue.toLocaleString()}</p>
                                </div>
                                <div className="glass-card p-5 text-center bg-gradient-to-br from-surface to-purple-900/10">
                                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">ROAS</p>
                                    <p className="text-3xl font-bold text-purple-400">{simulation.current_performance.roas}x</p>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="glass-card p-6 min-h-[400px]">
                                <h3 className="text-lg font-bold text-white mb-6">3-Month Revenue Projection</h3>
                                <div className="h-[300px] w-full">
                                    <Line options={chartOptions} data={chartData} />
                                </div>
                            </div>

                            {/* Growth Table */}
                            <div className="glass-card overflow-hidden p-0">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-white/5">
                                        <tr>
                                            <th className="p-4 text-gray-400 font-medium">Month</th>
                                            <th className="p-4 text-gray-400 font-medium">Proj. Revenue</th>
                                            <th className="p-4 text-gray-400 font-medium text-right">Growth</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {simulation.projections.map((proj, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4 text-white font-medium">{proj.month}</td>
                                                <td className="p-4 text-gray-300 group-hover:text-white transition-colors">${proj.revenue.toLocaleString()}</td>
                                                <td className="p-4 text-success text-right">{proj.growth}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass-card h-full min-h-[400px] flex flex-col items-center justify-center border-dashed border-2 border-white/10 text-center p-12"
                        >
                            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <TrendingUp size={40} className="text-accent" />
                            </div>
                            <h3 className="text-xl font-medium text-white">Visual Projection Engine</h3>
                            <p className="text-gray-400 mt-2 max-w-sm">
                                Adjust the parameters on the left and click "Run Simulation" to visualize future revenue scenarios.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RevenueSimulator;
