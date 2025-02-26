import {
  Box,
  VStack,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRedo } from 'react-icons/fa';

const GameControls = ({ winner, gameType, onReset }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = winner === 'player' ? 'green.500' : 'red.500';

  const getMessage = () => {
    if (gameType === 'misere') {
      return winner === 'player'
        ? "Congratulations! You made the computer take the last stone!"
        : "Game Over! You had to take the last stone.";
    }
    return winner === 'player'
      ? "Congratulations! You took the last stone!"
      : "Game Over! The computer took the last stone.";
  };

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        p={6}
        bg={bgColor}
        borderRadius="xl"
        boxShadow="xl"
        maxW="600px"
        w="100%"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={textColor}
          >
            {getMessage()}
          </Text>
          <Button
            as={motion.button}
            leftIcon={<FaRedo />}
            colorScheme={winner === 'player' ? 'green' : 'blue'}
            size="lg"
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default GameControls;
