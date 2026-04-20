import { useState, useRef } from 'react';
import { X, UploadCloud, Image as ImageIcon } from 'lucide-react';
import api from '../utils/api';
import { formatBytes } from '../utils/formatSize';

export default function UploadImageModal({ isOpen, onClose, folderId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setFile(selectedFile);
      if (!name) setName(selectedFile.name);
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (!droppedFile.type.startsWith('image/')) {
        setError('Please drop an image file');
        return;
      }
      setFile(droppedFile);
      if (!name) setName(droppedFile.name);
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    if (folderId) formData.append('folderId', folderId);

    try {
      await api.post('/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      setName('');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden glass">
        <div className="flex justify-between items-center p-4 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">Upload Image</h2>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 p-1.5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100">{error}</div>}
          
          {!file ? (
            <div 
              className="border-2 border-dashed border-zinc-300 rounded-2xl p-8 text-center hover:bg-zinc-50 hover:border-brand-400 transition-colors cursor-pointer group"
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors">
                <UploadCloud size={32} className="text-zinc-400 group-hover:text-brand-500 transition-colors" />
              </div>
              <p className="text-sm font-medium text-zinc-700">Click or drag image here</p>
              <p className="text-xs text-zinc-500 mt-1">Supports JPG, PNG, WEBP, GIF</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="w-12 h-12 bg-zinc-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium text-zinc-800 truncate">{file.name}</p>
                  <p className="text-xs text-zinc-500">{formatBytes(file.size)}</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setFile(null)}
                  className="text-zinc-400 hover:text-red-500 p-1"
                >
                  <X size={16} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Image Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <ImageIcon size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    className="pl-9 block w-full outline-none p-2.5 text-sm border-zinc-200 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
                    placeholder="Image name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />

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
              disabled={loading || !file}
              className="px-4 py-2 border border-transparent text-white rounded-xl text-sm font-medium bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-brand-500/20"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
