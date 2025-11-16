import React, { useState, useEffect, useCallback } from 'react';
import { Translation } from '../../types';

const GRID_SIZE = 3;
const IMAGE_URL = "https://i.ibb.co/6r1zX1g/image.png";

const PuzzleGame: React.FC<{ t: Translation }> = ({ t }) => {
    const createSolvedTiles = () => Array.from({ length: GRID_SIZE * GRID_SIZE - 1 }, (_, i) => i + 1).concat(0);
    
    const [tiles, setTiles] = useState(createSolvedTiles());
    const [moves, setMoves] = useState(0);
    const [isSolved, setIsSolved] = useState(true);

    const shuffleTiles = useCallback(() => {
        let shuffledTiles = createSolvedTiles();
        // Perform a series of valid moves to shuffle
        for (let i = 0; i < 100; i++) {
            const emptyIndex = shuffledTiles.indexOf(0);
            const validMoves = [];
            if (emptyIndex % GRID_SIZE > 0) validMoves.push(emptyIndex - 1); // left
            if (emptyIndex % GRID_SIZE < GRID_SIZE - 1) validMoves.push(emptyIndex + 1); // right
            if (emptyIndex >= GRID_SIZE) validMoves.push(emptyIndex - GRID_SIZE); // up
            if (emptyIndex < GRID_SIZE * GRID_SIZE - GRID_SIZE) validMoves.push(emptyIndex + GRID_SIZE); // down
            
            const randomIndex = validMoves[Math.floor(Math.random() * validMoves.length)];
            [shuffledTiles[emptyIndex], shuffledTiles[randomIndex]] = [shuffledTiles[randomIndex], shuffledTiles[emptyIndex]];
        }
        setTiles(shuffledTiles);
        setMoves(0);
        setIsSolved(false);
    }, []);

    useEffect(() => {
        shuffleTiles();
    }, [shuffleTiles]);

    const checkSolved = (currentTiles: number[]) => {
        for (let i = 0; i < currentTiles.length - 1; i++) {
            if (currentTiles[i] !== i + 1) return false;
        }
        return true;
    };

    const handleTileClick = (index: number) => {
        if (isSolved) return;

        const emptyIndex = tiles.indexOf(0);
        const { row, col } = { row: Math.floor(index / GRID_SIZE), col: index % GRID_SIZE };
        const { emptyRow, emptyCol } = { emptyRow: Math.floor(emptyIndex / GRID_SIZE), emptyCol: emptyIndex % GRID_SIZE };

        const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
            setMoves(moves + 1);
            if (checkSolved(newTiles)) {
                setIsSolved(true);
            }
        }
    };

    const tileSize = 100 / GRID_SIZE;

    return (
        <div className="max-w-md mx-auto bg-card text-card-foreground p-6 rounded-xl shadow-2xl border border-border flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">{t.game.puzzleTitle}</h2>
            
            <div className="relative bg-secondary rounded-lg overflow-hidden shadow-inner" style={{ width: 300, height: 300 }}>
                {tiles.map((tile, index) => {
                    const isEmpty = tile === 0;
                    const correctIndex = tile - 1;
                    const row = Math.floor(correctIndex / GRID_SIZE);
                    const col = correctIndex % GRID_SIZE;
                    
                    const top = Math.floor(index / GRID_SIZE) * (100 / GRID_SIZE);
                    const left = (index % GRID_SIZE) * (100 / GRID_SIZE);

                    return (
                        <div
                            key={index}
                            onClick={() => handleTileClick(index)}
                            className={`absolute transition-all duration-300 ease-in-out ${!isEmpty ? 'cursor-pointer hover:opacity-80 border border-background/20' : ''} ${isSolved && !isEmpty ? 'border-2 border-green-500' : ''}`}
                            style={{
                                width: `${tileSize}%`,
                                height: `${tileSize}%`,
                                top: `${top}%`,
                                left: `${left}%`,
                                backgroundImage: isEmpty ? 'none' : `url(${IMAGE_URL})`,
                                backgroundSize: `${GRID_SIZE * 100}%`,
                                backgroundPosition: `${col * (100 / (GRID_SIZE - 1))}% ${row * (100 / (GRID_SIZE - 1))}%`,
                                backgroundColor: isEmpty ? 'var(--secondary)' : 'transparent',
                            }}
                        />
                    );
                })}
            </div>
            {isSolved && <p className="text-2xl font-bold text-green-500 mt-4 animate-pulse">🎉 {t.game.congrats.split('!')[0]}! 🎉</p>}
            
            <div className="flex justify-between items-center w-full mt-6">
                <div className="text-lg font-semibold">Moves: <span className="text-primary">{moves}</span></div>
                <button onClick={shuffleTiles} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">
                    {t.game.playAgain}
                </button>
            </div>
        </div>
    );
};

export default PuzzleGame;
