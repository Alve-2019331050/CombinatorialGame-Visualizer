import { extendTheme } from '@chakra-ui/react';

// Custom color palette inspired by classic board games
const colors = {
  woodBrown: {
    50: '#faf4eb',
    100: '#f1e4d4',
    200: '#e6d0b7',
    300: '#d4b38e',
    400: '#c19165',
    500: '#8B4513', // Deep wood brown
    600: '#6d3f1d',
    700: '#4f2d15',
    800: '#321c0e',
    900: '#1a0f07',
  },
  parchment: {
    50: '#fefdf9',
    100: '#f8f1e4',
    200: '#f3e4c8',
    300: '#e9d1a7',
    400: '#deb77d',
    500: '#d4a35f',
    600: '#b88947',
    700: '#8c6535',
    800: '#5f4424',
    900: '#332412',
  },
  accent: {
    50: '#e5f6ff',
    100: '#b8e4ff',
    200: '#8ad2ff',
    300: '#5cbfff',
    400: '#2eadff',
    500: '#148fe6',
    600: '#0a6fb4',
    700: '#045082',
    800: '#003151',
    900: '#001221',
  }
};

// Wood grain texture for backgrounds
const woodGrainLight = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"), linear-gradient(to right, rgba(139, 69, 19, 0.05), rgba(139, 69, 19, 0.1))`;

const woodGrainDark = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E"), linear-gradient(to right, rgba(160, 82, 45, 0.1), rgba(160, 82, 45, 0.15))`;

const BoardGameTheme = extendTheme({
  styles: {
    global: (props) => ({
      '@import': "url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Permanent+Marker&display=swap')",
      body: {
        bg: props.colorMode === 'dark' ? 'woodBrown.900' : 'parchment.100',
        backgroundImage: props.colorMode === 'dark' ? woodGrainDark : woodGrainLight,
        color: props.colorMode === 'dark' ? 'parchment.100' : 'woodBrown.800',
        fontFamily: "'Crimson Pro', serif",
      },
    }),
  },
  fonts: {
    heading: "'Permanent Marker', cursive",
    body: "'Crimson Pro', serif",
  },
  components: {
    Button: {
      variants: {
        'game-primary': {
          bg: 'woodBrown.500',
          color: 'parchment.50',
          fontFamily: "'Crimson Pro', serif",
          fontWeight: 'bold',
          fontSize: 'lg',
          px: 6,
          py: 4,
          _hover: {
            bg: 'woodBrown.400',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
          _active: {
            bg: 'woodBrown.600',
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
        'game-secondary': {
          bg: 'transparent',
          color: 'woodBrown.500',
          border: '2px solid',
          borderColor: 'woodBrown.500',
          fontFamily: "'Crimson Pro', serif",
          fontWeight: 'bold',
          _hover: {
            bg: 'woodBrown.50',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          _active: {
            bg: 'woodBrown.100',
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Badge: {
      variants: {
        'board-game': {
          bg: 'woodBrown.100',
          color: 'woodBrown.700',
          px: 4,
          py: 2,
          borderRadius: 'full',
          fontSize: 'md',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid',
          borderColor: 'woodBrown.200',
        },
      },
    },
    Heading: {
      variants: {
        'game-title': {
          fontFamily: "'Permanent Marker', cursive",
          fontSize: ['4xl', '5xl', '6xl'],
          color: 'woodBrown.700',
          textAlign: 'center',
          letterSpacing: '1px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          position: 'relative',
          _before: {
            content: '""',
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, woodBrown.400, transparent)',
          },
          _after: {
            content: '""',
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, woodBrown.300, transparent)',
          },
        },
        'game-subtitle': {
          fontFamily: "'Crimson Pro', serif",
          fontSize: ['xl', '2xl'],
          color: 'woodBrown.600',
          textAlign: 'center',
          letterSpacing: '2px',
          fontWeight: 'medium',
        },
      },
    },
    Box: {
      variants: {
        'game-card': {
          bg: props => props.colorMode === 'dark' ? 'rgba(244, 230, 211, 0.05)' : 'rgba(139, 69, 19, 0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'xl',
          p: 8,
          border: '1px solid',
          borderColor: props => props.colorMode === 'dark' ? 'woodBrown.700' : 'woodBrown.200',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          _before: {
            content: '""',
            position: 'absolute',
            top: '1px',
            left: '1px',
            right: '1px',
            height: '30%',
            borderRadius: 'xl',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
            pointerEvents: 'none',
          },
          _hover: {
            transform: 'translateY(-4px) scale(1.02)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
            borderColor: props => props.colorMode === 'dark' ? 'woodBrown.600' : 'woodBrown.300',
          },
        },
        'game-header': {
          textAlign: 'center',
          py: [8, 12],
          px: [4, 6],
          position: 'relative',
          _before: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            height: '100%',
            background: props => props.colorMode === 'dark' 
              ? 'linear-gradient(180deg, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%)'
              : 'linear-gradient(180deg, rgba(244, 230, 211, 0.8) 0%, rgba(244, 230, 211, 0.4) 100%)',
            borderRadius: 'xl',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            zIndex: -1,
          },
        },
      },
    },
  },
  colors,
});

export default BoardGameTheme;
