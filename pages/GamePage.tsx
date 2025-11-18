import React, { useState } from 'react';
import { Translation } from '../types';
import QuizGame from '../components/games/QuizGame';
import MemoryGame from '../components/games/MemoryGame';
import IconMatchGame from '../components/games/IconMatchGame';
import WebsiteBuilderGame from '../components/games/WebsiteBuilderGame';
import { ArrowLeftIcon, QuizIcon, MemoryChipIcon, CameraIcon, GlobeAltIcon } from '../components/Icons';

interface GamePageProps {
    t: Translation;
}

const games = [
    {
        id: 'quiz',
        titleKey: 'quizTitle',
        descriptionKey: 'quizDescription',
        icon: QuizIcon,
        component: QuizGame,
    },
    {
        id: 'memory',
        titleKey: 'memoryTitle',
        descriptionKey: 'memoryDescription',
        icon: MemoryChipIcon,
        component: MemoryGame,
    },
    {
        id: 'icon-match',
        titleKey: 'iconGameTitle',
        descriptionKey: 'iconGameDescription',
        icon: CameraIcon,
        component: IconMatchGame,
    },
    {
        id: 'website-builder',
        titleKey: 'websiteBuilderTitle',
        descriptionKey: 'websiteBuilderDescription',
        icon: GlobeAltIcon,
        component: WebsiteBuilderGame,
    }
];

const GamePage: React.FC<GamePageProps> = ({ t }) => {
    const [activeGame, setActiveGame] = useState<string | null>(null);

    const handleGameSelect = (gameId: string) => {
        setActiveGame(gameId);
    };

    const handleBack = () => {
        setActiveGame(null);
    };

    if (activeGame) {
        const SelectedGame = games.find(g => g.id === activeGame)?.component;
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button onClick={handleBack} className="flex items-center gap-2 mb-6 text-primary hover:underline font-semibold transition-transform transform hover:-translate-x-1">
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>{t.game.backToGames}</span>
                </button>
                {SelectedGame ? <SelectedGame t={t} /> : <p>Game not found.</p>}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">{t.game.title}</h1>
                <p className="text-xl text-muted-foreground mt-2">{t.game.welcome}</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game) => {
                    const Icon = game.icon;
                    return (
                        <div
                            key={game.id}
                            onClick={() => handleGameSelect(game.id)}
                            className="bg-card text-card-foreground p-8 rounded-2xl shadow-lg border border-border hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
                        >
                            <div className="flex justify-center mb-4">
                               <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-12 h-12 text-primary" />
                               </div>
                            </div>
                            <h2 className="text-2xl font-bold text-center text-foreground mb-2 group-hover:text-primary transition-colors">{t.game[game.titleKey as keyof typeof t.game] as string}</h2>
                            <p className="text-muted-foreground text-center">{t.game[game.descriptionKey as keyof typeof t.game] as string}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GamePage;