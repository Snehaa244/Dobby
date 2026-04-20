import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { HardDrive, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({ onAuthClick }) {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-pink-200 shadow-lg' 
        : 'bg-white'
    }`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-indigo-500 to-teal-400 shadow-xl border-2 border-white">
            <HardDrive className="text-white drop-shadow-lg" size={28} />
          </div>
          <div>
            <p className={`text-2xl font-extrabold tracking-tight transition-colors ${isScrolled ? 'text-pink-600' : 'text-pink-600 lg:text-indigo-700'}`}>DobbyDrive</p>
            <p className={`text-xs font-semibold tracking-wide transition-colors ${isScrolled ? 'text-indigo-500' : 'text-teal-500 lg:text-pink-400'}`}>Your Image Manager</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden items-center gap-8 text-base font-semibold md:flex ${isScrolled ? 'text-indigo-700' : 'text-pink-700 lg:text-indigo-700'}`}>
          <a href="#features" className="hover:text-pink-500 transition-colors">Product</a>
          <a href="#how-it-works" className="hover:text-teal-500 transition-colors">How it works</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Pricing</a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2 text-base shadow-md transition-all ${
              isScrolled 
                ? 'border-pink-200 bg-white text-pink-700' 
                : 'border-white/30 bg-white/20 text-indigo-700'
            }`}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white font-extrabold text-lg shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="rounded-full p-1.5 hover:bg-slate-200 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onAuthClick('login')}
                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-slate-900 text-white shadow hover:bg-slate-800 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => onAuthClick('signup')}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl transition-all"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-xl border-2 border-pink-200 bg-white shadow hover:bg-pink-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} className="text-pink-600" /> : <Menu size={24} className="text-pink-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-pink-50 via-white to-teal-50 border-b border-pink-200 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-4 py-6 space-y-4">
          <a href="#features" className="block text-base font-medium text-slate-600 hover:text-indigo-600">Product</a>
          <a href="#how-it-works" className="block text-base font-medium text-slate-600 hover:text-indigo-600">How it works</a>
          <a href="#" className="block text-base font-medium text-slate-600 hover:text-indigo-600">Pricing</a>
          <div className="pt-4 border-t border-slate-100 space-y-3">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-700">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-slate-500 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => { onAuthClick('login'); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 text-center text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onAuthClick('signup'); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 text-center text-white font-semibold rounded-xl bg-slate-900 hover:bg-slate-800"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
