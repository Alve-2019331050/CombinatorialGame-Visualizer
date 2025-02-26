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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Grid,
  GridItem,
  useBreakpointValue,
  Badge,
  Container,
  Icon,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaDice, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import { GiStoneStack } from 'react-icons/gi';
import { useState } from 'react';

// Game rules helper
const getGameRules = (gameType) => {
  const rules = {
    nim: {
      description: "Remove any number of stones from a single pile. The player who takes the last stone wins.",
      strategy: "Try to leave your opponent with a nim-sum of zero.",
    },
    misere: {
      description: "Remove any number of stones from a single pile. The player who takes the last stone loses.",
      strategy: "Try to leave your opponent with a single pile of size 1.",
    },
    staircase: {
      description: "Remove stones from left to right. The player who takes the last stone wins.",
      strategy: "Focus on creating winning positions by controlling the step pattern.",
    },
  };
  return rules[gameType] || rules.nim;
};

const PileConfig = ({ index, stones, onStoneChange, onRemove, maxStones = 15 }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const stoneColor = useColorModeValue('teal.500', 'teal.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      p={4}
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      borderWidth="1px"
      borderColor={borderColor}
      position="relative"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
      _transition="all 0.2s"
    >
      <VStack spacing={4}>
        <HStack spacing={4} align="center" w="full">
          <Badge
            colorScheme="teal"
            fontSize="md"
            px={3}
            py={1}
            borderRadius="full"
          >
            Pile {index + 1}
          </Badge>
          <Tooltip label="Remove pile" placement="top">
            <IconButton
              size="sm"
              icon={<FaMinus />}
              onClick={onRemove}
              colorScheme="red"
              variant="ghost"
              ml="auto"
            />
          </Tooltip>
        </HStack>
        
        <Box w="full" position="relative">
          <VStack spacing={4}>
            <HStack spacing={2} w="full" justify="center" minH="40px">
              {[...Array(stones)].map((_, i) => (
                <Box
                  key={i}
                  as={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <Icon as={GiStoneStack} boxSize={6} color={stoneColor} />
                </Box>
              ))}
            </HStack>
            
            <Slider
              value={stones}
              min={1}
              max={maxStones}
              onChange={onStoneChange}
              colorScheme="teal"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Box color="teal.500" as={FaDice} />
              </SliderThumb>
            </Slider>
            
            <HStack spacing={4} w="full" justify="center">
              <NumberInput
                value={stones}
                min={1}
                max={maxStones}
                onChange={(_, num) => onStoneChange(num)}
                size="sm"
                maxW={24}
              >
                <NumberInputField textAlign="center" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                stones
              </Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

const GameSetup = ({ gameType, onStartGame }) => {
  const [piles, setPiles] = useState([3, 5, 7]);
  const maxPiles = 7;
  const maxStones = 15;
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  const handleAddPile = () => {
    if (piles.length < maxPiles) {
      setPiles([...piles, Math.floor(Math.random() * (maxStones - 1)) + 1]);
    }
  };

  const handleRemovePile = (index) => {
    if (piles.length > 1) {
      setPiles(piles.filter((_, i) => i !== index));
    }
  };

  const handleStoneChange = (index, value) => {
    const newPiles = [...piles];
    newPiles[index] = value;
    setPiles(newPiles);
  };

  const handleRandomize = () => {
    const newPiles = piles.map(() => 
      Math.floor(Math.random() * (maxStones - 1)) + 1
    );
    setPiles(newPiles);
  };

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      py={8}
      backgroundImage={useColorModeValue(
        "radial-gradient(circle at 1px 1px, gray.200 1px, transparent 0)",
        "radial-gradient(circle at 1px 1px, gray.700 1px, transparent 0)"
      )}
      backgroundSize="40px 40px"
      position="relative"
    >
      <Container maxW="7xl">
        <VStack spacing={8}>
          <Box
            p={8}
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="xl"
            w="full"
            textAlign="center"
          >
            <VStack spacing={4}>
              <Heading
                size="xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                bgClip="text"
              >
                Game Setup
              </Heading>
              <HStack spacing={2}>
                <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                  Configuring
                </Text>
                <Badge
                  colorScheme="teal"
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {gameType === 'nim' ? 'Classic' : gameType === 'misere' ? 'Misère' : 'Staircase'} Nim
                </Badge>
              </HStack>
              <Tooltip
                label={
                  <VStack p={2} spacing={2}>
                    <Text fontWeight="bold">Game Rules</Text>
                    <Text>{getGameRules(gameType).description}</Text>
                    <Text fontStyle="italic" color="teal.200">
                      {getGameRules(gameType).strategy}
                    </Text>
                  </VStack>
                }
                placement="bottom"
                hasArrow
              >
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<FaInfoCircle />}
                  colorScheme="teal"
                >
                  View Rules
                </Button>
              </Tooltip>
            </VStack>
          </Box>

          <Grid
            templateColumns={`repeat(${columns}, 1fr)`}
            gap={6}
            w="full"
            px={4}
          >
            <AnimatePresence>
              {piles.map((stones, index) => (
                <GridItem key={index}>
                  <PileConfig
                    index={index}
                    stones={stones}
                    onStoneChange={(value) => handleStoneChange(index, value)}
                    onRemove={() => handleRemovePile(index)}
                    maxStones={maxStones}
                  />
                </GridItem>
              ))}
            </AnimatePresence>
          </Grid>

          <Box
            p={6}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="lg"
            w="full"
            position="sticky"
            bottom={4}
          >
            <HStack spacing={4} justify="center">
              <Tooltip label={piles.length >= maxPiles ? 'Maximum piles reached' : 'Add new pile'}>
                <IconButton
                  icon={<FaPlus />}
                  onClick={handleAddPile}
                  isDisabled={piles.length >= maxPiles}
                  colorScheme="teal"
                  variant="outline"
                  size="lg"
                />
              </Tooltip>
              <Button
                leftIcon={<FaDice />}
                onClick={handleRandomize}
                colorScheme="purple"
                variant="outline"
                size="lg"
              >
                Randomize
              </Button>
              <Button
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                rightIcon={<FaArrowRight />}
                onClick={() => onStartGame(piles)}
                colorScheme="teal"
                size="lg"
              >
                Start Game
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default GameSetup;
