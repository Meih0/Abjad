import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import ErrorBoundary from '../Components/ErrorBoundary';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../Components/ToastContainer';

// Pages
import Landing from '../Pages/Landing';
import Home from '../Pages/Home';
import Assets from '../Pages/Assets';
import DigitalTwin from '../Pages/DigitalTwin';
import Marketplace from '../Pages/Marketplace';
import MyTasks from '../Pages/MyTasks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/Abjad">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* App Pages */}
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/assets" element={<Layout><Assets /></Layout>} />
            <Route path="/digital-twin" element={<Layout><DigitalTwin /></Layout>} />
            <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
            <Route path="/my-tasks" element={<Layout><MyTasks /></Layout>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
