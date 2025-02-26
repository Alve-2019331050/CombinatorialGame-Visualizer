import {
  Box,
  Heading,
  HStack,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaRedo, FaUser, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';

const GameHeader = ({ gameType, currentPlayer, onReset }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const getGameTypeInfo = () => {
    switch (gameType) {
      case 'nim':
        return { label: 'Classic Nim', color: 'blue' };
      case 'misere':
        return { label: 'Misère Nim', color: 'purple' };
      case 'staircase':
        return { label: 'Staircase Nim', color: 'green' };
      default:
        return { label: 'Unknown Game', color: 'gray' };
    }
  };

  const gameTypeInfo = getGameTypeInfo();

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      _transition={{ duration: 0.5 }}
      p={6}
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      borderWidth="1px"
      borderColor={borderColor}
      width="100%"
      maxW="800px"
    >
      <HStack justify="space-between" align="center">
        <Box>
          <Badge
            as={motion.div}
            colorScheme={gameTypeInfo.color}
            fontSize="md"
            px={3}
            py={1}
            borderRadius="full"
            mb={2}
            whileHover={{ scale: 1.05 }}
            display="inline-block"
          >
            {gameTypeInfo.label}
          </Badge>
          <Heading size="lg" mb={2}>
            Combinatorial Game Visualizer
          </Heading>
          <HStack spacing={2}>
            <Text fontSize="lg">Current Turn:</Text>
            <HStack
              bg={currentPlayer === 'player' ? 'teal.100' : 'orange.100'}
              color={currentPlayer === 'player' ? 'teal.700' : 'orange.700'}
              px={3}
              py={1}
              borderRadius="md"
              spacing={2}
            >
              <Icon
                as={currentPlayer === 'player' ? FaUser : FaRobot}
                boxSize={5}
              />
              <Text fontWeight="bold">
                {currentPlayer === 'player' ? 'Your Turn' : "Computer's Turn"}
              </Text>
            </HStack>
          </HStack>
        </Box>
        <Button
          as={motion.button}
          leftIcon={<FaRedo />}
          variant="game-primary"
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Game
        </Button>
      </HStack>
    </Box>
  );
};

export default GameHeader;
