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
  Flex,
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
  GiDiceTwentyFacesTwenty,
  GiTabletopPlayers,
  GiWoodenSign,
} from 'react-icons/gi';

const GameCard = ({ game, onSelect, isSelected }) => {
  const bgGradient = useColorModeValue(
    isSelected ? 'linear(to-br, parchment.50, woodBrown.50)' : 'white',
    isSelected ? 'linear(to-br, woodBrown.800, woodBrown.900)' : 'woodBrown.800'
  );
  const borderColor = useColorModeValue(
    isSelected ? 'woodBrown.400' : 'woodBrown.200',
    isSelected ? 'woodBrown.600' : 'woodBrown.700'
  );
  const iconColor = useColorModeValue(
    isSelected ? 'accent.500' : 'woodBrown.500',
    isSelected ? 'accent.300' : 'woodBrown.400'
  );
  const headingColor = useColorModeValue(
    isSelected ? 'woodBrown.700' : 'woodBrown.600',
    isSelected ? 'parchment.100' : 'parchment.200'
  );
  
  const getGameIcons = (type) => {
    switch (type) {
      case 'nim':
        return [
          { Icon: GiStoneStack, size: 12 },
          { Icon: GiTrophyCup, size: 14 },
          { Icon: GiTabletopPlayers, size: 12 },
        ];
      case 'misere':
        return [
          { Icon: GiInvertedDice5, size: 12 },
          { Icon: GiCrownedExplosion, size: 14 },
          { Icon: GiDiceTwentyFacesTwenty, size: 12 },
        ];
      case 'staircase':
        return [
          { Icon: GiStoneStack, size: 12 },
          { Icon: GiStairsGoal, size: 14 },
          { Icon: GiWoodenSign, size: 12 },
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
      borderWidth="2px"
      borderColor={borderColor}
      cursor="pointer"
      onClick={() => onSelect(game.value)}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      position="relative"
      h="full"
      minH="280px"
      variant="game-card"
      role="group"
    >
      <VStack spacing={6} align="center" h="full">
        <HStack spacing={4} justify="center" minH="100px">
          {icons.map(({ Icon: IconComponent, size }, index) => (
            <Box
              key={index}
              as={motion.div}
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                as={IconComponent}
                boxSize={size}
                color={iconColor}
                transform={index === 1 ? 'translateY(-8px)' : 'none'}
                transition="all 0.3s"
                _groupHover={{ color: 'accent.500' }}
              />
            </Box>
          ))}
        </HStack>
        
        <VStack spacing={4} align="center" flex={1}>
          <Heading 
            size="lg" 
            color={headingColor}
            textAlign="center"
            fontWeight="bold"
            fontFamily="heading"
          >
            {game.title}
          </Heading>
          <Text
            fontSize="md"
            color={useColorModeValue('woodBrown.600', 'parchment.300')}
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
                <Text fontStyle="italic" color="accent.200">
                  {game.strategy}
                </Text>
              </VStack>
            }
            placement="top"
            hasArrow
            bg="woodBrown.800"
            color="parchment.50"
            maxW="400px"
          >
            <Box 
              as={motion.div}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
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
      rules: 'Removed stones get added to the previous piles (if any). The player who takes the last stone wins.',
      strategy: 'Control the flow by managing the staircase pattern.',
    },
  ];

  return (
    <Container maxW="7xl" py={12}>
      <VStack spacing={12}>
        <Box variant="game-header" w="full" position="relative">
          <Box
            position="absolute"
            top={-6}
            left="50%"
            transform="translateX(-50%)"
            zIndex={1}
          >
            <HStack spacing={4} justify="center">
              <Icon as={GiDiceTwentyFacesTwenty} boxSize={8} color="accent.500" />
              <Icon as={GiTrophyCup} boxSize={10} color="accent.400" />
              <Icon as={GiTabletopPlayers} boxSize={8} color="accent.500" />
            </HStack>
          </Box>
          
          <VStack spacing={4} textAlign="center" pt={8}>
            <Heading
              variant="game-title"
              bgGradient="linear(to-r, woodBrown.600, accent.500, woodBrown.600)"
              bgClip="text"
              pb={2}
            >
              Combinatorial Game Visualizer
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue('woodBrown.600', 'parchment.200')}
              maxW="2xl"
              fontFamily="body"
            >
              Choose your game type and challenge yourself in this strategic battle of wits
            </Text>
          </VStack>
        </Box>

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
