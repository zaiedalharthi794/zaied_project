import React, { useState, useMemo } from 'react';
import { Translation, GameLevel } from '../../types';

const QuizGame: React.FC<{t: Translation}> = ({ t }) => {
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
             <div className="max-w-3xl mx-auto bg-card text-card-foreground p-8 rounded-xl shadow-2xl border border-border min-h-[450px] flex flex-col justify-center items-center">
                   <p className="text-xl text-muted-foreground">Loading Game...</p>
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
                        <h2 className="text-3xl font-bold mb-4">{t.game.quizTitle}</h2>
                        <p className="text-lg text-muted-foreground mb-8">{t.game.quizDescription}</p>
                        <button onClick={handleStartGame} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {t.game.start}
                        </button>
                    </div>
                );
            case 'playing':
                return (
                    <div>
                        <div className="mb-6 text-center">
                            <p className="text-lg font-bold text-primary">{currentLevel.title}</p>
                            <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {currentLevel.questions.length}</p>
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
                                    buttonClass += "bg-primary border-primary/80 text-primary-foreground";
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
                        {!isAnswered ? (
                            <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg disabled:bg-muted disabled:cursor-not-allowed">
                                {t.game.submit}
                            </button>
                        ) : (
                            <div className="text-center">
                                <p className={`text-xl font-bold mb-4 ${selectedAnswer === currentQuestion.answer ? 'text-green-500' : 'text-red-500'}`}>
                                    {selectedAnswer === currentQuestion.answer ? t.game.correct : t.game.incorrect}
                                </p>
                                <button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg">
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
                        <p className="text-xl text-muted-foreground mb-8">Current Score: {score} / {levels.slice(0, currentLevelIndex + 1).reduce((a, c) => a + c.questions.length, 0)}</p>
                        <button onClick={handleNextLevel} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {isLastLevel ? "View Final Score" : "Next Level"}
                        </button>
                    </div>
                 );
            case 'end':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">{t.game.congrats}</h2>
                        <p className="text-xl text-muted-foreground mb-4">{t.game.finalScore} {score} / {totalQuestions}</p>
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
        <div className="max-w-3xl mx-auto bg-card text-card-foreground p-8 rounded-xl shadow-2xl border border-border min-h-[450px] flex flex-col justify-center">
            {renderContent()}
        </div>
    );
};

export default QuizGame;
