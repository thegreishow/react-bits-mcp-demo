import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            React Bits MCP Demo
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            A simple one-page website demonstrating React Bits integration
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
            >
              Get Started
            </button>
            <button 
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            What is React Bits MCP?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-4 text-2xl">🔌</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Model Context Protocol</h3>
              <p className="text-gray-600">
                React Bits uses MCP to provide a standardized way to share UI components across different frameworks and tools.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-green-500 mb-4 text-2xl">🧩</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Reusable Components</h3>
              <p className="text-gray-600">
                Access a growing library of production-ready UI components that you can instantly use in your projects.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-purple-500 mb-4 text-2xl">⚡</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Instant Integration</h3>
              <p className="text-gray-600">
                Add components to your project with zero configuration - just copy and paste.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Example Components
          </h2>
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Button Component</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Primary Button
                </button>
                <button 
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Outline Button
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Success Button
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                These buttons would be fetched from the React Bits MCP registry at: 
                <code className="bg-gray-100 px-1 rounded">https://reactbits.dev/r/button.json</code>
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Card Component</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-indigo-500 mb-2 text-2xl">📄</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Component Documentation</h4>
                    <p className="text-gray-600">
                      Learn how to use React Bits components in your projects with clear examples and API documentation.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                This card would be fetched from: 
                <code className="bg-gray-100 px-1 rounded">https://reactbits.dev/r/card.json</code>
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Get Started with React Bits MCP
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <ol className="list-decimal list-inside space-y-4 text-left text-gray-700">
                <li className="mb-2">
                  Install the shadcn-ui MCP tools: <code className="bg-gray-100 px-1 rounded">npx shadcn@latest</code>
                </li>
                <li className="mb-2">
                  Add the React Bits registry to your components.json:
                  <div className="mt-1 bg-gray-50 p-3 rounded mb-2">
                    <code className="text-sm block">{
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}</code>
                  </div>
                </li>
                <li className="mb-2">
                  Add components to your project: 
                  <code className="bg-gray-100 px-1 rounded">npx shadcn@latest add @react-bits/button</code>
                </li>
                <li>
                  Use the component in your React code:
                  <div className="mt-1 bg-gray-50 p-3 rounded">
                    <code className="text-sm block">import { Button } from "@/components/ui/button";</code>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white/90 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg mb-4">
            Built with ❤️ using React, Vite, Tailwind CSS, and React Bits MCP
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-white">Documentation</a>
            <a href="#" className="hover:text-white">Components</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </div>
          <p className="mt-6 text-xs text-white/60">
            © 2026 React Bits MCP Demo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;