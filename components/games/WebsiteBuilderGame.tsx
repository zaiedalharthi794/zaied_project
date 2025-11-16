import React, { useState, useMemo } from 'react';
import { Translation } from '../../types';
import { LayoutTemplateIcon, PaletteIcon, PencilSwooshIcon, CodeBracketIcon } from '../Icons';


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


const WebsiteBuilderGame: React.FC<{ t: Translation }> = ({ t }) => {
    const [gameState, setGameState] = useState<'build' | 'challenge' | 'challenge_end'>('build');
    const [buildStep, setBuildStep] = useState(0); // 0-5 for stages, 6 for completion
    
    const initialSiteConfig: SiteConfig = {
        name: '', color: 'blue', layout: 'default', welcome: '', about: '', font: 'sans', feature: ''
    };
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialSiteConfig);
    
    const [textInputs, setTextInputs] = useState({ name: '', welcome: '', about: '' });

    // Challenge State
    const [challengeQuestionIndex, setChallengeQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [challengeScore, setChallengeScore] = useState(0);

    const challengeContent = t.game.websiteBuilderChallenge;
    const stepsContent = t.game.websiteBuilderSteps;
    const TOTAL_BUILD_STEPS = 6;

    const handleTextChange = (field: keyof typeof textInputs, value: string) => {
        setTextInputs(prev => ({ ...prev, [field]: value }));
    };

    const nextBuildStep = () => {
        setBuildStep(prev => Math.min(prev + 1, TOTAL_BUILD_STEPS));
    };
    
    const handleResetBuilder = () => {
        setGameState('build');
        setBuildStep(0);
        setSiteConfig(initialSiteConfig);
        setTextInputs({ name: '', welcome: '', about: '' });
    };

    const startChallenge = () => {
        setGameState('challenge');
        setChallengeQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setChallengeScore(0);
    };

    const handleCheckAnswer = () => {
        if (selectedAnswer === null) return;
        setIsAnswered(true);
        if(selectedAnswer === challengeContent.questions[challengeQuestionIndex].answer) {
            setChallengeScore(s => s + 1);
        }
    };
    
    const handleNextQuestion = () => {
        if (challengeQuestionIndex < challengeContent.questions.length - 1) {
            setChallengeQuestionIndex(i => i + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setGameState('challenge_end');
        }
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
                        <button onClick={startChallenge} className="w-full bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform">
                            {stepsContent.finish.startChallenge}
                        </button>
                    </div>
                )
            default: return null;
        }
    };
    
    const renderChallenge = () => {
        if(gameState === 'challenge_end') {
            return (
                 <div className="text-center p-8 bg-secondary/50 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">{challengeContent.finalScore}</h3>
                    <p className="text-5xl font-bold text-primary mb-6">{challengeScore} / {challengeContent.questions.length}</p>
                     <button onClick={handleResetBuilder} className="bg-primary text-primary-foreground font-bold py-2 px-6 rounded-lg mr-2">
                        {challengeContent.playBuilderAgain}
                    </button>
                    <button onClick={startChallenge} className="bg-secondary text-secondary-foreground font-bold py-2 px-6 rounded-lg">
                        {t.game.playAgain}
                    </button>
                </div>
            )
        }

        const question = challengeContent.questions[challengeQuestionIndex];
        return (
            <div>
                 <h3 className="text-2xl font-bold text-center mb-2">{challengeContent.title}</h3>
                 <p className="text-muted-foreground text-center mb-6">{challengeContent.subtitle}</p>

                 <div className="bg-secondary/50 p-6 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">{challengeContent.questionLabel} {challengeQuestionIndex + 1}/{challengeContent.questions.length}</p>
                    <p className="text-lg font-semibold mb-4">{question.question}</p>
                    <div className="space-y-2">
                        {question.options.map(option => {
                            const isCorrect = isAnswered && option === question.answer;
                            const isIncorrect = isAnswered && selectedAnswer === option && option !== question.answer;
                            let buttonClass = "w-full p-3 rounded-lg text-left border-2 ";
                            if (isCorrect) buttonClass += "bg-green-500 border-green-400 text-white";
                            else if (isIncorrect) buttonClass += "bg-red-600 border-red-500 text-white";
                            else if (selectedAnswer === option) buttonClass += "bg-primary/50 border-primary text-primary-foreground";
                            else buttonClass += "bg-input border-border hover:bg-accent";
                            
                            return <button key={option} onClick={() => setSelectedAnswer(option)} disabled={isAnswered} className={buttonClass}>{option}</button>
                        })}
                    </div>
                    {isAnswered && (
                        <div className={`mt-4 p-2 rounded-md text-sm ${selectedAnswer === question.answer ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                           <strong>{selectedAnswer === question.answer ? challengeContent.correctAnswer : challengeContent.wrongAnswer}</strong> {question.explanation}
                        </div>
                    )}
                    <button 
                        onClick={isAnswered ? handleNextQuestion : handleCheckAnswer} 
                        disabled={!isAnswered && selectedAnswer === null}
                        className="w-full mt-4 bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 disabled:bg-muted"
                    >
                        {isAnswered 
                            ? (challengeQuestionIndex < challengeContent.questions.length - 1 ? challengeContent.nextQuestion : challengeContent.viewResults) 
                            : challengeContent.checkAnswer}
                    </button>
                 </div>
            </div>
        )
    }

    const colorClasses = {
        bg: `bg-${siteConfig.color}-600`,
        text: `text-${siteConfig.color}-600`,
        border: `border-${siteConfig.color}-600`,
    }

    const fontClasses = {
        heading: `font-${siteConfig.font}`,
        body: `font-${siteConfig.font}`,
    }

    const previewLayoutClass = useMemo(() => {
        switch (siteConfig.layout) {
            case 'sidebar': return 'grid grid-cols-4 gap-2';
            case 'grid': return 'grid grid-cols-2 gap-2';
            default: return 'flex flex-col';
        }
    }, [siteConfig.layout]);

    if (!stepsContent || !challengeContent) return <p>Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto bg-card text-card-foreground p-4 sm:p-6 rounded-xl shadow-2xl border border-border">
            {gameState === 'build' ? (
                <>
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
                            <div className={`w-full h-96 bg-background rounded-lg shadow-lg border-4 border-border overflow-hidden transform scale-90 sm:scale-100 ${fontClasses.body}`}>
                                <header className={`${colorClasses.bg} p-2 text-white flex items-center`}>
                                    <div className="w-2 h-2 rounded-full bg-white/30 mr-1"></div><div className="w-2 h-2 rounded-full bg-white/30 mr-1"></div><div className="w-2 h-2 rounded-full bg-white/30 mr-2"></div>
                                    <p className="text-xs flex-grow text-center truncate">{siteConfig.name || '...'}</p>
                                </header>
                                <main className={`p-3 text-sm ${previewLayoutClass}`}>
                                    <div className={siteConfig.layout === 'sidebar' ? 'col-span-3' : 'w-full'}>
                                        <h1 className={`text-xl font-bold ${colorClasses.text} ${fontClasses.heading} truncate`}>{siteConfig.name || 'Site Title'}</h1>
                                        <p className="mt-1 text-muted-foreground">{siteConfig.welcome || 'Welcome message goes here...'}</p>
                                        <div className="mt-3">
                                            <h2 className={`font-bold ${fontClasses.heading}`}>About Me</h2>
                                            <p className="text-muted-foreground text-xs">{siteConfig.about || 'About section content...'}</p>
                                        </div>
                                    </div>
                                    {(siteConfig.feature || siteConfig.layout === 'sidebar') && (
                                         <div className={`${siteConfig.layout === 'sidebar' ? 'col-span-1' : ''} mt-3`}>
                                            <div className="p-2 bg-secondary rounded-md">
                                                <h4 className={`font-bold text-foreground text-xs mb-1 ${fontClasses.heading}`}>{siteConfig.feature || "Feature"}</h4>
                                                <div className="w-full h-4 bg-muted rounded"></div>
                                                <div className="w-3/4 h-4 bg-muted rounded mt-1"></div>
                                            </div>
                                        </div>
                                    )}
                                </main>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                renderChallenge()
            )}
        </div>
    );
};

export default WebsiteBuilderGame;
