import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, AlertCircle, Mail, Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [focusedField, setFocusedField] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const navigate = useNavigate();

    // Mouse follow effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Password strength calculator
    useEffect(() => {
        const pass = formData.password;
        let score = 0;
        if (pass.length > 5) score++;
        if (pass.length > 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        setPasswordStrength(score);
    }, [formData.password]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    name: formData.name
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Registration failed');
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 2) return 'bg-red-500';
        if (passwordStrength <= 4) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden text-white font-sans selection:bg-accent/30 selection:text-white">

            {/* --- Interactive Background --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_50%,_rgba(120,40,200,0.15),transparent)]"
                    animate={{ x: (mousePosition.x - window.innerWidth / 2) / 20, y: (mousePosition.y - window.innerHeight / 2) / 20 }}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

                {/* Floating Orbs */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-[100px] opacity-30"
                        style={{
                            background: i === 0 ? '#E9BD43' : i === 1 ? '#7D3780' : '#4A2C40',
                            width: 300 + i * 100,
                            height: 300 + i * 100,
                            top: `${20 + i * 30}%`,
                            left: `${10 + i * 40}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 10 + i * 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* --- Success Overlay --- */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12 }}
                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.5)]"
                        >
                            <Check size={48} className="text-black" />
                        </motion.div>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold text-white mb-2"
                        >
                            Account Created
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400"
                        >
                            Redirecting to dashboard...
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Register Card --- */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[480px] p-6"
            >
                <div className="bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">

                    {/* Border Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none rounded-[2.5rem]" />

                    <div className="text-center mb-10 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-3 inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20"
                        >
                            Join the Revolution
                        </motion.div>
                        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Create Account</h1>
                        <p className="text-gray-500">Access your market intelligence suite</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                        {/* Name Field */}
                        <div className="relative group/input">
                            <User className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-accent' : 'text-gray-500'}`} size={20} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:bg-black/60 focus:shadow-[0_0_20px_rgba(233,189,67,0.1)] transition-all duration-300"
                                required
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                {formData.name.length > 2 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={18} className="text-green-500" /></motion.div>}
                            </div>
                        </div>

                        {/* Username Field */}
                        <div className="relative group/input">
                            <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'username' ? 'text-accent' : 'text-gray-500'}`} size={20} />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('username')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:bg-black/60 focus:shadow-[0_0_20px_rgba(233,189,67,0.1)] transition-all duration-300"
                                required
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                {formData.username.length > 3 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={18} className="text-green-500" /></motion.div>}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="relative group/input">
                                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'password' ? 'text-accent' : 'text-gray-500'}`} size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:bg-black/60 focus:shadow-[0_0_20px_rgba(233,189,67,0.1)] transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Password Strength Meter */}
                            <div className="flex gap-1 h-1 px-1">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-full transition-all duration-500 ${i < passwordStrength ? getStrengthColor() : 'bg-gray-800'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between px-1 text-xs text-gray-500 font-medium">
                                <span>Password Strength</span>
                                <span className={`${passwordStrength > 4 ? 'text-green-500' : passwordStrength > 2 ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {passwordStrength > 4 ? 'Excellent' : passwordStrength > 2 ? 'Medium' : 'Weak'}
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative group/input">
                            <ShieldCheck className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'confirmPassword' ? 'text-accent' : 'text-gray-500'}`} size={20} />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:bg-black/60 focus:shadow-[0_0_20px_rgba(233,189,67,0.1)] transition-all duration-300 ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'focus:border-accent'
                                    }`}
                                required
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={18} className="text-green-500" /></motion.div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-3 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                            >
                                <AlertCircle size={18} className="shrink-0" /> {error}
                            </motion.div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent text-[#2A1B24] font-bold py-5 rounded-2xl shadow-[0_0_20px_rgba(233,189,67,0.3)] hover:shadow-[0_0_30px_rgba(233,189,67,0.5)] hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isLoading ? 'Creating Account...' : <>Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        </motion.button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
                        <p className="text-gray-500 text-sm">
                            Already have an account? <Link to="/login" className="text-white font-bold hover:text-accent transition-colors underline decoration-transparent hover:decoration-accent underline-offset-4">Log In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
