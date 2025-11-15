
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import HomePage from './pages/HomePage';
import AcademicJourneyPage from './pages/AcademicJourneyPage';
import EvaluationPage from './pages/EvaluationPage';
import GamePage from './pages/GamePage';
import AdminLogin from './components/AdminLogin';
import { initialData, initialDataEn, translations } from './data/initialData';
import { PortfolioData, Language, Translation } from './types';
import { GraduationCapIcon, LoginIcon, LogoutIcon, MenuIcon, XIcon, MoonIcon, SunIcon } from './components/Icons';

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
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: '中文 (Mandarin)' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'ur', name: 'اردو' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'mr', name: 'मराठी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'ko', name: '한국어' },
  { code: 'it', name: 'Italiano' },
  { code: 'pl', name: 'Polski' },
  { code: 'uk', name: 'Українська' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'cs', name: 'Čeština' },
  { code: 'sv', name: 'Svenska' },
  { code: 'hu', name: 'Magyar' },
  { code: 'ro', name: 'Română' },
  { code: 'da', name: 'Dansk' },
  { code: 'fi', name: 'Suomi' },
  { code: 'no', name: 'Norsk' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'he', name: 'עברית' },
  { code: 'th', name: 'ไทย' },
  { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'fil', name: 'Filipino' },
  { code: 'fa', name: 'فارسی' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Shqip' },
  { code: 'am', name: 'አማርኛ' },
  { code: 'hy', name: 'Հայերեն' },
  { code: 'az', name: 'Azərbaycanca' },
  { code: 'eu', name: 'Euskara' },
  { code: 'be', name: 'Беларуская' },
  { code: 'bs', name: 'Bosanski' },
  { code: 'bg', name: 'Български' },
  { code: 'ca', name: 'Català' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Eesti' },
  { code: 'gl', name: 'Galego' },
  { code: 'ka', name: 'ქართული' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'ht', name: 'Kreyòl Ayisyen' },
  { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'ʻŌlelo Hawaiʻi' },
  { code: 'is', name: 'Íslenska' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ga', name: 'Gaeilge' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'kk', name: 'Қазақша' },
  { code: 'km', name: 'ភាសាខ្មែរ' },
  { code: 'ku', name: 'Kurdî' },
  { code: 'ky', name: 'Кыргызча' },
  { code: 'lo', name: 'ລາວ' },
  { code: 'la', name: 'Latina' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'lb', name: 'Lëtzebuergesch' },
  { code: 'mk', name: 'Македонски' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'mt', name: 'Malti' },
  { code: 'mi', name: 'Māori' },
  { code: 'mn', name: 'Монгол' },
  { code: 'my', name: 'မြန်မာ' },
  { code: 'ne', name: 'नेपाली' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ps', name: 'پښتو' },
  { code: 'sr', name: 'Српски' },
  { code: 'st', name: 'Sesotho' },
  { code: 'si', name: 'සිංහල' },
  { code: 'sl', name: 'Slovenščina' },
  { code: 'so', name: 'Soomaali' },
  { code: 'su', name: 'Basa Sunda' },
  { code: 'tg', name: 'Тоҷикӣ' },
  { code: 'uz', name: 'O‘zbekcha' },
  { code: 'cy', name: 'Cymraeg' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'yi', name: 'ייִדיש' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'zu', name: 'isiZulu' }
];

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [language, setLanguage] = useState<Language>('ar');
    const [font, setFont] = useState<string>(() => localStorage.getItem('appFont') || 'sans-serif');
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    
    const [data, setData] = useState<PortfolioData>(() => {
        try {
            const savedData = localStorage.getItem('portfolioData');
            return savedData ? JSON.parse(savedData) : initialData;
        } catch (error) {
            return initialData;
        }
    });

    const [displayData, setDisplayData] = useState<PortfolioData>(data);
    const [cachedPortfolioData, setCachedPortfolioData] = useState<{ [key: string]: PortfolioData }>({ ar: data, en: initialDataEn });
    const [cachedUiTranslations, setCachedUiTranslations] = useState<{ [key: string]: Translation }>(translations);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const t = cachedUiTranslations[language as keyof typeof cachedUiTranslations] || cachedUiTranslations['en'];

    useEffect(() => {
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        try {
            localStorage.setItem('portfolioData', JSON.stringify(data));
            // When admin saves new data, it's in Arabic. Invalidate other language caches.
            setCachedPortfolioData({ ar: data, en: initialDataEn });
            // If viewing Arabic, update display data immediately.
            if (language === 'ar') {
                 setDisplayData(data);
            }
        } catch (error) {
            console.error("Failed to save portfolio data:", error);
        }
    }, [data]);
    
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
        const translateApp = async () => {
            if (language === 'ar' || language === 'en') {
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
                const studentInfoSchema = { type: Type.OBJECT, properties: { name: { type: Type.STRING }, grade: { type: Type.STRING }, school: { type: Type.STRING }, email: { type: Type.STRING }, semester: { type: Type.STRING } } };
                
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
                                admin: { type: Type.OBJECT, properties: { edit: { type: Type.STRING }, save: { type: Type.STRING }, addItem: { type: Type.STRING }, removeItem: { type: Type.STRING } } },
                                theme: { type: Type.OBJECT, properties: { light: { type: Type.STRING }, dark: { type: Type.STRING }, toggle: { type: Type.STRING } } },
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

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Translate the following JSON object from English to ${targetLanguageName}. The JSON contains UI text and portfolio content for a student's website. Ensure the translated JSON structure is identical to the original. The 'answer' field in the game questions must be one of the 'options' strings exactly. Here is the JSON to translate: \n\n${JSON.stringify({ ui: translations.en, portfolio: initialDataEn })}`,
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
    }, [language]);


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

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    
    const activeLinkClass = "text-amber-600 dark:text-amber-400 font-semibold";
    const inactiveLinkClass = "text-gray-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400";
    const mobileActiveLinkClass = "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400";
    const mobileInactiveLinkClass = "text-gray-700 hover:bg-amber-50 dark:text-amber-200 dark:hover:bg-gray-800";


    return (
        <HashRouter>
            <div className={`min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-200`}>
                {isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-[9999] backdrop-blur-sm">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-amber-500"></div>
                        <p className="text-white text-xl mt-4">Translating...</p>
                    </div>
                )}
                <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 flex items-center gap-3">
                                    <GraduationCapIcon className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">{t.appName}</span>
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
                            <div className="flex items-center">
                                <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                                    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 dark:focus:ring-offset-gray-700 focus:ring-amber-500 transition-colors" aria-label={t.theme.toggle}>
                                        <span className="sr-only">{t.theme.toggle}</span>
                                        {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                                    </button>
                                    {language === 'ar' && (
                                        <select onChange={handleFontChange} value={font} className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-300 dark:border-gray-600">
                                            {fonts.map(f => <option key={f.name} value={f.css}>{f.name}</option>)}
                                        </select>
                                    )}
                                    <select onChange={handleLanguageChange} value={language} className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-300 dark:border-gray-600">
                                        {languages.map(lang => (
                                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                                        ))}
                                    </select>
                                    {isAdmin ? (
                                        <button onClick={handleLogout} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 dark:focus:ring-offset-gray-700 focus:ring-amber-500 transition-colors" aria-label="Logout">
                                            <LogoutIcon className="h-6 w-6" />
                                        </button>
                                    ) : (
                                        <button onClick={() => setShowLogin(true)} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 dark:focus:ring-offset-gray-700 focus:ring-amber-500 transition-colors" aria-label="Admin Login">
                                            <LoginIcon className="h-6 w-6" />
                                        </button>
                                    )}
                                </div>
                                <div className="flex md:hidden">
                                     <button
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        type="button"
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-amber-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
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

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden bg-white/95 dark:bg-gray-900/95 ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`} id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass} block px-3 py-2 rounded-md text-base font-medium transition-colors`}>{t.nav.home}</NavLink>
                            <NavLink to="/journey" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass} block px-3 py-2 rounded-md text-base font-medium transition-colors`}>{t.nav.journey}</NavLink>
                            <NavLink to="/evaluation" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass} block px-3 py-2 rounded-md text-base font-medium transition-colors`}>{t.nav.evaluation}</NavLink>
                            <NavLink to="/game" onClick={closeMobileMenu} className={({ isActive }) => `${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass} block px-3 py-2 rounded-md text-base font-medium transition-colors`}>{t.nav.game}</NavLink>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                           <div className="flex items-center justify-center px-5 gap-x-4">
                                <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-amber-200 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" aria-label={t.theme.toggle}>
                                    <span className="sr-only">{t.theme.toggle}</span>
                                    {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                                </button>
                               {language === 'ar' && (
                                   <select onChange={handleFontChange} value={font} className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-300 dark:border-gray-600">
                                       {fonts.map(f => <option key={f.name} value={f.css}>{f.name}</option>)}
                                   </select>
                               )}
                                <select onChange={handleLanguageChange} value={language} className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-300 dark:border-gray-600">
                                    {languages.map(lang => (
                                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                                    ))}
                                </select>
                                {isAdmin ? (
                                    <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="p-2 rounded-full text-gray-700 dark:text-amber-200 hover:bg-gray-200 dark:hover:bg-gray-800" aria-label="Logout">
                                        <LogoutIcon className="h-6 w-6" />
                                    </button>
                                ) : (
                                    <button onClick={() => { setShowLogin(true); closeMobileMenu(); }} className="p-2 rounded-full text-gray-700 dark:text-amber-200 hover:bg-gray-200 dark:hover:bg-gray-800" aria-label="Admin Login">
                                        <LoginIcon className="h-6 w-6" />
                                    </button>
                                )}
                           </div>
                        </div>
                    </div>
                </header>
                <main>
                    {error && <div className="container mx-auto text-center py-4 bg-red-800 text-white">{error}</div>}
                    <Routes>
                        <Route path="/" element={<HomePage data={displayData} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/journey" element={<AcademicJourneyPage data={displayData} setData={setData} isAdmin={isAdmin} t={t} />} />
                        <Route path="/evaluation" element={<EvaluationPage t={t} data={displayData} setData={setData} />} />
                        <Route path="/game" element={<GamePage t={t} />} />
                    </Routes>
                </main>
                <footer className="py-8 mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} {t.footer.rights} {displayData.studentInfo.name}.</p>
                </footer>

                {showLogin && <AdminLogin onLogin={handleLogin} onClose={() => setShowLogin(false)} t={t} />}
            </div>
        </HashRouter>
    );
};

export default App;
