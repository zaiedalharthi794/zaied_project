
import React, { useState, useMemo } from 'react';
import { Translation, GameLevel } from '../types';

const GamePage: React.FC<{t: Translation}> = ({ t }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'level-cleared' | 'end'>('start');
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const levels: GameLevel[] = t.game.levels || [];
    
    // This check prevents crashing if translations are not loaded yet
    if (!levels.length) {
        return (
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-2xl border border-neutral-200 dark:border-zinc-700 min-h-[450px] flex flex-col justify-center items-center">
                   <p className="text-xl text-zinc-600 dark:text-neutral-300">Loading Game...</p>
                </div>
            </div>
        )
    }

    const handleStartGame = () => {
        setGameState('playing');
        setCurrentLevelIndex(0);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
    };

    const handleAnswerSelect = (answer: string) => {
        if (!isAnswered) {
            setSelectedAnswer(answer);
        }
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;
        setIsAnswered(true);
        if (selectedAnswer === levels[currentLevelIndex].questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        const isLastQuestionInLevel = currentQuestionIndex === levels[currentLevelIndex].questions.length - 1;

        if (isLastQuestionInLevel) {
            setGameState('level-cleared');
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        }
    };

    const handleNextLevel = () => {
        const isLastLevel = currentLevelIndex === levels.length - 1;

        if (isLastLevel) {
            setGameState('end');
        } else {
            setCurrentLevelIndex(currentLevelIndex + 1);
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setGameState('playing');
        }
    };
    
    const currentLevel = levels[currentLevelIndex];
    const currentQuestion = currentLevel.questions[currentQuestionIndex];
    const totalQuestions = useMemo(() => levels.reduce((acc, level) => acc + level.questions.length, 0), [levels]);


    const renderContent = () => {
        switch (gameState) {
            case 'start':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">{t.game.title}</h2>
                        <p className="text-lg text-zinc-600 dark:text-neutral-300 mb-8">{t.game.welcome}</p>
                        <button onClick={handleStartGame} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {t.game.start}
                        </button>
                    </div>
                );
            case 'playing':
                return (
                    <div>
                        <div className="mb-6 text-center">
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{currentLevel.title}</p>
                            <p className="text-zinc-600 dark:text-neutral-300">Question {currentQuestionIndex + 1} of {currentLevel.questions.length}</p>
                            <h2 className="text-2xl font-semibold mt-2">{currentQuestion.question}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {currentQuestion.options.map((option) => {
                                const isCorrect = isAnswered && option === currentQuestion.answer;
                                const isIncorrect = isAnswered && selectedAnswer === option && option !== currentQuestion.answer;
                                let buttonClass = "p-4 rounded-lg text-lg text-left transition-all duration-300 border-2 ";
                                if (isCorrect) {
                                    buttonClass += "bg-green-500 border-green-400 text-white scale-105";
                                } else if (isIncorrect) {
                                    buttonClass += "bg-red-600 border-red-500 text-white";
                                } else if (selectedAnswer === option) {
                                    buttonClass += "bg-orange-500 dark:bg-orange-600 border-orange-600 dark:border-orange-500 text-white";
                                } else {
                                    buttonClass += "bg-neutral-100 dark:bg-zinc-700 border-neutral-200 dark:border-zinc-600 hover:bg-orange-500/10 dark:hover:bg-zinc-600 hover:border-orange-500 dark:hover:border-orange-500";
                                }
                                return (
                                    <button key={option} onClick={() => handleAnswerSelect(option)} className={buttonClass} disabled={isAnswered}>
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                        {!isAnswered ? (
                            <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg disabled:bg-zinc-400 disabled:cursor-not-allowed">
                                {t.game.submit}
                            </button>
                        ) : (
                            <div className="text-center">
                                <p className={`text-xl font-bold mb-4 ${selectedAnswer === currentQuestion.answer ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                    {selectedAnswer === currentQuestion.answer ? t.game.correct : t.game.incorrect}
                                </p>
                                <button onClick={handleNext} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg">
                                    {currentQuestionIndex < currentLevel.questions.length - 1 ? t.game.next : "Finish Level"}
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 'level-cleared':
                 const isLastLevel = currentLevelIndex === levels.length - 1;
                 return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">🎉 Well done! You've completed {currentLevel.title} 🎉</h2>
                        <p className="text-xl text-zinc-600 dark:text-neutral-300 mb-8">Current Score: {score} / {levels.slice(0, currentLevelIndex + 1).reduce((a, c) => a + c.questions.length, 0)}</p>
                        <button onClick={handleNextLevel} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {isLastLevel ? "View Final Score" : "Next Level"}
                        </button>
                    </div>
                 );
            case 'end':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">{t.game.congrats}</h2>
                        <p className="text-xl text-zinc-600 dark:text-neutral-300 mb-4">{t.game.finalScore} {score} / {totalQuestions}</p>
                        <div className="bg-neutral-100 dark:bg-zinc-800 p-4 rounded-lg mb-8 border-l-4 border-orange-500">
                            <p className="text-lg text-zinc-700 dark:text-orange-300">{t.game.hint}</p>
                        </div>
                        <button onClick={handleStartGame} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {t.game.playAgain}
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-2xl border border-neutral-200 dark:border-zinc-700 min-h-[450px] flex flex-col justify-center">
                {renderContent()}
            </div>
        </div>
    );
};

export default GamePage;
