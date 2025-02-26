import {
  Box,
  SimpleGrid,
  VStack,
  Circle,
  useColorModeValue,
  Container,
  Grid,
  GridItem,
  Badge,
  HStack,
  Button,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUndo, FaArrowRight } from 'react-icons/fa';
import { GiStoneStack } from 'react-icons/gi';
import { useState } from 'react';

const StoneIcon = ({ isSelected, isDisabled, onClick }) => {
  const stoneColor = useColorModeValue('woodBrown.500', 'woodBrown.300');
  const hoverColor = useColorModeValue('cyan.500', 'cyan.300');
  const disabledColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box
      as={motion.div}
      whileHover={!isDisabled && { scale: 1.1 }}
      whileTap={!isDisabled && { scale: 0.95 }}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      onClick={!isDisabled ? onClick : undefined}
      opacity={isDisabled ? 0.5 : 1}
      _transition="all 0.2s"
    >
      <Icon
        as={GiStoneStack}
        boxSize={8}
        color={isDisabled ? disabledColor : isSelected ? hoverColor : stoneColor}
        transform={isSelected ? 'translateY(-4px)' : 'none'}
        filter={isSelected ? 'drop-shadow(0 4px 2px rgba(0,0,0,0.2))' : 'none'}
        transition="all 0.2s"
      />
    </Box>
  );
};

const PileDisplay = ({ index, stones, selectedStones, onStoneClick, isActive, currentPlayer }) => {
  const bgColor = useColorModeValue('parchment.50', 'woodBrown.800');
  const borderColor = useColorModeValue('woodBrown.200', 'woodBrown.700');
  const activeBorderColor = useColorModeValue('woodBrown.700', 'parchment.100');

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      p={6}
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      borderWidth="2px"
      borderColor={isActive ? activeBorderColor : borderColor}
      position="relative"
      _hover={{ transform: stones > 0 && currentPlayer === 'player' ? 'translateY(-2px)' : 'none' }}
      _transition="all 0.2s"
      opacity={stones === 0 || currentPlayer !== 'player' ? 0.6 : 1}
      cursor={stones === 0 || currentPlayer !== 'player' ? 'not-allowed' : 'pointer'}
    >
      <VStack spacing={4}>
        <HStack spacing={2} justify="space-between" w="full">
          <Badge
            colorScheme={stones === 0 ? 'gray' : 'woodBrown'}
            fontSize="md"
            px={3}
            py={1}
            borderRadius="full"
          >
            Pile {index + 1}
          </Badge>
          <Badge
            colorScheme={stones === 0 ? 'red' : 'woodBrown'}
            variant="subtle"
            fontSize="sm"
          >
            {stones === 0 ? 'Empty' : `${stones} stones`}
          </Badge>
        </HStack>

        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={2}
          w="full"
          minH="120px"
          alignItems="center"
          justifyItems="center"
        >
          <AnimatePresence mode="popLayout">
            {[...Array(stones)].map((_, i) => (
              <GridItem key={i}>
                <StoneIcon
                  isSelected={selectedStones.includes(i)}
                  isDisabled={stones === 0 || !isActive || currentPlayer !== 'player'}
                  onClick={() => onStoneClick(index, i)}
                />
              </GridItem>
            ))}
          </AnimatePresence>
        </Grid>
      </VStack>
    </Box>
  );
};

const GameBoard = ({ piles, onMove, currentPlayer, gameType }) => {
  const [selectedPile, setSelectedPile] = useState(null);
  const [selectedStones, setSelectedStones] = useState([]);
  const toast = useToast();

  const handleStoneClick = (pileIndex, stoneIndex) => {
    if (currentPlayer !== 'player') {
      toast({
        title: "Not Your Turn",
        description: "Please wait for your turn",
        status: "warning",
        duration: 2000,
      });
      return;
    }

    if (selectedPile !== null && selectedPile !== pileIndex) {
      toast({
        title: "Invalid Selection",
        description: "You can only select stones from one pile at a time",
        status: "warning",
        duration: 2000,
      });
      return;
    }

    setSelectedPile(pileIndex);
    setSelectedStones(prev => {
      const newSelection = [...prev];
      const stoneIdx = newSelection.indexOf(stoneIndex);
      
      if (stoneIdx === -1) {
        // Add stone
        if (gameType === 'staircase') {
          // For staircase, allow selecting any stones in the pile
          newSelection.push(stoneIndex);
        } else {
          newSelection.push(stoneIndex);
        }
      } else {
        // Remove stone and all stones after it
        newSelection.splice(stoneIdx, newSelection.length - stoneIdx);
      }
      
      return newSelection.sort((a, b) => a - b);
    });
  };

  const handleMove = () => {
    if (selectedPile === null || selectedStones.length === 0) {
      toast({
        title: "Invalid Move",
        description: "Please select stones to remove",
        status: "warning",
        duration: 2000,
      });
      return;
    }

    if (gameType === 'staircase' && selectedPile > 0) {
      // For staircase, if not the first pile, add removed stones to previous pile
      // We need to make two moves: remove from current pile and add to previous pile
      const stonesToMove = selectedStones.length;
      onMove(selectedPile, stonesToMove, true); // true indicates this is a staircase move
    } else {
      // For normal moves or first pile in staircase
      onMove(selectedPile, selectedStones.length);
    }

    setSelectedPile(null);
    setSelectedStones([]);
  };

  const handleReset = () => {
    setSelectedPile(null);
    setSelectedStones([]);
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8}>
        <Grid
          templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
          gap={6}
          w="full"
        >
          {piles.map((stones, index) => (
            <GridItem key={index}>
              <PileDisplay
                index={index}
                stones={stones}
                selectedStones={selectedPile === index ? selectedStones : []}
                onStoneClick={handleStoneClick}
                isActive={stones > 0 && (selectedPile === null || selectedPile === index)}
                currentPlayer={currentPlayer}
              />
            </GridItem>
          ))}
        </Grid>

        <HStack spacing={4} justify="center" w="full">
          <Button
            leftIcon={<FaUndo />}
            onClick={handleReset}
            isDisabled={selectedStones.length === 0 || currentPlayer !== 'player'}
            colorScheme="gray"
            variant="outline"
          >
            Reset Selection
          </Button>
          <Button
            rightIcon={<FaArrowRight />}
            onClick={handleMove}
            isDisabled={selectedStones.length === 0 || currentPlayer !== 'player'}
            variant="game-primary"
            size="lg"
          >
            Remove {selectedStones.length} {selectedStones.length === 1 ? 'Stone' : 'Stones'}
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default GameBoard;
