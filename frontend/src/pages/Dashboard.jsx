import React from 'react';
import { DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Activity, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#fff',
            bodyColor: '#94a3b8',
            padding: 12,
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            displayColors: false,
        },
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
            },
            ticks: {
                color: '#94a3b8',
            },
        },
        y: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
            },
            ticks: {
                color: '#94a3b8',
                callback: (value) => '$' + value / 1000 + 'k',
            },
        },
    },
};

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            fill: true,
            label: 'Revenue',
            data: [65000, 72000, 68000, 85000, 92000, 98000, 112000],
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            tension: 0.4,
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
        },
        {
            fill: true,
            label: 'Projected',
            data: [62000, 68000, 75000, 82000, 88000, 95000, 105000],
            borderColor: 'rgba(148, 163, 184, 0.5)',
            backgroundColor: 'rgba(148, 163, 184, 0.05)',
            tension: 0.4,
            borderDash: [5, 5],
            pointRadius: 0,
        },
    ],
};

const StatCard = ({ title, value, change, isPositive, icon: Icon, delay, color = "text-accent" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="glass-card relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors ${color}`}>
                <Icon size={24} />
            </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
            <span className={`text-sm font-medium flex items-center gap-0.5 px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </span>
            <span className="text-gray-500 text-sm">vs last month</span>
        </div>

        {/* Background decorative glow */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 blur-2xl rounded-full group-hover:bg-accent/30 transition-colors opacity-50" />
    </motion.div>
);

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-bold text-white tracking-tight">Strategy Board</h2>
                    <p className="text-gray-400 mt-2 text-lg">Real-time revenue intelligence & growth analytics.</p>
                </div>
                <button className="neon-button flex items-center gap-2 group">
                    <Activity size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    Refresh Data
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="$124,500"
                    change="12.5%"
                    isPositive={true}
                    icon={DollarSign}
                    delay={0.1}
                />
                <StatCard
                    title="Lead Conversion"
                    value="3.2%"
                    change="0.1%"
                    isPositive={false}
                    icon={Target}
                    delay={0.2}
                    color="text-purple-400"
                />
                <StatCard
                    title="Active Campaigns"
                    value="8"
                    change="2"
                    isPositive={true}
                    icon={Award}
                    delay={0.3}
                    color="text-pink-400"
                />
                <StatCard
                    title="Avg. Deal Size"
                    value="$15,200"
                    change="5.4%"
                    isPositive={true}
                    icon={Users}
                    delay={0.4}
                    color="text-yellow-400"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card lg:col-span-2 flex flex-col"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <TrendingUp size={20} className="text-accent" />
                            Revenue Growth
                        </h3>
                        <div className="flex gap-2">
                            {['7d', '1m', '3m', '1y'].map(time => (
                                <button key={time} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${time === '1y' ? 'bg-accent/20 text-accent' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                                    {time.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full h-full min-h-0">
                        <Line options={options} data={data} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Performance Score</h3>
                        <p className="text-gray-400 text-sm">Overall marketing efficiency</p>
                    </div>

                    <div className="relative flex items-center justify-center py-8">
                        {/* Simple circle progress placeholder using CSS */}
                        <div className="w-40 h-40 rounded-full border-8 border-white/5 flex items-center justify-center relative">
                            <div className="absolute inset-0 rounded-full border-8 border-accent border-l-transparent border-b-transparent -rotate-45" />
                            <div className="text-center">
                                <span className="text-4xl font-bold text-white">84</span>
                                <span className="text-sm text-gray-400 block">Excellent</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Campaign ROAS</span>
                            <span className="text-white font-medium">4.2x</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-accent" />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Engagement Rate</span>
                            <span className="text-white font-medium">12.5%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1, delay: 1.0 }} className="h-full bg-purple-500" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
