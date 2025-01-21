import {AuthContextProvider} from './providers';
import Navigation from './navigation/navigation';

const App = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
