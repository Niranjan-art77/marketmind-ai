import React, { useState, useEffect } from 'react';
import { checkHealth } from '../api/client';
import { Wifi, WifiOff } from 'lucide-react';

const SystemStatus = () => {
    const [isOnline, setIsOnline] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const check = async () => {
            const status = await checkHealth();
            setIsOnline(status);
            setChecking(false);
        };

        check();
        const interval = setInterval(check, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, []);

    if (checking) return null;

    return (
        <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium z-50 transition-all ${isOnline ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            <span>{isOnline ? 'System Online' : 'Backend Offline'}</span>
        </div>
    );
};

export default SystemStatus;
