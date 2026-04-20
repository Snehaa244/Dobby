import { useState } from 'react';
import { X, Folder } from 'lucide-react';
import api from '../utils/api';

export default function CreateFolderModal({ isOpen, onClose, parentId, onSuccess }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/folders', { name, parentId });
      setName('');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create folder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden glass translate-y-0 opacity-100 transition-all duration-300">
        <div className="flex justify-between items-center p-4 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">New Folder</h2>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 p-1.5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100">{error}</div>}
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Folder size={20} />
            </div>
            <input
              type="text"
              autoFocus
              required
              className="pl-10 block w-full outline-none p-2.5 text-base border-zinc-200 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-zinc-50"
              placeholder="Folder name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-zinc-200 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-4 py-2 border border-transparent text-white rounded-xl text-sm font-medium bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-brand-500/20"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
