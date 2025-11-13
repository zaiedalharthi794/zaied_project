
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AcademicJourneyPage from './pages/AcademicJourneyPage';
import EvaluationPage from './pages/EvaluationPage';
import GamePage from './pages/GamePage';
import AdminLogin from './components/AdminLogin';
import { initialData, translations } from './data/initialData';
import { PortfolioData, Language, Translation } from './types';
import { GraduationCapIcon, LoginIcon, LogoutIcon } from './components/Icons';

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [language, setLanguage] = useState<Language>('ar');
    const [data, setData] = useState<PortfolioData>(() => {
        try {
            const savedData = localStorage.getItem('portfolioData');
            return savedData ? JSON.parse(savedData) : initialData;
        } catch (error) {
            return initialData;
        }
    });

    const t = translations[language];

    useEffect(() => {
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('portfolioData', JSON.stringify(data));
        } catch (error) {
            console.error("Failed to save portfolio data:", error);
        }
    }, [data]);
    
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);


    const handleLogin = (password: string) => {
        if (password === 'zayed2024') {
            localStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            setShowLogin(false);
        } else {
            alert('كلمة المرور غير صحيحة');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
    };
    
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as Language);
    };
    
    const activeLinkClass = "bg-red-800 text-white";
    const inactiveLinkClass = "text-gray-300 hover:bg-red-900 hover:text-white";

    return (
        <HashRouter>
            <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
                <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-red-900/50">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 text-white flex items-center gap-3">
                                    <GraduationCapIcon className="h-10 w-10 text-red-600" />
                                    <span className="text-xl font-bold">{t.appName}</span>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ltr:ml-10 rtl:mr-10 flex items-baseline space-x-4 rtl:space-x-reverse">
                                        <NavLink to="/" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.home}</NavLink>
                                        <NavLink to="/journey" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.journey}</NavLink>
                                        <NavLink to="/evaluation" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.evaluation}</NavLink>
                                        <NavLink to="/game" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.game}</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <select onChange={handleLanguageChange} value={language} className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-600">
                                    <option value="ar">العربية</option>
                                    <option value="en">English</option>
                                    <option value="fr">Français</option>
                                    <option value="es">Español</option>
                                </select>
                                {isAdmin ? (
                                    <button onClick={handleLogout} className="p-2 rounded-full text-gray-300 hover:bg-red-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors" aria-label="Logout">
                                        <LogoutIcon className="h-6 w-6" />
                                    </button>
                                ) : (
                                    <button onClick={() => setShowLogin(true)} className="p-2 rounded-full text-gray-300 hover:bg-red-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors" aria-label="Admin Login">
                                        <LoginIcon className="h-6 w-6" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage data={data} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/journey" element={<AcademicJourneyPage data={data} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/evaluation" element={<EvaluationPage t={t} data={data} setData={setData} />} />
                        <Route path="/game" element={<GamePage t={t} />} />
                    </Routes>
                </main>
                <footer className="bg-gray-800/50 border-t border-red-900/50 mt-12 py-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} {t.footer.rights} {data.studentInfo.name}.</p>
                </footer>

                {showLogin && <AdminLogin onLogin={handleLogin} onClose={() => setShowLogin(false)} t={t} />}
            </div>
        </HashRouter>
    );
};

export default App;