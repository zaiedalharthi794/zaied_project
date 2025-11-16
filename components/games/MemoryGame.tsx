import React, { useState, useEffect, useMemo } from 'react';
import { Translation } from '../../types';
import { CodeBracketIcon, TrophyIcon, FootballIcon, BookOpenIcon, ChessIcon, MountainIcon } from '../Icons';

const icons = [
    { name: 'Projects', component: CodeBracketIcon },
    { name: 'Achievements', component: TrophyIcon },
    { name: 'Football', component: FootballIcon },
    { name: 'Reading', component: BookOpenIcon },
    { name: 'Chess', component: ChessIcon },
    { name: 'Climbing', component: MountainIcon },
];

const MemoryGame: React.FC<{ t: Translation }> = ({ t }) => {
    const [cards, setCards] = useState<any[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<string[]>([]);
    const [moves, setMoves] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);

    const shuffleCards = useMemo(() => {
        const duplicatedIcons = [...icons, ...icons];
        return duplicatedIcons
            .map((icon, index) => ({ ...icon, id: index }))
            .sort(() => Math.random() - 0.5);
    }, []);

    useEffect(() => {
        setCards(shuffleCards);
    }, [shuffleCards]);

    const resetGame = () => {
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setCards(shuffleCards.map((icon, index) => ({...icon, id: index})).sort(() => Math.random() - 0.5));
    };

    const handleClick = (index: number) => {
        if (isDisabled || flipped.includes(index) || solved.includes(cards[index].name)) {
            return;
        }

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            setIsDisabled(true);
            const [firstIndex, secondIndex] = newFlipped;
            if (cards[firstIndex].name === cards[secondIndex].name) {
                setSolved([...solved, cards[firstIndex].name]);
                setFlipped([]);
                setIsDisabled(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setIsDisabled(false);
                }, 1000);
            }
        }
    };

    const isGameWon = solved.length === icons.length;

    return (
        <div className="max-w-2xl mx-auto bg-card text-card-foreground p-6 rounded-xl shadow-2xl border border-border flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">{t.game.memoryTitle}</h2>
            
            <div className="grid grid-cols-4 gap-4 w-full mb-6">
                {cards.map((card, index) => {
                    const isFlipped = flipped.includes(index) || solved.includes(card.name);
                    const CardIcon = card.component;
                    return (
                        <div
                            key={card.id}
                            className={`aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                            onClick={() => handleClick(index)}
                        >
                            <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-secondary hover:bg-accent rounded-lg">
                                {!isFlipped && <span className="text-4xl text-primary font-bold">?</span>}
                            </div>
                            <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg flex items-center justify-center ${solved.includes(card.name) ? 'bg-green-500/20 border-2 border-green-500' : 'bg-primary/20'}`}>
                                {CardIcon && <CardIcon className="w-1/2 h-1/2 text-foreground" />}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {isGameWon && (
                <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-green-500">🎉 {t.game.congrats} 🎉</p>
                    <p className="text-muted-foreground">You did it in {moves} moves!</p>
                </div>
            )}

            <div className="flex justify-between items-center w-full">
                <div className="text-lg font-semibold">Moves: <span className="text-primary">{moves}</span></div>
                <button onClick={resetGame} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">
                    {t.game.playAgain}
                </button>
            </div>

            {/* Simple CSS for the 3D flip effect */}
            <style>{`
                .transform-style-3d { transform-style: preserve-3d; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { backface-visibility: hidden; }
            `}</style>
        </div>
    );
};

export default MemoryGame;
