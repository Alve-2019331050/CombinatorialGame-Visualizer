import { useState, useCallback, useEffect } from 'react';
import { Box, VStack, useToast } from '@chakra-ui/react';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import GameLanding from './GameLanding';
import GameSetup from './GameSetup';
import GameControls from './GameControls';
import { calculateOptimalMove } from '../utils/gameLogic';
import useGameSound from '../hooks/useSound';
import Confetti from 'react-confetti';

const App = () => {
  const [gameState, setGameState] = useState('landing'); // landing, setup, playing
  const [gameType, setGameType] = useState('nim');
  const [piles, setPiles] = useState([3, 5, 7]);
  const [currentPlayer, setCurrentPlayer] = useState('player');
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const playSound = useGameSound();
  const toast = useToast();

  const checkGameOver = useCallback((newPiles, currentGameState) => {
    const totalStones = newPiles.reduce((sum, pile) => sum + pile, 0);
    if (totalStones === 0) {
      const lastPlayer = currentGameState.currentPlayer === 'player' ? 'computer' : 'player';
      const gameWinner = currentGameState.gameType === 'misere' ? 
        (lastPlayer === 'player' ? 'computer' : 'player') : 
        lastPlayer;
      
      setWinner(gameWinner);
      setIsGameOver(true);
      setShowConfetti(gameWinner === 'player');
      playSound('win');
      return true;
    }
    return false;
  }, [playSound]);

  const handleMove = useCallback((pileIndex, stoneCount, isStaircaseMove = false) => {
    setPiles(prevPiles => {
      const newPiles = [...prevPiles];
      newPiles[pileIndex] -= stoneCount;
      
      // For staircase game, if moving from a non-first pile, add stones to previous pile
      if (isStaircaseMove) {
        newPiles[pileIndex - 1] += stoneCount;
      }
      
      return newPiles;
    });
    
    setCurrentPlayer(prevPlayer => {
      if (prevPlayer === 'player') {
        playSound('move');
        return 'computer';
      }
      return prevPlayer;
    });
  }, [playSound]);

  useEffect(() => {
    if (currentPlayer === 'computer' && !isGameOver) {
      const timer = setTimeout(() => {
        const move = calculateOptimalMove(piles, gameType);
        if (move) {
          setPiles(prevPiles => {
            const newPiles = [...prevPiles];
            newPiles[move.pileIndex] -= move.count;
            
            // For staircase game, if moving from a non-first pile, add stones to previous pile
            if (gameType === 'staircase' && move.pileIndex > 0) {
              newPiles[move.pileIndex - 1] += move.count;
            }
            
            // Check game over after computer's move
            const gameState = {
              currentPlayer: 'player',
              gameType
            };
            const isOver = checkGameOver(newPiles, gameState);
            
            if (!isOver) {
              setCurrentPlayer('player');
              playSound('move');
            }
            
            return newPiles;
          });
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, piles, gameType, isGameOver, checkGameOver, playSound]);

  // Check game over after player's move
  useEffect(() => {
    if (currentPlayer === 'computer' && !isGameOver) {
      const gameState = {
        currentPlayer: 'computer',
        gameType
      };
      checkGameOver(piles, gameState);
    }
  }, [currentPlayer, piles, gameType, isGameOver, checkGameOver]);

  const handleReset = useCallback(() => {
    setGameState('landing');
    setPiles([3, 5, 7]);
    setCurrentPlayer('player');
    setIsGameOver(false);
    setWinner(null);
    setShowConfetti(false);
  }, []);

  const handleGameSelect = useCallback((newGameType) => {
    setGameType(newGameType);
    setGameState('setup');
    setIsGameOver(false);
    setWinner(null);
    setShowConfetti(false);
    
    toast({
      title: 'Game Type Selected',
      description: `Configure your game of ${newGameType === 'nim' ? 'Classic' : newGameType === 'misere' ? 'Misère' : 'Staircase'} Nim`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [toast]);

  const handleStartGame = useCallback((initialPiles) => {
    setPiles(initialPiles);
    setGameState('playing');
    setCurrentPlayer('player');
    setIsGameOver(false);
    setWinner(null);
    setShowConfetti(false);
  }, []);

  return (
    <Box minH="100vh">
      {showConfetti && <Confetti />}
      <VStack spacing={8} p={4}>
        {gameState === 'landing' && (
          <GameLanding onGameSelect={handleGameSelect} />
        )}
        
        {gameState === 'setup' && (
          <GameSetup
            gameType={gameType}
            onStartGame={handleStartGame}
          />
        )}
        
        {gameState === 'playing' && (
          <>
            <GameHeader
              gameType={gameType}
              currentPlayer={currentPlayer}
              onReset={handleReset}
            />
            <GameBoard
              piles={piles}
              currentPlayer={currentPlayer}
              gameType={gameType}
              onMove={handleMove}
            />
            {isGameOver && (
              <GameControls
                winner={winner}
                gameType={gameType}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default App;
