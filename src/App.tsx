import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './navigation/navigation';
import { AuthContextProvider } from './providers';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
