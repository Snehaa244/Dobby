import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import { 
  Folder, Upload, BarChart3, Shield, ArrowRight, 
  HardDrive, Zap, Layers, Image, CheckCircle, 
  ChevronRight, Star 
} from 'lucide-react';

export default function Landing() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAuthClick = (mode) => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthMode(mode);
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    navigate('/dashboard');
  };

  const features = [
    {
      icon: <Folder className="w-6 h-6" />,
      title: 'Nested Folders',
      description: 'Create unlimited folder hierarchies to organize your images exactly how you want.'
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Quick Uploads',
      description: 'Drag and drop images instantly. Our smart compression keeps your storage efficient.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Storage Analytics',
      description: 'Automatic tracking of storage usage per folder with detailed insights.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Access',
      description: 'Private by default. Your images are protected with user authentication.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create your account',
      description: 'Sign up in seconds with just your email. No credit card required.'
    },
    {
      number: '02',
      title: 'Build your folder structure',
      description: 'Create nested folders to organize your projects and campaigns.'
    },
    {
      number: '03',
      title: 'Upload and manage',
      description: 'Drag and drop images, track storage, and keep everything organized.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-pink-50 text-slate-900">
      <Navbar onAuthClick={handleAuthClick} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left - Text Content */}
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 mb-6">
                <Zap size={14} />
                <span>Image Management Reimagined</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                Organize your images with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  intelligent workflows
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                Build nested folders, upload images in seconds, and keep every project tidy with automatic storage tracking and secure user access.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 transition-all duration-200 group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleAuthClick('login')}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card</span>
                </div>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className={`relative transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative">
                {/* Main dashboard mockup */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/50">
                  {/* Mock header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <HardDrive className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Drive</p>
                        <p className="text-xs text-slate-500">Image Manager</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                    </div>
                  </div>
                  
                  {/* Mock sidebar */}
                  <div className="flex gap-4">
                    <div className="w-1/4 space-y-2">
                      <div className="h-8 rounded-lg bg-indigo-50 px-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-medium text-indigo-700">All Files</span>
                      </div>
                      <div className="h-8 rounded-lg px-3 flex items-center gap-2">
                        <Folder className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-600">Projects</span>
                      </div>
                      <div className="h-8 rounded-lg px-3 flex items-center gap-2">
                        <Folder className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-600">Campaigns</span>
                      </div>
                      <div className="h-8 rounded-lg px-3 flex items-center gap-2">
                        <Image className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-600">Assets</span>
                      </div>
                    </div>
                    
                    {/* Mock content area */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Recent Files</h3>
                        <button className="text-xs text-indigo-600 font-medium">View all</button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="aspect-square rounded-xl bg-slate-100 overflow-hidden">
                            <div className={`w-full h-full bg-gradient-to-br ${i % 2 === 0 ? 'from-indigo-200 to-purple-200' : 'from-cyan-200 to-blue-200'}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -right-4 top-8 rounded-2xl bg-white p-4 shadow-xl shadow-slate-200/50 border border-slate-100 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Upload Complete</p>
                      <p className="text-xs text-slate-500">12 images uploaded</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 bottom-8 rounded-2xl bg-white p-4 shadow-xl shadow-slate-200/50 border border-slate-100 animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">2.4 GB used</p>
                      <p className="text-xs text-slate-500">This month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28 bg-gradient-to-br from-white via-indigo-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight text-indigo-700 sm:text-5xl drop-shadow-lg">
              Everything you need to manage images
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Powerful features designed for creators, marketers, and teams who care about organization.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 border-2 border-indigo-100 shadow-md hover:shadow-xl hover:shadow-indigo-200/40 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 via-pink-400 to-teal-300 flex items-center justify-center text-white text-xl mb-5 shadow-lg group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2 drop-shadow-sm">{feature.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MCP Section */}
      <section id="mcp" className="py-24 lg:py-32 bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-80 bg-gradient-to-br from-pink-100/40 via-indigo-100/20 to-white/10 rounded-full blur-3xl opacity-60" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-100 via-pink-100 to-teal-100 text-pink-600 font-semibold text-base shadow-md mb-4 animate-fade-in">
              <Zap className="w-5 h-5 text-indigo-500 animate-pulse" />
              <span>AI Automation with MCP</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-indigo-600 to-teal-500 drop-shadow-lg mb-4">
              What is MCP?
            </h2>
            <p className="mt-4 text-lg text-slate-600 font-medium">
              <span className="font-semibold text-indigo-600">Model Context Protocol (MCP)</span> lets you connect AI agents and automation tools directly to DobbyDrive.<br className="hidden sm:block" />
              Automate uploads, folder creation, and more—using natural language or code.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {/* How to use MCP */}
            <div className="bg-white rounded-3xl p-10 border-2 border-pink-100 shadow-xl flex flex-col items-start relative overflow-hidden animate-fade-in">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-pink-200/40 to-indigo-200/40 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-pink-500 bg-pink-100 rounded-xl p-1.5 shadow" />
                <h3 className="text-2xl font-bold text-indigo-700">How to use MCP</h3>
              </div>
              <ul className="space-y-4 mt-2 w-full">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-slate-700 text-base font-medium">Connect your favorite AI agent or automation tool to the DobbyDrive MCP server.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-slate-700 text-base font-medium">Use natural language or code to automate tasks: <span className="text-pink-500 font-semibold">"Upload all images from my desktop to the 'Projects' folder"</span>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-slate-700 text-base font-medium">Access all your folders, images, and storage analytics programmatically.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-slate-700 text-base font-medium">Integrate DobbyDrive with other apps, bots, or workflows—no manual clicking needed!</span>
                </li>
              </ul>
            </div>
            {/* Why use MCP */}
            <div className="bg-white rounded-3xl p-10 border-2 border-indigo-100 shadow-xl flex flex-col items-start relative overflow-hidden animate-fade-in">
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-indigo-200/40 to-pink-200/40 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8 text-indigo-500 bg-indigo-100 rounded-xl p-1.5 shadow" />
                <h3 className="text-2xl font-bold text-pink-600">Why use MCP?</h3>
              </div>
              <ul className="space-y-4 mt-2 w-full">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-slate-700 text-base font-medium"><span className="font-semibold text-indigo-600">Supercharge productivity:</span> Let AI handle repetitive image management tasks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-slate-700 text-base font-medium"><span className="font-semibold text-pink-500">Seamless automation:</span> Integrate DobbyDrive with your creative, marketing, or dev workflows.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-slate-700 text-base font-medium"><span className="font-semibold text-indigo-600">Open & flexible:</span> Works with any MCP-compatible agent, script, or tool.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-slate-700 text-base font-medium"><span className="font-semibold text-pink-500">Future-ready:</span> Stay ahead with AI-powered file management and automation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-br from-white via-teal-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight text-indigo-700 sm:text-5xl drop-shadow-lg">
              Get started in minutes
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Three simple steps to organize your images like a pro.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-10 border-2 border-indigo-100 shadow-md hover:shadow-xl hover:shadow-indigo-200/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                  <div className={`text-5xl font-extrabold mb-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg ${
                    index === 0 ? 'bg-gradient-to-br from-pink-400 to-indigo-300 text-white' : index === 1 ? 'bg-gradient-to-br from-teal-400 to-indigo-200 text-white' : 'bg-gradient-to-br from-orange-400 to-pink-300 text-white'
                  }`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-indigo-700 mb-3 drop-shadow-sm">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-base font-medium">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-7 h-7 text-indigo-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-96 bg-gradient-to-br from-white/30 via-blue-200/20 to-cyan-200/10 rounded-full blur-3xl opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative overflow-hidden rounded-3xl bg-white/90 p-12 lg:p-16 shadow-2xl border-2 border-white/60 backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-br from-cyan-200/30 to-blue-200/20 rounded-full blur-3xl" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-extrabold tracking-tight text-indigo-700 sm:text-5xl drop-shadow-lg">
                Ready to organize your images?
              </h2>
              <p className="mt-4 text-lg text-slate-700 font-medium">
                Join thousands of teams who use <span className="text-pink-600 font-bold">DobbyDrive</span> to manage their image collections efficiently.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
                >
                  Start Free Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => handleAuthClick('login')}
                  className="inline-flex items-center justify-center rounded-2xl border-2 border-indigo-400 px-8 py-4 text-base font-semibold text-indigo-700 bg-white hover:bg-indigo-50 hover:border-pink-400 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 bg-gradient-to-br from-white via-indigo-50 to-pink-50 border-t border-indigo-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 via-indigo-500 to-teal-400 flex items-center justify-center shadow-lg">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-indigo-700 tracking-tight">DobbyDrive</span>
            </div>
            <p className="text-base text-indigo-400 font-medium">
              © 2026 DobbyDrive. Built for modern image management.
            </p>
            <div className="flex gap-3 mt-4 md:mt-0">
              <a href="#features" className="text-indigo-400 hover:text-pink-500 font-semibold transition-colors">Features</a>
              <a href="#how-it-works" className="text-indigo-400 hover:text-pink-500 font-semibold transition-colors">How it works</a>
              <a href="#" className="text-indigo-400 hover:text-pink-500 font-semibold transition-colors">Pricing</a>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
