export const calculateNimSum = (piles) => {
  return piles.reduce((sum, pile) => sum ^ pile, 0);
};

export const calculateOptimalMove = (piles, gameType) => {
  if (gameType === 'nim') {
    const nimSum = calculateNimSum(piles);
    
    // If in a winning position, make a strategic move
    if (nimSum !== 0) {
      for (let i = 0; i < piles.length; i++) {
        if (piles[i] === 0) continue;
        
        const targetSize = piles[i] ^ nimSum;
        if (targetSize < piles[i]) {
          return {
            pileIndex: i,
            count: piles[i] - targetSize
          };
        }
      }
    }
  } else if(gameType === 'misere'){
    // Misere Nim strategy
    const pilesGreaterThanOne = piles.filter(pile => pile > 1).length;
    const singleStonePiles = piles.filter(pile => pile === 1).length;
    
    if (pilesGreaterThanOne > 1) {
      // Apply normal Nim strategy when multiple piles have >1 stones
      const nimSum = calculateNimSum(piles);
      if (nimSum !== 0) {
        for (let i = 0; i < piles.length; i++) {
          if (piles[i] === 0) continue;
          
          const targetSize = piles[i] ^ nimSum;
          if (targetSize < piles[i]) {
            return {
              pileIndex: i,
              count: piles[i] - targetSize
            };
          }
        }
      }
    } else {
      // Special case: at most one pile with >1 stones
      if (pilesGreaterThanOne === 1) {
        // Find the pile with >1 stones
        const largeIndex = piles.findIndex(pile => pile > 1);
        // Reduce to 1 if odd number of 1s, reduce to 0 if even number of 1s
        return {
          pileIndex: largeIndex,
          count: piles[largeIndex] - (singleStonePiles % 2 === 1 ? 0 : 1)
        };
      } else {
        // All piles are 0 or 1
        if (singleStonePiles % 2 === 0) {
          // Want odd number of 1s - remove a stone
          const oneIndex = piles.findIndex(pile => pile === 1);
          if (oneIndex !== -1) {
            return {
              pileIndex: oneIndex,
              count: 1
            };
          }
        }
      }
    }
  } else if (gameType === 'staircase'){
    // For staircase, calculate nim sum of odd-indexed piles (1st, 3rd, 5th, etc.)
    const oddPilesNimSum = piles.reduce((sum, pile, index) => {
      // Only include piles at even indices (0, 2, 4, etc.) since these are 1st, 3rd, 5th piles
      if (index % 2 === 0) {
        return sum ^ pile;
      }
      return sum;
    }, 0);

    // If nim sum is not zero, we can make a winning move
    if (oddPilesNimSum !== 0) {
      // Look at odd-indexed piles to find a winning move
      for (let i = 0; i < piles.length; i += 2) {
        if (piles[i] === 0) continue;

        const targetSize = piles[i] ^ oddPilesNimSum;
        if (targetSize < piles[i]) {
          return {
            pileIndex: i,
            count: piles[i] - targetSize
          };
        }
      }
    }
  }
  
  // If in a losing position or no strategic move found, make a safe move
  const nonEmptyPiles = piles.map((pile, index) => ({ pile, index }))
                            .filter(({ pile }) => pile > 0);
  
  if (nonEmptyPiles.length === 0) {
    return { pileIndex: 0, count: 0 };
  }
  
  const randomPile = nonEmptyPiles[Math.floor(Math.random() * nonEmptyPiles.length)];
  return {
    pileIndex: randomPile.index,
    count: Math.max(1, Math.floor(Math.random() * randomPile.pile))
  };
};

export const getGameRules = (gameType) => {
  switch (gameType) {
    case "nim":
      return {
        title: "Classic Nim",
        description: "Remove any number of stones from a single pile. The player who takes the last stone wins.",
        strategy: "Try to make the nim-sum of all piles equal to zero after your move."
      };
    case "misere":
      return {
        title: "Misère Nim",
        description: "Remove any number of stones from a single pile. The player who takes the last stone loses.",
        strategy: "Play like normal Nim until the endgame, then leave an odd number of piles with one stone."
      };
    case "staircase":
      return {
        title: "Staircase Nim",
        description: "Remove any number of stones from a single pile. Stones cascade down to fill empty spaces below.",
        strategy: "Focus on maintaining balance in odd-numbered rows."
      };
    default:
      return {
        title: "Unknown Game",
        description: "Game type not recognized.",
        strategy: "No strategy available."
      };
  }
};
