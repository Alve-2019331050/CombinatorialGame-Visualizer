import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Tooltip,
  HStack,
  Container,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import { 
  GiStoneStack, 
  GiStonePile, 
  GiStoneBlock,
  GiStairsGoal,
  GiInvertedDice5,
  GiPerspectiveDiceSixFacesRandom,
  GiCrownedExplosion,
  GiTrophyCup,
} from 'react-icons/gi';

const GameCard = ({ game, onSelect, isSelected }) => {
  const bgGradient = useColorModeValue(
    isSelected ? 'linear(to-br, teal.50, blue.50)' : 'white',
    isSelected ? 'linear(to-br, teal.900, blue.900)' : 'gray.700'
  );
  const hoverBgGradient = useColorModeValue(
    'linear(to-br, teal.100, blue.100)',
    'linear(to-br, teal.800, blue.800)'
  );
  const borderColor = useColorModeValue(
    isSelected ? 'teal.400' : 'gray.200',
    isSelected ? 'teal.300' : 'gray.600'
  );
  const iconColor = useColorModeValue(
    isSelected ? 'teal.500' : 'gray.500',
    isSelected ? 'teal.300' : 'gray.400'
  );
  const headingColor = useColorModeValue(
    isSelected ? 'teal.600' : 'gray.700',
    isSelected ? 'teal.200' : 'white'
  );
  
  const getGameIcons = (type) => {
    switch (type) {
      case 'nim':
        return [
          { Icon: GiStoneStack, size: 12 },
          { Icon: GiTrophyCup, size: 14 },
          { Icon: GiStoneBlock, size: 12 },
        ];
      case 'misere':
        return [
          { Icon: GiInvertedDice5, size: 12 },
          { Icon: GiCrownedExplosion, size: 14 },
          { Icon: GiPerspectiveDiceSixFacesRandom, size: 12 },
        ];
      case 'staircase':
        return [
          { Icon: GiStoneStack, size: 12 },
          { Icon: GiStairsGoal, size: 14 },
          { Icon: GiStonePile, size: 12 },
        ];
      default:
        return [{ Icon: GiStoneStack, size: 12 }];
    }
  };

  const icons = getGameIcons(game.value);

  return (
    <Box
      as={motion.div}
      p={8}
      borderRadius="2xl"
      bgGradient={bgGradient}
      _hover={{
        bgGradient: hoverBgGradient,
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
      borderWidth="2px"
      borderColor={borderColor}
      cursor="pointer"
      onClick={() => onSelect(game.value)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      position="relative"
      h="full"
      minH="280px"
      boxShadow={isSelected ? 'lg' : 'md'}
    >
      <VStack spacing={6} align="center" h="full">
        <HStack spacing={4} justify="center" minH="100px">
          {icons.map(({ Icon: IconComponent, size }, index) => (
            <Icon
              key={index}
              as={IconComponent}
              boxSize={size}
              color={iconColor}
              transform={index === 1 ? 'translateY(-8px)' : 'none'}
              transition="all 0.3s"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          ))}
        </HStack>
        
        <VStack spacing={4} align="center" flex={1}>
          <Heading 
            size="lg" 
            color={headingColor}
            textAlign="center"
            fontWeight="bold"
          >
            {game.title}
          </Heading>
          <Text
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.300')}
            textAlign="center"
            noOfLines={2}
          >
            {game.description}
          </Text>
          <Tooltip
            label={
              <VStack spacing={3} p={3}>
                <Text fontWeight="bold">{game.title}</Text>
                <Text>{game.rules}</Text>
                <Text fontStyle="italic" color="teal.200">
                  {game.strategy}
                </Text>
              </VStack>
            }
            placement="top"
            hasArrow
            bg="gray.800"
            color="white"
            maxW="400px"
          >
            <Box 
              as={motion.div}
              whileHover={{ scale: 1.2 }}
              cursor="help"
              color={iconColor}
            >
              <Icon as={FaInfoCircle} boxSize={5} />
            </Box>
          </Tooltip>
        </VStack>
      </VStack>
    </Box>
  );
};

const GameLanding = ({ onGameSelect }) => {
  const games = [
    {
      value: 'nim',
      title: 'Classic Nim',
      description: 'Traditional game of strategy and skill',
      rules: 'Remove any number of stones from a single pile. The player who takes the last stone wins.',
      strategy: 'Master the art of nim-sum to dominate your opponent.',
    },
    {
      value: 'misere',
      title: 'Misère Nim',
      description: 'The twisted version of Classic Nim',
      rules: 'Remove any number of stones from a single pile. The player who takes the last stone loses.',
      strategy: 'Force your opponent to take the final stone.',
    },
    {
      value: 'staircase',
      title: 'Staircase Nim',
      description: 'A unique variant with directional constraints',
      rules: 'Remove stones only from left to right in each pile. The player who takes the last stone wins.',
      strategy: 'Control the flow by managing the staircase pattern.',
    },
  ];

  return (
    <Container maxW="7xl" py={12}>
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Heading
            size="2xl"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Combinatorial Game Visualizer
          </Heading>
          <Text
            fontSize="xl"
            color={useColorModeValue('gray.600', 'gray.300')}
            maxW="2xl"
          >
            Choose your game type and challenge yourself in this strategic battle of wits
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          w="full"
        >
          {games.map((game) => (
            <GameCard
              key={game.value}
              game={game}
              onSelect={onGameSelect}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default GameLanding;
