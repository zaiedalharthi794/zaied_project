
import React, { useState, useMemo } from 'react';
import { Translation } from '../types';

const GamePage: React.FC<{t: Translation}> = ({ t }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const questions = useMemo(() => [
        {
            question: "ما هي الهواية التي أمارسها وتتطلب تسلق المرتفعات؟",
            options: ["السباحة", "تسلق الجبال", "القراءة", "لعب الشطرنج"],
            answer: "تسلق الجبال"
        },
        {
            question: "في أي مسابقة حققت المركز الأول في الصف السادس؟",
            options: ["أجمل مطوية", "مسابقة بلال", "الطباعة السريعة", "وضوؤك أيها المسلم"],
            answer: "الطباعة السريعة"
        },
        {
            question: "ما هو أحد أهدافي طويلة المدى؟",
            options: ["شراء سيارة", "السفر حول العالم", "إكمال دراستي", "تعلم لغة جديدة"],
            answer: "إكمال دراستي"
        },
        {
            question: "أي من هذه المهارات أمتلكها؟",
            options: ["الطبخ", "العمل الجماعي", "الرسم", "العزف على الجيتار"],
            answer: "العمل الجماعي"
        }
    ], []);

    const handleStartGame = () => {
        setGameState('playing');
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
        if (selectedAnswer === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
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
                        <h2 className="text-3xl font-bold mb-4">{t.game.title}</h2>
                        <p className="text-lg text-gray-300 mb-8">{t.game.welcome}</p>
                        <button onClick={handleStartGame} className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {t.game.start}
                        </button>
                    </div>
                );
            case 'playing':
                const question = questions[currentQuestionIndex];
                return (
                    <div>
                        <div className="mb-6 text-center">
                            <p className="text-gray-400">السؤال {currentQuestionIndex + 1} من {questions.length}</p>
                            <h2 className="text-2xl font-semibold mt-2">{question.question}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {question.options.map((option) => {
                                const isCorrect = isAnswered && option === question.answer;
                                const isIncorrect = isAnswered && selectedAnswer === option && option !== question.answer;
                                let buttonClass = "p-4 rounded-lg text-lg text-left transition-all duration-300 border-2 ";
                                if (isCorrect) {
                                    buttonClass += "bg-green-500 border-green-400 text-white scale-105";
                                } else if (isIncorrect) {
                                    buttonClass += "bg-red-600 border-red-500 text-white";
                                } else if (selectedAnswer === option) {
                                    buttonClass += "bg-red-800 border-red-700 text-white";
                                } else {
                                    buttonClass += "bg-gray-700 border-gray-600 hover:bg-red-900 hover:border-red-700";
                                }
                                return (
                                    <button key={option} onClick={() => handleAnswerSelect(option)} className={buttonClass} disabled={isAnswered}>
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                        {!isAnswered ? (
                            <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed">
                                {t.game.submit}
                            </button>
                        ) : (
                            <div className="text-center">
                                <p className={`text-xl font-bold mb-4 ${selectedAnswer === question.answer ? 'text-green-400' : 'text-red-400'}`}>
                                    {selectedAnswer === question.answer ? t.game.correct : t.game.incorrect}
                                </p>
                                <button onClick={handleNextQuestion} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg">
                                    {currentQuestionIndex < questions.length - 1 ? t.game.next : t.game.finalScore}
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 'end':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">{t.game.congrats}</h2>
                        <p className="text-xl text-gray-300 mb-4">{t.game.finalScore} {score} / {questions.length}</p>
                        <div className="bg-gray-700 p-4 rounded-lg mb-8 border-l-4 border-red-500">
                            <p className="text-lg text-yellow-300">{t.game.hint}</p>
                        </div>
                        <button onClick={handleStartGame} className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                            {t.game.playAgain}
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto bg-gray-800/50 p-8 rounded-xl shadow-2xl border border-gray-700">
                {renderContent()}
            </div>
        </div>
    );
};

export default GamePage;
