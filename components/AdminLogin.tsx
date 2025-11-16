
import React, { useState } from 'react';
import { Translation } from '../types';

interface AdminLoginProps {
    onLogin: (password: string) => void;
    onClose: () => void;
    t: Translation;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose, t }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(password);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
            <div className="bg-card text-card-foreground rounded-lg shadow-xl p-8 w-full max-w-sm border border-primary/50" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{t.login.title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-bold mb-2">{t.login.password}</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-secondary text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-ring border-border"
                            autoFocus
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="button" onClick={onClose} className="bg-muted hover:bg-muted/80 text-muted-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
                            {t.login.close}
                        </button>
                        <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
                            {t.login.enter}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;