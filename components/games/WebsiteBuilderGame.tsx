import React, { useState, useMemo } from 'react';
import { Translation } from '../../types';
import { LayoutTemplateIcon, PaletteIcon, CodeBracketIcon } from '../Icons';

interface SiteConfig {
    name: string;
    color: 'red' | 'blue' | 'green' | 'indigo';
    layout: 'default' | 'sidebar' | 'grid';
    welcome: string;
    about: string;
    font: 'sans' | 'serif' | 'mono';
    feature: string;
}

const colorOptions: { name: 'Red' | 'Blue' | 'Green' | 'Indigo', class: SiteConfig['color'] }[] = [
    { name: 'Red', class: 'red' },
    { name: 'Blue', class: 'blue' },
    { name: 'Green', class: 'green' },
    { name: 'Indigo', class: 'indigo' },
];

const layoutOptions: { name: keyof Translation['game']['websiteBuilderSteps']['step3_layout']['options'], class: SiteConfig['layout'] }[] = [
    { name: 'default', class: 'default' },
    { name: 'sidebar', class: 'sidebar' },
    { name: 'grid', class: 'grid' },
];

const fontOptions: { name: keyof Translation['game']['websiteBuilderSteps']['step5_font']['options'], class: SiteConfig['font'] }[] = [
    { name: 'sans', class: 'sans' },
    { name: 'serif', class: 'serif' },
    { name: 'mono', class: 'mono' },
];

const featureOptions: { name: keyof Translation['game']['websiteBuilderSteps']['step6_feature']['options'] }[] = [
    { name: 'gallery' },
    { name: 'blog' },
    { name: 'contact' },
];

const SitePreview: React.FC<{ config: SiteConfig }> = ({ config }) => {
    const colorSchemes = {
        red: { bg: 'bg-red-600', text: 'text-red-600', lightBg: 'bg-red-50', cardBg: 'bg-white', darkText: 'text-red-900', ring: 'ring-red-500', buttonText: 'text-white' },
        blue: { bg: 'bg-blue-600', text: 'text-blue-600', lightBg: 'bg-blue-50', cardBg: 'bg-white', darkText: 'text-blue-900', ring: 'ring-blue-500', buttonText: 'text-white' },
        green: { bg: 'bg-green-600', text: 'text-green-600', lightBg: 'bg-green-50', cardBg: 'bg-white', darkText: 'text-green-900', ring: 'ring-green-500', buttonText: 'text-white' },
        indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600', lightBg: 'bg-indigo-50', cardBg: 'bg-white', darkText: 'text-indigo-900', ring: 'ring-indigo-500', buttonText: 'text-white' },
    };
    
    const styles = colorSchemes[config.color];
    const fontClass = `font-${config.font}`;

    const mainContent = (
        <div className="space-y-4">
             {/* Hero Section */}
            <div className="text-center p-4 rounded-lg">
                <h2 className={`text-2xl font-bold ${styles.darkText} ${fontClass}`}>{config.welcome || 'Welcome Message'}</h2>
                <p className="text-xs text-gray-500 mt-1">This is a subtitle describing the website's purpose.</p>
                <button className={`mt-2 px-3 py-1 ${styles.bg} ${styles.buttonText} text-xs rounded-md shadow-md hover:opacity-90`}>
                    Call to Action
                </button>
            </div>

            {/* About Section */}
            <div className={`${styles.cardBg} p-3 rounded-lg shadow-sm`}>
                <h3 className={`text-sm font-bold ${styles.darkText} ${fontClass}`}>About Me</h3>
                <p className="text-xs text-gray-600 mt-1">{config.about || 'About section content...'}</p>
            </div>

             {/* Feature Section */}
             {config.layout !== 'grid' && (
                <div className={`${styles.cardBg} p-3 rounded-lg shadow-sm`}>
                    <h3 className={`text-sm font-bold ${styles.darkText} ${fontClass}`}>{config.feature || "Feature"}</h3>
                    <div className="mt-2 space-y-1">
                        <div className="w-full h-2 bg-gray-200 rounded"></div>
                        <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                    </div>
                </div>
             )}
        </div>
    );

    return (
        <div className={`w-full h-[26rem] ${styles.lightBg} rounded-lg shadow-lg border-4 border-border overflow-hidden ${fontClass}`}>
            {/* Header */}
            <header className={`${styles.bg} p-2 text-white flex items-center justify-between shadow-md`}>
                <div className="flex items-center gap-1">
                    <CodeBracketIcon className="w-3 h-3"/>
                    <p className="text-xs font-bold truncate">{config.name || 'SiteName'}</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <span>Home</span>
                    <span>About</span>
                    <span>Contact</span>
                </div>
            </header>

            {/* Body */}
            <div className="p-2 text-sm h-full overflow-y-auto">
                {config.layout === 'sidebar' ? (
                    <div className="grid grid-cols-12 gap-2 h-full">
                        <div className="col-span-8">{mainContent}</div>
                        <div className="col-span-4">
                             <div className={`${styles.cardBg} p-2 rounded-lg shadow-sm`}>
                                <h4 className={`text-xs font-bold ${styles.darkText} ${fontClass}`}>Sidebar</h4>
                                <ul className="text-xs text-gray-500 mt-1 space-y-1">
                                    <li className={`${styles.text} font-semibold`}>Link 1</li>
                                    <li>Link 2</li>
                                    <li>Link 3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : config.layout === 'grid' ? (
                    <div className="grid grid-cols-2 gap-2">
                        {mainContent}
                        <div className={`${styles.cardBg} p-3 rounded-lg shadow-sm`}>
                            <h3 className={`text-sm font-bold ${styles.darkText} ${fontClass}`}>{config.feature || "Feature"}</h3>
                            <div className="mt-2 space-y-1">
                                <div className="w-full h-2 bg-gray-200 rounded"></div>
                                <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    mainContent
                )}
            </div>
        </div>
    );
};

const WebsiteBuilderGame: React.FC<{ t: Translation }> = ({ t }) => {
    const [buildStep, setBuildStep] = useState(0); 
    
    const initialSiteConfig: SiteConfig = {
        name: '', color: 'blue', layout: 'default', welcome: '', about: '', font: 'sans', feature: ''
    };
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialSiteConfig);
    const [textInputs, setTextInputs] = useState({ name: '', welcome: '', about: '' });

    const stepsContent = t.game.websiteBuilderSteps;
    const TOTAL_BUILD_STEPS = 6;

    const handleTextChange = (field: keyof typeof textInputs, value: string) => {
        setTextInputs(prev => ({ ...prev, [field]: value }));
    };

    const nextBuildStep = () => {
        setBuildStep(prev => Math.min(prev + 1, TOTAL_BUILD_STEPS));
    };
    
    const handleResetBuilder = () => {
        setBuildStep(0);
        setSiteConfig(initialSiteConfig);
        setTextInputs({ name: '', welcome: '', about: '' });
    };

    const renderBuildControls = () => {
        switch (buildStep) {
            case 0: // Name
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-2">{stepsContent.step1_name.title}</h3>
                        <p className="text-muted-foreground mb-4">{stepsContent.step1_name.prompt}</p>
                        <input
                            type="text" value={textInputs.name}
                            onChange={(e) => handleTextChange('name', e.target.value)}
                            placeholder={stepsContent.step1_name.placeholder}
                            className="w-full bg-input p-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring" autoFocus
                        />
                        <button onClick={() => { setSiteConfig(c => ({...c, name: textInputs.name})); nextBuildStep(); }} disabled={!textInputs.name.trim()} className="w-full mt-4 bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 disabled:bg-muted">
                           {t.game.next}
                        </button>
                    </div>
                );
            case 1: // Color
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-2">{stepsContent.step2_color.title}</h3>
                        <p className="text-muted-foreground mb-4">{stepsContent.step2_color.prompt}</p>
                        <div className="grid grid-cols-2 gap-4">
                            {colorOptions.map(color => (
                                <button key={color.class} onClick={() => { setSiteConfig(c => ({...c, color: color.class})); nextBuildStep(); }} className={`p-4 rounded-lg border-2 border-transparent hover:border-primary`}>
                                    <div className={`w-full h-12 rounded bg-${color.class}-500`}></div>
                                    <span className="mt-2 block">{color.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2: // Layout
                 return (
                    <div>
                        <h3 className="text-xl font-bold mb-2">{stepsContent.step3_layout.title}</h3>
                        <p className="text-muted-foreground mb-4">{stepsContent.step3_layout.prompt}</p>
                        <div className="space-y-3">
                            {layoutOptions.map(opt => (
                                <button key={opt.class} onClick={() => { setSiteConfig(c => ({...c, layout: opt.class})); nextBuildStep(); }} className="w-full p-3 rounded-lg bg-input border border-border hover:bg-accent hover:border-primary/50 text-left flex items-center gap-3">
                                    <LayoutTemplateIcon className="w-6 h-6 text-muted-foreground"/>
                                    <span>{stepsContent.step3_layout.options[opt.name]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3: // Content
                return (
                     <div>
                        <h3 className="text-xl font-bold mb-2">{stepsContent.step4_content.title}</h3>
                        <p className="text-muted-foreground mb-4">{stepsContent.step4_content.prompt}</p>
                        <textarea
                            value={textInputs.welcome} onChange={(e) => handleTextChange('welcome', e.target.value)}
                            placeholder={stepsContent.step4_content.welcomePlaceholder}
                            className="w-full h-20 bg-input p-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring mb-2"
                        />
                        <textarea
                            value={textInputs.about} onChange={(e) => handleTextChange('about', e.target.value)}
                            placeholder={stepsContent.step4_content.aboutPlaceholder}
                            className="w-full h-20 bg-input p-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button onClick={() => { setSiteConfig(c => ({...c, welcome: textInputs.welcome, about: textInputs.about})); nextBuildStep(); }} disabled={!textInputs.welcome.trim() || !textInputs.about.trim()} className="w-full mt-4 bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 disabled:bg-muted">
                           {t.game.next}
                        </button>
                    </div>
                );
            case 4: // Font
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-2">{stepsContent.step5_font.title}</h3>
                        <p className="text-muted-foreground mb-4">{stepsContent.step5_font.prompt}</p>
                        <div className="space-y-3">
                           {fontOptions.map(opt => (
                                <button key={opt.class} onClick={() => { setSiteConfig(c => ({...c, font: opt.class})); nextBuildStep(); }} className={`w-full p-3 rounded-lg bg-input border border-border hover:bg-accent hover:border-primary/50 text-left font-${opt.class}`}>
                                    {stepsContent.step5_font.options[opt.name]} (Aa)
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 5: // Feature
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-2">{stepsContent.step6_feature.title}</h3>
                        <p className="text-muted-foreground mb-4">{stepsContent.step6_feature.prompt}</p>
                        <div className="space-y-3">
                            {featureOptions.map((opt) => (
                                <button key={opt.name} onClick={() => { setSiteConfig(c => ({...c, feature: stepsContent.step6_feature.options[opt.name] })); nextBuildStep(); }} className="w-full p-3 rounded-lg bg-input border-border hover:bg-accent hover:border-primary/50 text-left">
                                    {stepsContent.step6_feature.options[opt.name]}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 6: // Finish
                return (
                     <div className="text-center">
                        <h3 className="text-2xl font-bold text-green-500 mb-2">🎉 {stepsContent.finish.title} 🎉</h3>
                        <p className="text-muted-foreground mb-2">{stepsContent.finish.congrats}</p>
                        <p className="text-muted-foreground mb-6">{stepsContent.finish.prompt}</p>
                        <button onClick={handleResetBuilder} className="w-full bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform">
                            {stepsContent.finish.buildAgain}
                        </button>
                    </div>
                )
            default: return null;
        }
    };

    if (!stepsContent) return <p>Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto bg-card text-card-foreground p-4 sm:p-6 rounded-xl shadow-2xl border border-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-center">{t.game.websiteBuilderTitle}</h2>
                <div className="text-center mb-4">
                <p className="text-muted-foreground">{stepsContent.progress}: {buildStep} / {TOTAL_BUILD_STEPS}</p>
                <div className="w-full bg-secondary rounded-full h-2.5 mt-1">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(buildStep / TOTAL_BUILD_STEPS) * 100}%`, transition: 'width 0.5s ease' }}></div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                    {renderBuildControls()}
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2 text-center">{stepsContent.preview}</h3>
                    <SitePreview config={siteConfig} />
                </div>
            </div>
        </div>
    );
};

export default WebsiteBuilderGame;
// Dummy classes to help Tailwind's JIT compiler
// bg-red-600 text-red-600 bg-red-50 text-red-900 ring-red-500
// bg-blue-600 text-blue-600 bg-blue-50 text-blue-900 ring-blue-500
// bg-green-600 text-green-600 bg-green-50 text-green-900 ring-green-500
// bg-indigo-600 text-indigo-600 bg-indigo-50 text-indigo-900 ring-indigo-500
// font-sans font-serif font-mono
