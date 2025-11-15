
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
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-8 w-full max-w-sm border dark:border-orange-500" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">{t.login.title}</h2>
                <p className="text-center text-sm text-zinc-500 dark:text-neutral-400 mb-4">كلمة المرور: zaied501</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-zinc-700 dark:text-neutral-300 text-sm font-bold mb-2">{t.login.password}</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-100 dark:bg-zinc-800 text-zinc-800 dark:text-neutral-200 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-500 border-neutral-300 dark:border-zinc-600"
                            autoFocus
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="button" onClick={onClose} className="bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
                            {t.login.close}
                        </button>
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
                            {t.login.enter}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;