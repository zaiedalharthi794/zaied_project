import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const [language, setLanguage] = useState<Language>('ar');
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
    
    // Set default theme on mount
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'orange');
    }, []);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value as 'light' | 'dark' | 'system');
    };
    // --- End Theme Management ---
    
    const [data, setData] = useState<PortfolioData>(initialData);

    const [displayData, setDisplayData] = useState<PortfolioData>(data);
    const [cachedPortfolioData, setCachedPortfolioData] = useState<{ [key: string]: PortfolioData }>({ ar: data, en: initialDataEn });
    const [cachedUiTranslations, setCachedUiTranslations] = useState<{ [key: string]: Translation }>(translations);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const settingsMenuRef = useRef<HTMLDivElement>(null);

    const t = cachedUiTranslations[language as keyof typeof cachedUiTranslations] || cachedUiTranslations['en'];

    // Fetch data from Firebase on initial load
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const docRef = doc(db, "portfolio", "main");
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const firestoreData = docSnap.data() as PortfolioData;
                    setData(firestoreData);
                    setCachedPortfolioData(prev => ({ ...prev, ar: firestoreData }));
                } else {
                    // Document doesn't exist, so let's create it with initial data
                    console.log("No such document! Seeding database with initial data.");
                    await setDoc(docRef, initialData);
                    setData(initialData);
                    setCachedPortfolioData(prev => ({ ...prev, ar: initialData }));
                }
            } catch (error) {
                console.error("Error fetching or seeding document:", error);
                setError("Failed to load data from the server.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Debounced function to save data to Firebase
    const debouncedSave = useCallback(
        debounce(async (newData: PortfolioData) => {
            try {
                const docRef = doc(db, "portfolio", "main");
                await setDoc(docRef, newData);
                 // When admin saves new data, it's in Arabic. Invalidate other language caches.
                setCachedPortfolioData({ ar: newData, en: initialDataEn });
            } catch (error) {
                console.error("Failed to save portfolio data to Firebase:", error);
                setError("Failed to save changes.");
            }
        }, 1000), 
        []
    );

    // Save data to Firebase whenever it changes
    useEffect(() => {
        // Don't save the initial boilerplate data on first render
        if (!isLoading) {
            debouncedSave(data);
        }
    }, [data, isLoading, debouncedSave]);


    useEffect(() => {
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        if (language !== 'ar') {
            setFont('sans-serif');
        }
    }, [language]);
    
    useEffect(() => {
        document.documentElement.style.setProperty('--main-font', font);
        localStorage.setItem('appFont', font);
    }, [font]);
    
     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const translateApp = async () => {
             // Use the live data for Arabic
            if (language === 'ar') {
                setDisplayData(data);
                return;
            }
            if (language === 'en') {
                setDisplayData(cachedPortfolioData[language]!);
                return;
            };

            if (cachedUiTranslations[language] && cachedPortfolioData[language]) {
                setDisplayData(cachedPortfolioData[language]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                const gameQuestionSchema = { type: Type.OBJECT, properties: { question: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } }, answer: { type: Type.STRING } } };
                const gameLevelSchema = { type: Type.OBJECT, properties: { title: { type: Type.STRING }, questions: { type: Type.ARRAY, items: gameQuestionSchema } } };
                const navSchema = { type: Type.OBJECT, properties: { home: { type: Type.STRING }, journey: { type: Type.STRING }, evaluation: { type: Type.STRING }, game: { type: Type.STRING } } };
                const studentInfoSchema = { type: Type.OBJECT, properties: { name: { type: Type.STRING }, grade: { type: Type.STRING }, school: { type: Type.STRING }, email: { type: Type.STRING }, semester: { type: Type.STRING }, avatarUrl: { type: Type.STRING } } };
                
                const combinedSchema = {
                    type: Type.OBJECT,
                    properties: {
                        ui: {
                            type: Type.OBJECT,
                            properties: {
                                appName: { type: Type.STRING },
                                nav: navSchema,
                                footer: { type: Type.OBJECT, properties: { rights: { type: Type.STRING } } },
                                login: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, password: { type: Type.STRING }, enter: { type: Type.STRING }, close: { type: Type.STRING } } },
                                home: { type: Type.OBJECT, properties: { welcome: { type: Type.STRING }, student: { type: Type.STRING }, aboutMe: { type: Type.STRING }, skills: { type: Type.STRING }, hobbies: { type: Type.STRING }, goals: { type: Type.STRING } } },
                                journey: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, education: { type: Type.STRING }, selfReflection: { type: Type.STRING }, achievements: { type: Type.STRING }, projects: { type: Type.STRING }, volunteer: { type: Type.STRING }, gallery: { type: Type.STRING } } },
                                evaluation: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, prompt: { type: Type.STRING }, teacherName: { type: Type.STRING }, placeholder: { type: Type.STRING }, submit: { type: Type.STRING }, success: { type: Type.STRING }, previousEvaluations: { type: Type.STRING } } },
                                game: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, welcome: { type: Type.STRING }, start: { type: Type.STRING }, next: { type: Type.STRING }, submit: { type: Type.STRING }, correct: { type: Type.STRING }, incorrect: { type: Type.STRING }, finalScore: { type: Type.STRING }, congrats: { type: Type.STRING }, hint: { type: Type.STRING }, playAgain: { type: Type.STRING }, levels: { type: Type.ARRAY, items: gameLevelSchema } } },
                                admin: { type: Type.OBJECT, properties: { edit: { type: Type.STRING }, save: { type: Type.STRING }, addItem: { type: Type.STRING }, removeItem: { type: Type.STRING }, upload: { type: Type.STRING }, change: { type: Type.STRING }, deleteItem: { type: Type.STRING } } },
                                theme: { type: Type.OBJECT, properties: { select: { type: Type.STRING }, light: { type: Type.STRING }, dark: { type: Type.STRING }, system: { type: Type.STRING }, language: { type: Type.STRING }, font: { type: Type.STRING } } },
                                chatbot: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, placeholder: { type: Type.STRING }, close: { type: Type.STRING }, initialMessage: { type: Type.STRING } } },
                            }
                        },
                        portfolio: {
                            type: Type.OBJECT,
                            properties: {
                                studentInfo: studentInfoSchema,
                                aboutMe: { type: Type.STRING },
                                education: { type: Type.STRING },
                                selfReflection: { type: Type.STRING },
                                achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
                                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                                projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                                volunteerWork: { type: Type.ARRAY, items: { type: Type.STRING } },
                                hobbies: { type: Type.ARRAY, items: { type: Type.STRING } },
                                goals: { type: Type.ARRAY, items: { type: Type.STRING } },
                                evaluations: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { teacher: { type: Type.STRING }, text: { type: Type.STRING } } } },
                                gallery: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.NUMBER }, imageUrl: { type: Type.STRING }, caption: { type: Type.STRING } } } },
                            }
                        }
                    }
                };

                const targetLanguageName = languages.find(l => l.code === language)?.name || language;
                
                // Use the English data from the cached state as the source for translation
                const sourcePortfolioData = initialDataEn;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Translate the following JSON object from English to ${targetLanguageName}. The JSON contains UI text and portfolio content for a student's website. Ensure the translated JSON structure is identical to the original. The 'answer' field in the game questions must be one of the 'options' strings exactly. Here is the JSON to translate: \n\n${JSON.stringify({ ui: translations.en, portfolio: sourcePortfolioData })}`,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: combinedSchema,
                    },
                });

                const translatedJson = JSON.parse(response.text);
                
                const newUiT: Translation = translatedJson.ui;
                const newPortfolioData: PortfolioData = translatedJson.portfolio;

                setCachedUiTranslations(prev => ({...prev, [language]: newUiT}));
                setCachedPortfolioData(prev => ({...prev, [language]: newPortfolioData}));
                setDisplayData(newPortfolioData);

            } catch (err) {
                console.error("Translation failed:", err);
                setError(`Failed to translate. Falling back to English.`);
                setLanguage('en');
            } finally {
                setIsLoading(false);
            }
        };

        translateApp();
    }, [language, data]); // Add data as a dependency


    const handleLogin = (password: string) => {
        if (password === 'zaied501') {
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
    
    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFont(e.target.value);
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    
    const activeLinkClass = "text-primary font-semibold";
    const inactiveLinkClass = "text-muted-foreground hover:text-primary";
    const mobileActiveLinkClass = "bg-primary/10 text-primary";
    const mobileInactiveLinkClass = "text-foreground hover:bg-accent";


    return (
        <HashRouter>
            <div className={`min-h-screen bg-background text-foreground`}>
                {(isLoading || (language !== 'ar' && !cachedPortfolioData[language])) && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-[9999] backdrop-blur-sm">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                        <p className="text-white text-xl mt-4">
                           {language === 'ar' ? 'Loading Data...' : 'Translating...'}
                        </p>
                    </div>
                )}
                <header className="bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-border">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 flex items-center gap-3">
                                    <GraduationCapIcon className="h-10 w-10 text-primary" />
                                    <span className="text-xl font-bold text-foreground">{t.appName}</span>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ltr:ml-10 rtl:mr-10 flex items-baseline space-x-4 rtl:space-x-reverse">
                                        <NavLink to="/" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5`}>{t.nav.home}</NavLink>
                                        <NavLink to="/journey" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5`}>{t.nav.journey}</NavLink>
                                        <NavLink to="/evaluation" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5`}>{t.nav.evaluation}</NavLink>
                                        <NavLink to="/game" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5`}>{t.nav.game}</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                 <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                                    <button onClick={() => setIsChatOpen(true)} className="p-2 rounded-full text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring transition-colors" aria-label="Open AI Assistant">
                                        <VoiceChatIcon className="h-6 w-6" />
                                    </button>
                                    {isAdmin ? (
                                        <button onClick={handleLogout} className="p-2 rounded-full text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring transition-colors" aria-label="Logout">
                                            <LogoutIcon className="h-6 w-6" />
                                        </button>
                                    ) : (
                                        <button onClick={() => setShowLogin(true)} className="p-2 rounded-full text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring transition-colors" aria-label="Admin Login">
                                            <LoginIcon className="h-6 w-6" />
                                        </button>
                                    )}
                                     <div className="relative" ref={settingsMenuRef}>
                                        <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-2 rounded-full text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring transition-colors" aria-label="Settings">
                                            <SettingsIcon className="h-6 w-6" />
                                        </button>
                                        {isSettingsOpen && (
                                            <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-64 origin-top-right bg-popover text-popover-foreground rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 p-4 border border-border">
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-muted-foreground mb-1">{t.theme.select}</label>
                                                        <select onChange={handleThemeChange} value={theme} className="w-full bg-background text-foreground px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring border border-border">
                                                            <option value="light">{t.theme.light}</option>
                                                            <option value="dark">{t.theme.dark}</option>
                                                            <option value="system">{t.theme.system}</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-muted-foreground mb-1">{t.theme.language}</label>
                                                        <select onChange={handleLanguageChange} value={language} className="w-full bg-background text-foreground px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring border border-border">
                                                            {languages.map(lang => (
                                                                <option key={lang.code} value={lang.code}>{lang.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {language === 'ar' && (
                                                        <div>
                                                            <label className="block text-sm font-medium text-muted-foreground mb-1">{t.theme.font}</label>
                                                            <select onChange={handleFontChange} value={font} className="w-full bg-background text-foreground px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring border border-border">
                                                                {fonts.map(f => <option key={f.name} value={f.css}>{f.name}</option>)}
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex md:hidden">
                                     <button
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        type="button"
                                        className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
                                        aria-controls="mobile-menu"
                                        aria-expanded={isMobileMenuOpen}
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        {isMobileMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden bg-background/95 ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`} id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass} block px-3 py-2 rounded-md text-base font-medium transition-colors`}>{t.nav.home}</NavLink>
                            <NavLink to="/journey" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass} block px-3 py-2 rounded-md text-base font-medium transition-colors`}>{t.nav.journey}</NavLink>
                            <NavLink to="/evaluation" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass} block px-3 py-2 rounded-md text-base font-medium transition-colors`}>{t.nav.evaluation}</NavLink>
                            <NavLink to="/game" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass} block px-3 py-2 rounded-md text-base font-medium transition-colors`}>{t.nav.game}</NavLink>
                        </div>
                        <div className="pt-4 pb-3 border-t border-border">
                            <div className="px-4 space-y-4">
                                <div className="flex flex-col gap-4">
                                    <select onChange={handleThemeChange} value={theme} title={t.theme.select} className="w-full bg-secondary text-secondary-foreground px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring border border-border">
                                        <option value="light">{t.theme.light}</option>
                                        <option value="dark">{t.theme.dark}</option>
                                        <option value="system">{t.theme.system}</option>
                                    </select>
                                    <select onChange={handleLanguageChange} value={language} title={t.theme.language} className="w-full bg-secondary text-secondary-foreground px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring border border-border">
                                        {languages.map(lang => (
                                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                                        ))}
                                    </select>
                                    {language === 'ar' && (
                                    <select onChange={handleFontChange} value={font} title={t.theme.font} className="w-full bg-secondary text-secondary-foreground px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring border border-border">
                                        {fonts.map(f => <option key={f.name} value={f.css}>{f.name}</option>)}
                                    </select>
                                    )} 
                                </div>
                                <div className="grid grid-cols-2 gap-4 items-center">
                                    {isAdmin ? (
                                        <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="w-full flex justify-center items-center gap-2 p-2 rounded-md text-foreground bg-secondary hover:bg-accent" aria-label="Logout">
                                            <LogoutIcon className="h-5 w-5" />
                                            <span className="text-sm">Logout</span>
                                        </button>
                                    ) : (
                                        <button onClick={() => { setShowLogin(true); closeMobileMenu(); }} className="w-full flex justify-center items-center gap-2 p-2 rounded-md text-foreground bg-secondary hover:bg-accent" aria-label="Admin Login">
                                            <LoginIcon className="h-5 w-5" />
                                            <span className="text-sm">Login</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    {error && <div className="container mx-auto text-center py-4 bg-destructive text-destructive-foreground">{error}</div>}
                    <Routes>
                        <Route path="/" element={<HomePage data={displayData} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/journey" element={<AcademicJourneyPage data={displayData} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/evaluation" element={<EvaluationPage t={t} data={displayData} setData={setData} />} />
                        <Route path="/game" element={<GamePage t={t} />} />
                    </Routes>
                </main>
                <footer className="py-8 mt-12 text-center text-muted-foreground text-sm">
                    <p>&copy; {new Date().getFullYear()} {t.footer.rights} {displayData.studentInfo.name}.</p>
                </footer>

                {showLogin && <AdminLogin onLogin={handleLogin} onClose={() => setShowLogin(false)} t={t} />}
                
                <Chatbot 
                    isOpen={isChatOpen} 
                    onClose={() => setIsChatOpen(false)} 
                    t={t} 
                    portfolioData={displayData} 
                />
            </div>
        </HashRouter>
    );
};

export default App;