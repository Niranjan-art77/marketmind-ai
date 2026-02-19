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
import { TrendingUp, DollarSign, Users, MousePointer, Download, AlertCircle, ArrowRight, Play, Sliders } from 'lucide-react';
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
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1A1A1A',
                titleColor: '#FA255E',
                bodyColor: '#fff',
                padding: 14,
                cornerRadius: 8,
                displayColors: false,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
            },
        },
        scales: {
            y: {
                grid: { color: 'rgba(0,0,0,0.05)', borderDash: [4, 4] },
                ticks: { color: '#666', callback: (v) => '$' + v / 1000 + 'k' },
                border: { display: false },
            },
            x: {
                grid: { display: false },
                ticks: { color: '#666' }
            }
        }
    };

    const chartData = simulation ? {
        labels: simulation.graph_data.labels,
        datasets: [{
            label: 'Projected Revenue ($)',
            data: simulation.graph_data.datasets[0].data,
            borderColor: '#FA255E',
            backgroundColor: 'rgba(250, 37, 94, 0.05)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#FA255E',
            pointBorderColor: '#fff',
            pointBorderWidth: 4,
            pointRadius: 6,
            pointHoverRadius: 8,
        }]
    } : null;

    return (
        <div className="space-y-12 pb-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-3">Revenue Simulator</h2>
                    <p className="text-gray-500 text-lg">Predict growth. Optimize levers. Visualize success.</p>
                </div>
                {simulation && (
                    <button onClick={handleExport} className="btn-secondary flex items-center gap-2">
                        <Download size={18} /> Export Data
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Controls Panel */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="lg:col-span-4"
                >
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 sticky top-24">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                                <Sliders size={20} />
                            </div>
                            <h3 className="text-xl font-bold">Input Variables</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'Monthly Visitors', name: 'visitors', icon: Users, step: 100 },
                                { label: 'Conversion Rate (%)', name: 'conversion_rate', icon: MousePointer, step: 0.1 },
                                { label: 'Avg. Order Value ($)', name: 'average_order_value', icon: DollarSign, step: 1 },
                                { label: 'Ad Spend ($)', name: 'ad_spend', icon: DollarSign, step: 100 },
                            ].map((field) => (
                                <div key={field.name} className="group">
                                    <label className="text-sm font-bold text-gray-500 mb-2 flex items-center gap-2">
                                        <field.icon size={16} /> {field.label}
                                    </label>
                                    <input
                                        type="number"
                                        name={field.name}
                                        value={inputs[field.name]}
                                        onChange={handleInputChange}
                                        step={field.step}
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-black font-bold focus:ring-2 focus:ring-black/5 transition-all group-hover:bg-gray-100"
                                    />
                                </div>
                            ))}

                            <button
                                onClick={handleSimulate}
                                disabled={loading}
                                className="w-full btn-primary mt-8 flex justify-center items-center gap-2 text-lg"
                            >
                                {loading ? 'Calculating...' : (
                                    <>
                                        Run Simulation <Play size={18} fill="currentColor" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Results Panel */}
                <div className="lg:col-span-8 space-y-6">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100"
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Est. Leads</p>
                                    <p className="text-4xl font-bold text-black">{simulation.current_performance.leads.toLocaleString()}</p>
                                </div>
                                <div className="bg-black text-white rounded-[2rem] p-6 shadow-xl">
                                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Est. Revenue</p>
                                    <p className="text-4xl font-bold">${simulation.current_performance.revenue.toLocaleString()}</p>
                                </div>
                                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">ROAS</p>
                                    <p className="text-4xl font-bold text-black">{simulation.current_performance.roas}x</p>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold mb-6">Revenue Trajectory</h3>
                                <div className="h-[400px] w-full">
                                    <Line options={chartOptions} data={chartData} />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-[2rem] h-[600px] flex flex-col items-center justify-center border-dashed border-2 border-gray-200 text-center p-12"
                        >
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <TrendingUp size={40} className="text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Ready to Simulate</h3>
                            <p className="text-gray-400 mt-2 max-w-sm text-lg">
                                Configure your growth engine on the left to visualize future performance.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RevenueSimulator;
