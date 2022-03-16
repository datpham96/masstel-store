import React from 'react';
import {Text, TextInput} from 'react-native';

import Navigation from './src/navigation';
import {QueryClient, QueryClientProvider} from 'react-query';

//fix text not scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
