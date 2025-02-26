import {
  Box,
  RadioGroup,
  Radio,
  HStack,
  useColorModeValue,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { FaChessKnight, FaChessQueen, FaChessRook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const GameTypeOption = ({ value, icon, label, isSelected, onClick }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const selectedBg = useColorModeValue('teal.50', 'teal.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const selectedBorder = useColorModeValue('teal.500', 'teal.300');

  return (
    <Tooltip label={label} placement="top" hasArrow>
      <Box
        as={motion.button}
        p={4}
        borderRadius="lg"
        bg={isSelected ? selectedBg : bgColor}
        borderWidth="2px"
        borderColor={isSelected ? selectedBorder : borderColor}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100px"
        h="100px"
        position="relative"
      >
        <Icon
          as={icon}
          boxSize={8}
          color={isSelected ? 'teal.500' : 'gray.500'}
        />
        <Radio
          value={value}
          position="absolute"
          opacity={0}
          aria-label={label}
        />
      </Box>
    </Tooltip>
  );
};

const GameConfig = ({ gameType, onGameTypeChange }) => {
  const gameTypes = [
    { value: 'nim', icon: FaChessKnight, label: 'Classic Nim' },
    { value: 'misere', icon: FaChessQueen, label: 'Misère Nim' },
    { value: 'staircase', icon: FaChessRook, label: 'Staircase Nim' },
  ];

  return (
    <Box w="100%" maxW="600px" p={4}>
      <RadioGroup value={gameType} onChange={onGameTypeChange}>
        <HStack spacing={6} justify="center">
          {gameTypes.map(({ value, icon, label }) => (
            <GameTypeOption
              key={value}
              value={value}
              icon={icon}
              label={label}
              isSelected={gameType === value}
              onClick={() => onGameTypeChange(value)}
            />
          ))}
        </HStack>
      </RadioGroup>
    </Box>
  );
};

export default GameConfig;
