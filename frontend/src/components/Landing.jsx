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
    <div className="min-h-screen bg-white text-slate-900">
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
      <section id="features" className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to manage images
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Powerful features designed for creators, marketers, and teams who care about organization.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Get started in minutes
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Three simple steps to organize your images like a pro.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-6xl font-bold text-slate-100 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
            
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to organize your images?
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Join thousands of teams who use Drive to manage their image collections efficiently.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-900 hover:bg-slate-100 transition-all duration-200"
                >
                  Start Free Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => handleAuthClick('login')}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-600 px-8 py-4 text-base font-semibold text-white hover:bg-slate-800 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">Drive</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 Drive. Built for modern image management.
            </p>
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
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400" />
                        <div>
                          <p className="font-semibold text-white">Launch campaign</p>
                          <p className="text-sm text-slate-500">230 KB</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-slate-950/85 p-4 ring-1 ring-white/10">
                      <p className="text-sm text-slate-400">Folder overview</p>
                      <div className="mt-4 grid gap-3">
                        <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3">
                          <span className="text-sm text-slate-300">Projects</span>
                          <span className="text-sm text-emerald-300">12 items</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3">
                          <span className="text-sm text-slate-300">Assets</span>
                          <span className="text-sm text-cyan-300">8 items</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10 shadow-xl shadow-slate-950/15 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Recent</p>
                    <p className="mt-3 font-semibold text-white">Campaign banner</p>
                    <p className="mt-2 text-sm text-slate-400">Updated 2 hours ago</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10 shadow-xl shadow-slate-950/15 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Status</p>
                    <p className="mt-3 font-semibold text-white">18 images stored</p>
                    <p className="mt-2 text-sm text-slate-400">Organized by folder size</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">Built for teams</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">A complete image organization workspace.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              From nested folder structure to image uploads, every workflow is designed to feel polished and effortless.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-sm">
                <Folder size={24} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">Create Nested Folders</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Organize your content with a structure that mirrors how your team works.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600 shadow-sm">
                <Upload size={24} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">Upload Images Easily</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Add files quickly with minimal clicks and see instant previews in the interface.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-50 text-violet-600 shadow-sm">
                <BarChart3 size={24} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">Automatic Size Calculation</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">See folder size totals instantly so you always know where your storage is going.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-50 text-orange-600 shadow-sm">
                <Shield size={24} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">Secure User Access</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Keep your files private and secure with login protected access for every user.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">Quick start</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">Organize your workflow in four easy steps.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                From account setup to folder management, the process is streamlined so you spend less time organizing and more time creating.
              </p>
            </div>
            <div className="space-y-5">
              {[
                { title: 'Sign up', detail: 'Create an account and log into your secure workspace.', index: '01' },
                { title: 'Create folders', detail: 'Build nested folders to mirror your project structure.', index: '02' },
                { title: 'Upload images', detail: 'Add files to any folder with a smooth upload flow.', index: '03' },
                { title: 'View structure', detail: 'Navigate your organized library with breadcrumbs and previews.', index: '04' },
              ].map((item) => (
                <div key={item.title} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-emerald-500 to-cyan-400 opacity-50" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-emerald-600 ring-1 ring-emerald-100 shadow-sm">
                      <span className="font-semibold">{item.index}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">Launch today</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">A beautiful workspace for your next campaign.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-emerald-100/90">
            Start organizing your image library with a modern interface built for speed and clarity.
          </p>
          <button
            onClick={() => handleAuthClick('signup')}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-slate-950 shadow-xl shadow-slate-950/20 transition duration-200 hover:shadow-emerald-300/40"
          >
            Start free trial
          </button>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
