import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from './context/ThemeContext';
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
