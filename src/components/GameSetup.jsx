import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  IconButton,
  Tooltip,
  Grid,
  GridItem,
  Icon,
  Container,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaPlay, FaDice, FaRandom } from 'react-icons/fa';
import { 
  GiStoneStack,
  GiWoodenCrate,
  GiTreasureMap,
  GiScrollUnfurled,
  GiWoodenSign,
  GiAbacus,
  GiDiceTwentyFacesTwenty,
} from 'react-icons/gi';
import { useState } from 'react';

const MotionBox = motion(Box);

// Game rules helper
const getGameRules = (gameType) => {
  switch (gameType) {
    case 'nim':
      return {
        title: "Classic Nim Setup",
        description: "Configure your piles for the traditional Nim game. Each pile represents a collection of stones that players can remove from.",
        icon: GiStoneStack,
      };
    case 'misere':
      return {
        title: "Misère Nim Setup",
        description: "Set up your piles for Misère Nim, where the last player to take a stone loses. Choose your pile sizes wisely!",
        icon: GiDiceTwentyFacesTwenty,
      };
    case 'staircase':
      return {
        title: "Staircase Nim Setup",
        description: "Create your staircase formation. Remember, removed stones cascade to previous piles in this variant.",
        icon: GiWoodenSign,
      };
    default:
      return {
        title: "Game Setup",
        description: "Configure your game piles",
        icon: GiStoneStack,
      };
  }
};

const PileConfig = ({ index, stones, onStoneChange, onRemove, maxStones = 15 }) => {
  const bgColor = useColorModeValue('parchment.50', 'woodBrown.800');
  const borderColor = useColorModeValue('woodBrown.200', 'woodBrown.700');
  const textColor = useColorModeValue('woodBrown.700', 'parchment.100');

  return (
    <MotionBox
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      bg={bgColor}
      p={6}
      borderRadius="xl"
      borderWidth="2px"
      borderColor={borderColor}
      boxShadow="lg"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: '1px',
        left: '1px',
        right: '1px',
        height: '30%',
        borderRadius: 'xl',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}
    >
      <VStack spacing={4}>
        <HStack justify="space-between" w="full">
          <Heading size="md" color={textColor} fontFamily="heading">
            Pile {index + 1}
          </Heading>
          <IconButton
            icon={<FaMinus />}
            onClick={onRemove}
            variant="ghost"
            colorScheme="red"
            aria-label="Remove pile"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </HStack>

        <Box w="full">
          <HStack spacing={4}>
            <VStack flex={1} align="stretch">
              <NumberInput
                value={stones}
                onChange={(_, value) => onStoneChange(value)}
                min={1}
                max={maxStones}
                size="lg"
              >
                <NumberInputField 
                  borderColor={borderColor}
                  _hover={{ borderColor: 'accent.400' }}
                  _focus={{ borderColor: 'accent.500', boxShadow: '0 0 0 1px var(--chakra-colors-accent-500)' }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper borderColor={borderColor} color={textColor} />
                  <NumberDecrementStepper borderColor={borderColor} color={textColor} />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
            <VStack spacing={0} align="center" justify="center" h="full">
              {[...Array(Math.min(stones, 5))].map((_, i) => (
                <Icon
                  key={i}
                  as={GiStoneStack}
                  boxSize={6 - i * 0.5}
                  color={useColorModeValue('woodBrown.500', 'woodBrown.300')}
                  transform={`translateY(-${i * 4}px)`}
                />
              ))}
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </MotionBox>
  );
};

const GameSetup = ({ gameType, onStartGame }) => {
  const [piles, setPiles] = useState([{ stones: 3 }]);
  const gameRules = getGameRules(gameType);
  const maxPiles = 5;
  const maxStones = 15;

  const addPile = () => {
    if (piles.length < maxPiles) {
      setPiles([...piles, { stones: 3 }]);
    }
  };

  const removePile = (index) => {
    setPiles(piles.filter((_, i) => i !== index));
  };

  const updatePile = (index, stones) => {
    const newPiles = [...piles];
    newPiles[index] = { stones: Number(stones) };
    setPiles(newPiles);
  };

  const generateRandomPiles = () => {
    const numPiles = Math.floor(Math.random() * (maxPiles - 2)) + 2;
    const newPiles = Array(numPiles).fill(null).map(() => ({
      stones: Math.floor(Math.random() * (maxStones - 1)) + 1
    }));
    setPiles(newPiles);
  };

  const handleStartGame = () => {
    onStartGame(piles.map(pile => pile.stones));
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8}>
        <Box variant="game-header" w="full" position="relative">
          <Box
            position="absolute"
            top={-6}
            left="50%"
            transform="translateX(-50%)"
            zIndex={1}
          >
            <Icon as={gameRules.icon} boxSize={12} color="accent.500" />
          </Box>
          
          <VStack spacing={4} pt={8}>
            <Heading variant="game-title" size="xl">
              {gameRules.title}
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue('woodBrown.600', 'parchment.200')}
              maxW="2xl"
              textAlign="center"
            >
              {gameRules.description}
            </Text>
          </VStack>
        </Box>

        <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6} w="full">
          <AnimatePresence mode="popLayout">
            {piles.map((pile, index) => (
              <GridItem key={index}>
                <PileConfig
                  index={index}
                  stones={pile.stones}
                  onStoneChange={(value) => updatePile(index, value)}
                  onRemove={() => removePile(index)}
                  maxStones={maxStones}
                />
              </GridItem>
            ))}
          </AnimatePresence>
        </Grid>

        <HStack spacing={4} justify="center" pt={4}>
          <Tooltip label="Add New Pile" placement="top">
            <Button
              leftIcon={<FaPlus />}
              onClick={addPile}
              isDisabled={piles.length >= maxPiles}
              variant="game-secondary"
            >
              Add Pile
            </Button>
          </Tooltip>
          
          <Tooltip label="Generate Random Setup" placement="top">
            <Button
              leftIcon={<FaDice />}
              onClick={generateRandomPiles}
              variant="game-secondary"
            >
              Random Setup
            </Button>
          </Tooltip>
        </HStack>

        <Button
          size="lg"
          rightIcon={<FaPlay />}
          onClick={handleStartGame}
          variant="game-primary"
          w={["full", "auto"]}
          px={12}
          isDisabled={piles.length < 2}
        >
          Start Game
        </Button>
      </VStack>
    </Container>
  );
};

export default GameSetup;
