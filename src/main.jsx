import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './components/App'
import BoardGameTheme from './theme/BoardGameTheme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={BoardGameTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
