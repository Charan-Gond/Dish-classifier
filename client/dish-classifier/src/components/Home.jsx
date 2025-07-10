import React, { useState, useEffect } from 'react';
import { Key, User, LogOut, Eye, EyeOff, Copy, Check, ChefHat } from 'lucide-react';
import '../index.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedApiKey = localStorage.getItem('apiKey');
    
    if (storedUser && storedApiKey) {
      setUser(JSON.parse(storedUser));
      setApiKey(storedApiKey);
    }
  }, []);

  const handleLogin = (userData, userApiKey) => {
    setUser(userData);
    setApiKey(userApiKey);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('apiKey', userApiKey);
  };

  const handleSignup = (userData, userApiKey) => {
    setUser(userData);
    setApiKey(userApiKey);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('apiKey', userApiKey);
  };

  const handleSignout = () => {
    setUser(null);
    setApiKey('');
    localStorage.removeItem('user');
    localStorage.removeItem('apiKey');
  };

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy API key:', err);
    }
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Dish-classifier</h1>
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleSignout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {user ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                Welcome back, {user.username}!
              </h2>
              <p className="text-xl text-gray-600">
                Your AI-powered dish classification API is ready to use
              </p>
            </div>

            {/* API Key Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
              <div className="flex items-center space-x-3 mb-6">
                <Key className="h-6 w-6 text-orange-500" />
                <h3 className="text-2xl font-semibold text-gray-800">Your API Key</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 font-mono text-sm text-gray-700 break-all">
                    {showApiKey ? apiKey : '•'.repeat(apiKey.length)}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={toggleApiKeyVisibility}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                      title={showApiKey ? 'Hide API Key' : 'Show API Key'}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={copyApiKey}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                      title="Copy to Clipboard"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {copied && (
                <p className="text-green-600 text-sm mt-2">✓ API key copied to clipboard!</p>
              )}
            </div>

            {/* Usage Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">How to Use Your API</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-3">1. Authentication</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-100 overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.dish-classifier.com/classify \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"image_url": "https://example.com/dish.jpg"}'`}
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-3">2. JavaScript Example</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-100 overflow-x-auto">
                    <code>
                      {`const response = await fetch('https://api.dish-classifier.com/classify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_url: 'https://example.com/dish.jpg'
  })
});

const result = await response.json();
console.log('Dish classification:', result);`}
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-3">3. Response Format</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-100 overflow-x-auto">
                    <code>
                      {`{
  "dish_name": "Spaghetti Carbonara",
  "confidence": 0.95,
  "cuisine": "Italian",
  "ingredients": ["pasta", "eggs", "cheese", "bacon"],
  "nutritional_info": {
    "calories": 350,
    "protein": 15,
    "carbs": 45,
    "fat": 12
  }
}`}
                    </code>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">Rate Limits</h4>
                  <p className="text-blue-700">
                    Your current plan allows up to 1,000 requests per month. 
                    Need more? <a href="#" className="underline hover:text-blue-900">Upgrade your plan</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Unauthenticated User View
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                Welcome to Dish-classifier
              </h2>
              <p className="text-xl text-gray-600">
                Classify any dish with our powerful AI-powered API
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-orange-100 rounded-full mb-4">
                    <ChefHat className="h-12 w-12 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Get Started Today
                  </h3>
                  <p className="text-gray-600">
                    Sign up or log in to get your API key and start classifying dishes instantly
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      console.log('Navigate to signup');
                    }}
                    className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      console.log('Navigate to login');
                    }}
                    className="px-8 py-3 bg-white text-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-lg p-6 shadow-md border border-orange-100">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">99% Accuracy</h4>
                  <p className="text-gray-600">State-of-the-art AI models trained on millions of dishes</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-orange-100">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                    <Key className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Easy Integration</h4>
                  <p className="text-gray-600">Simple REST API with comprehensive documentation</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-orange-100">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-purple-100 rounded-full mb-4">
                    <User className="h-6 w-6 text-purple-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Free Tier</h4>
                  <p className="text-gray-600">1,000 free requests per month to get you started</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-orange-500 rounded-lg">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Dish-classifier</span>
            </div>

            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-orange-300 transition-colors">Documentation</a>
              <a href="#" className="hover:text-orange-300 transition-colors">Support</a>
              <a href="#" className="hover:text-orange-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-300 transition-colors">Terms</a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2025 Dish-classifier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
