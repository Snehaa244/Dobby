import { useState, useRef } from 'react';
import { X, UploadCloud, Image as ImageIcon } from 'lucide-react';
import api from '../utils/api';
import { formatBytes } from '../utils/formatSize';

export default function UploadImageModal({ isOpen, onClose, folderId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
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
      if (!name) setName(selectedFile.name.replace(/\.[^/.]+$/, ""));
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (!droppedFile.type.startsWith('image/')) {
        setError('Please drop an image file');
        return;
      }
      setFile(droppedFile);
      if (!name) setName(droppedFile.name.replace(/\.[^/.]+$/, ""));
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
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
    formData.append('name', name || file.name);
    if (folderId) formData.append('folderId', folderId);

    try {
      await api.post('images', formData, {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <UploadCloud className="text-indigo-600" size={20} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Upload Image</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{error}</div>}
          
          {!file ? (
            <div 
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer group ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
              }`}
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
                isDragging ? 'bg-indigo-100' : 'bg-slate-100 group-hover:bg-indigo-50'
              }`}>
                <UploadCloud size={32} className={`transition-colors ${isDragging ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-500'}`} />
              </div>
              <p className="text-sm font-semibold text-slate-700">Click or drag image here</p>
              <p className="text-xs text-slate-500 mt-2">Supports JPG, PNG, WEBP, GIF</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-14 h-14 bg-slate-200 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{formatBytes(file.size)}</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setFile(null)}
                  className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Image Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <ImageIcon size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    className="pl-11 block w-full outline-none py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50 hover:bg-white"
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
              className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !file}
              className="px-5 py-2.5 border border-transparent text-white rounded-xl text-sm font-medium bg-slate-900 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
