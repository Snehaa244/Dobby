import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { HardDrive, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-50 to-zinc-100">
      <div className="max-w-md w-full space-y-8 glass p-8 rounded-2xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-brand-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-brand-500/30">
            <HardDrive size={24} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Welcome back</h2>
          <p className="mt-2 text-sm text-zinc-600">Enter your credentials to access your drive</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center font-medium">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700">Email address</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="pl-10 block w-full outline-none p-2.5 sm:text-sm border-zinc-200 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  className="pl-10 block w-full outline-none p-2.5 sm:text-sm border-zinc-200 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all"
          >
            Sign in
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
