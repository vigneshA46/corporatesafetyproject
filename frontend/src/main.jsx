import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <App/>
  </MantineProvider>
)
