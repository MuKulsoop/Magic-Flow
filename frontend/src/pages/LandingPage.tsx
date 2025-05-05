import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Users, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-900 to-blue-900 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Build Smart Contracts <span className="text-indigo-400">Without Code</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100 dark:text-gray-300">
              Create, deploy, and manage SUI blockchain smart contracts with a visual drag-and-drop interface. No coding experience required.
            </p>
            <div className="mt-10 flex justify-center">
              <Link to={isAuthenticated ? "/builder" : "/signup"}>
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight size={20} />}
                  className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg"
                >
                  {isAuthenticated ? "Start Building" : "Get Started Free"}
                </Button>
              </Link>
              <Link to="/documentation" className="ml-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent dark:from-gray-900 opacity-70 z-10 h-20 bottom-0"></div>
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg" 
                alt="SUI Builder Interface" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to build on SUI
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Our platform simplifies blockchain development so you can focus on creating value.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <Code className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">No-Code Builder</h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Create complex smart contracts with a visual interface. Drag, drop, and connect components to build your contract logic.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <Zap className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">One-Click Deployment</h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Deploy your smart contracts to the SUI blockchain with a single click. No command line or complex deployment processes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <Shield className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Built-in Security</h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Our templates follow best security practices and have undergone thorough testing to protect your assets and users.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Ready-Made Templates</h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Start with pre-built templates for common use cases like NFTs, token sales, voting systems, and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 dark:bg-indigo-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">Create your first smart contract today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to={isAuthenticated ? "/builder" : "/signup"}>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-indigo-50"
                >
                  {isAuthenticated ? "Go to Builder" : "Sign up for free"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};