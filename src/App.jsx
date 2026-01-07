import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import ErrorBoundary from '../Components/ErrorBoundary';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../Components/ToastContainer';

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
          <Layout />
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
