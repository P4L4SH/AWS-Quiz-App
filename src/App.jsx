import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Quiz from './Quiz';

Amplify.configure(awsExports);

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Authenticator>
        {({ signOut }) => (
          <main className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-screen">
              {/* Navigation Bar */}
              <nav className="w-full max-w-3xl bg-zinc-900 shadow-lg mb-8 p-8 rounded-lg flex justify-between items-center">
                
                  <h1 className="text-2xl font-bold text-white">Quiz App</h1>
                  <button 
                    onClick={signOut}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg 
                             transition-colors duration-200 ease-in-out font-medium
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Sign Out
                  </button>
                
              </nav>

              {/* Main Content Area */}
              <div className="w-full max-w-3xl bg-zinc-900 rounded-xl shadow-2xl p-10 mb-8">
                <div className="space-y-6">
                  {/* Quiz Component Container */}
                  
                    <Quiz />
                  
                </div>
              </div>

              {/* Footer */}
              <footer className="w-full text-center text-gray-400 py-4">
                <p>© 2025 Quiz App. All rights reserved.</p>
              </footer>
            </div>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

// Custom Authenticator Theme
const authTheme = {
  name: 'dark',
  tokens: {
    colors: {
      background: {
        primary: { value: '#000000' },
        secondary: { value: '#18181B' },
      },
      font: {
        interactive: { value: '#FFFFFF' },
      },
      brand: {
        primary: { value: '#3B82F6' },
      },
    },
  },
};

// Wrap the App component with authentication and custom theme
export default withAuthenticator(App, {
  components: {
    Header() {
      return (
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-white">Welcome to Quiz App</h1>
          <p className="text-gray-300 mt-2">Please sign in to continue</p>
        </div>
      );
    },
  },
  theme: authTheme,
});