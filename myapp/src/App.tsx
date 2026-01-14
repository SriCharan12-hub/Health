import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { useTheme } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

function App() {
  const { theme } = useTheme();

  return (
    <Theme 
      accentColor="indigo" 
      radius="large" 
      scaling="100%"
      appearance={theme}
    >
      <div className="min-h-screen  bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className='rounded-lg  bg-slate-100 dark:bg-slate-800 h-full'>
                    <HomePage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Theme>
  );
}

export default App;
