import React, { useState, useMemo } from 'react';
import { Translation, IconGameQuestion } from '../../types';
import { TrophyIcon, CodeBracketIcon, HeartIcon, MountainIcon } from '../Icons';

const iconMap: { [key: string]: React.FC<any> } = {
    TrophyIcon,
    CodeBracketIcon,
    HeartIcon,
    MountainIcon,
};

const IconMatchGame: React.FC<{t: Translation}> = ({ t }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
    const [questions, setQuestions] = useState<IconGameQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

    const setupGame = () => {
        const shuffledQuestions = shuffleArray(t.game.iconGameQuestions);
        const processedQuestions = shuffledQuestions.map(q => ({
            ...q,
            options: shuffleArray(q.options)
        }));
        setQuestions(processedQuestions);
    };
    
    // This check prevents crashing if translations are not loaded yet
    if (!t.game.iconGameQuestions || t.game.iconGameQuestions.length === 0) {
        return (
             <div className="max-w-3xl mx-auto bg-card text-card-foreground p-8 rounded-xl shadow-2xl border border-border min-h-[450px] flex flex-col justify-center items-center">
                   <p className="text-xl text-muted-foreground">Loading Game...</p>
                </div>
        )
    }

    const handleStartGame = () => {
        setupGame();
        setGameState('playing');
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
    };

    const handleAnswerSelect = (answer: string) => {
        if (!isAnswered) {
            setSelectedAnswer(answer);
            setIsAnswered(true);
            if (answer === questions[currentQuestionIndex].correctAnswer) {
                setScore(score + 1);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setGameState('end');
        }
    };
    
    const renderContent = () => {
        switch (gameState) {
            case 'start':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">{t.game.iconGameTitle}</h2>
                        <p className="text-lg text-muted-foreground mb-8">{t.game.iconGameDescription}</p>
                        <button onClick={handleStartGame} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {t.game.start}
                        </button>
                    </div>
                );
            case 'playing':
                if (questions.length === 0) return null;
                const currentQuestion = questions[currentQuestionIndex];
                const IconComponent = iconMap[currentQuestion.iconName];
                return (
                    <div>
                        <div className="mb-6 text-center">
                             <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
                             <div className="flex justify-center my-4">
                                <div className="p-5 bg-secondary rounded-full border-4 border-primary/20">
                                     {IconComponent && <IconComponent className="w-16 h-16 text-primary" />}
                                </div>
                             </div>
                            <h2 className="text-2xl font-semibold mt-2">{currentQuestion.questionText}</h2>
                        </div>
                        <div className="space-y-3 mb-6">
                            {currentQuestion.options.map((option) => {
                                const isCorrect = isAnswered && option === currentQuestion.correctAnswer;
                                const isIncorrect = isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer;
                                let buttonClass = "w-full p-4 rounded-lg text-md text-center transition-all duration-300 border-2 ";
                                if (isCorrect) {
                                    buttonClass += "bg-green-500 border-green-400 text-white scale-105";
                                } else if (isIncorrect) {
                                    buttonClass += "bg-red-600 border-red-500 text-white";
                                } else {
                                    buttonClass += "bg-secondary border-border hover:bg-accent hover:border-primary/50";
                                }
                                return (
                                    <button key={option} onClick={() => handleAnswerSelect(option)} className={buttonClass} disabled={isAnswered}>
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                        {isAnswered && (
                            <div className="text-center">
                                <button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg">
                                    {currentQuestionIndex < questions.length - 1 ? t.game.next : "Finish Game"}
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 'end':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">{t.game.congrats}</h2>
                        <p className="text-xl text-muted-foreground mb-4">{t.game.finalScore} {score} / {questions.length}</p>
                        <div className="bg-secondary p-4 rounded-lg mb-8 border-l-4 border-primary">
                            <p className="text-lg text-primary">{t.game.hint}</p>
                        </div>
                        <button onClick={handleStartGame} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {t.game.playAgain}
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-card text-card-foreground p-8 rounded-xl shadow-2xl border border-border min-h-[500px] flex flex-col justify-center">
            {renderContent()}
        </div>
    );
};

export default IconMatchGame;