import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store'
import { Provider } from 'react-redux'
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Theme accentColor="indigo" radius="large" scaling="100%">
        <App />
      </Theme>
    </Provider>
  </StrictMode>,
)
