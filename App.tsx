
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import HomePage from './pages/HomePage';
import AcademicJourneyPage from './pages/AcademicJourneyPage';
import EvaluationPage from './pages/EvaluationPage';
import GamePage from './pages/GamePage';
import AdminLogin from './components/AdminLogin';
import Chatbot from './components/Chatbot';
import { initialData, initialDataEn, translations } from './data/initialData';
import { PortfolioData, Language, Translation } from './types';
import { GraduationCapIcon, LoginIcon, LogoutIcon, MenuIcon, XIcon, SettingsIcon, VoiceChatIcon } from './components/Icons';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import debounce from 'lodash.debounce';

const fonts = [
    { name: 'افتراضي', css: 'sans-serif' },
    { name: 'رقعة', css: "'Aref Ruqaa', serif" },
    { name: 'نسخ', css: "'Noto Naskh Arabic', serif" },
    { name: 'فارسي', css: "'Amiri', serif" },
    { name: 'عثماني', css: "'Scheherazade New', serif" },
];

const languages = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' },
];

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('appLanguage') as Language) || 'ar');
    const [font, setFont] = useState<string>(() => localStorage.getItem('appFont') || 'sans-serif');
    
    // --- Theme Management ---
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
        return savedTheme || 'system';
    });

    useEffect(() => {
        const root = document.documentElement;
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (theme === 'dark' || (theme === 'system' && isSystemDark)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        localStorage.setItem('theme', theme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                if (e.matches) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        };

        mediaQuery.addEventListener('change', handleSystemChange);
        
        return () => {
            mediaQuery.removeEventListener('change', handleSystemChange);
        };
    }, [theme]);
    
    // Set default theme attribute on mount
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'default');
    }, []);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value as 'light' | 'dark' | 'system');
    };
    // --- End Theme Management ---
    
    const [data, setData] = useState<PortfolioData>(language === 'ar' ? initialData : initialDataEn);
    const [portfolioCache, setPortfolioCache] = useState({ ar: initialData, en: initialDataEn });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const t = translations[language] || translations['ar'];

    // Fetch data from Firebase
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'portfolio', 'data');
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const firestoreData = docSnap.data() as { ar: PortfolioData, en: PortfolioData };
                    setPortfolioCache(firestoreData);
                    setData(firestoreData[language as keyof typeof firestoreData] || firestoreData['ar']);
                }
            // FIX: Explicitly type the error in the catch block to resolve a TypeScript parsing issue.
            } catch (error: any) {
                console.error("Error fetching data from Firestore:", error);
            }
        };
        fetchData();
    }, []); // Fetch only on mount

    // Debounced save function
    const saveDataToFirestore = useCallback(debounce(async (dataToSave) => {
        if (!isAdmin) return;
        try {
            await setDoc(doc(db, 'portfolio', 'data'), dataToSave);
        // FIX: Explicitly type the error in the catch block for consistency.
        } catch (error: any) {
            console.error("Error saving data: ", error);
        }
    }, 2000), [isAdmin]);

    // Effect to update cache when data changes and trigger save
    useEffect(() => {
        const updatedCache = { ...portfolioCache, [language]: data };
        if (JSON.stringify(portfolioCache) !== JSON.stringify(updatedCache)) {
             setPortfolioCache(updatedCache);
             saveDataToFirestore(updatedCache);
        }
    }, [data, language, portfolioCache, saveDataToFirestore]);
    
    // Handle language change
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as Language;
        setLanguage(newLang);
        setData(portfolioCache[newLang as keyof typeof portfolioCache]);
        localStorage.setItem('appLanguage', newLang);
    };

    // Handle font change
    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFont = e.target.value;
        setFont(newFont);
        localStorage.setItem('appFont', newFont);
    };

    // Apply font, lang, and dir to HTML element
    useEffect(() => {
        document.documentElement.style.setProperty('--main-font', font);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [font, language]);

    const handleLogin = (password: string) => {
        if (password === 'Zaied99') { 
            setIsAdmin(true);
            setShowLogin(false);
        } else {
            alert('Incorrect password');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
    };
        
    const navLinks = [
        { path: '/', text: t.nav.home },
        { path: '/journey', text: t.nav.journey },
        { path: '/evaluation', text: t.nav.evaluation },
        { path: '/game', text: t.nav.game },
    ];

    return (
        <HashRouter>
            <div className="bg-background text-foreground min-h-screen font-sans">
                <nav className="bg-card/80 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b border-border">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            <div className="flex items-center">
                                <GraduationCapIcon className="h-8 w-8 text-primary" />
                                <span className="font-bold text-xl ml-3 rtl:mr-3">{t.appName}</span>
                            </div>
                            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                                {navLinks.map(link => (
                                    <NavLink key={link.path} to={link.path} className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>{link.text}</NavLink>
                                ))}
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => setIsChatbotOpen(!isChatbotOpen)} className="p-2 rounded-full text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" title={t.chatbot.title}>
                                    <VoiceChatIcon className="w-6 h-6" />
                                </button>
                                <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-2 rounded-full text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ltr:ml-2 rtl:mr-2">
                                    <SettingsIcon className="w-6 h-6" />
                                </button>
                                {isAdmin ? (
                                    <button onClick={handleLogout} className="p-2 rounded-full text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background mx-2" title="Logout">
                                        <LogoutIcon className="w-6 h-6" />
                                    </button>
                                ) : (
                                    <button onClick={() => setShowLogin(true)} className="p-2 rounded-full text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background mx-2" title="Admin Login">
                                        <LoginIcon className="w-6 h-6" />
                                    </button>
                                )}
                                <div className="md:hidden">
                                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent">
                                        {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map(link => (
                                <NavLink key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>{link.text}</NavLink>
                            ))}
                        </div>
                    )}
                </nav>

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage data={data} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/journey" element={<AcademicJourneyPage data={data} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/evaluation" element={<EvaluationPage data={data} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/game" element={<GamePage t={t} />} />
                    </Routes>
                </main>

                <footer className="bg-card/50 border-t border-border mt-12 py-6">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} {t.footer.rights} {data.studentInfo.name}</p>
                    </div>
                </footer>
                
                {isSettingsOpen && (
                     <div className={`fixed top-0 ${language === 'ar' ? 'left-0' : 'right-0'} h-full w-80 bg-background shadow-lg z-50 p-6 ${language === 'ar' ? 'border-r' : 'border-l'} border-border transform transition-transform ${isSettingsOpen ? 'translate-x-0' : (language === 'ar' ? '-translate-x-full' : 'translate-x-full')}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Settings</h3>
                            <button onClick={() => setIsSettingsOpen(false)} className="p-1 rounded-full hover:bg-accent"><XIcon className="w-6 h-6" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="theme-select" className="block text-sm font-medium text-muted-foreground mb-1">{t.theme.select}</label>
                                <select id="theme-select" value={theme} onChange={handleThemeChange} className="w-full bg-secondary p-2 rounded border border-border">
                                    <option value="light">{t.theme.light}</option>
                                    <option value="dark">{t.theme.dark}</option>
                                    <option value="system">{t.theme.system}</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="language-select" className="block text-sm font-medium text-muted-foreground mb-1">{t.theme.language}</label>
                                <select id="language-select" value={language} onChange={handleLanguageChange} className="w-full bg-secondary p-2 rounded border border-border">
                                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="font-select" className="block text-sm font-medium text-muted-foreground mb-1">{t.theme.font}</label>
                                <select id="font-select" value={font} onChange={handleFontChange} className="w-full bg-secondary p-2 rounded border border-border">
                                    {fonts.map(f => <option key={f.css} value={f.css} style={{ fontFamily: f.css }}>{f.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
                
                <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} t={t} portfolioData={data} />

                {showLogin && <AdminLogin onLogin={handleLogin} onClose={() => setShowLogin(false)} t={t} />}
            </div>
        </HashRouter>
    );
};

export default App;
