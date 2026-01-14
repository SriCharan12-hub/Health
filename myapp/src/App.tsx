import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

import { Toaster } from 'react-hot-toast';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

function App() {
  return (
    <Theme 
      accentColor="indigo" 
      radius="large" 
      scaling="100%"
    >
      <div className="min-h-screen w-full bg-gray-50 text-gray-900">
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
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
