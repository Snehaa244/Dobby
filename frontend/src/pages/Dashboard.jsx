import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import FolderView from '../components/FolderView';
import CreateFolderModal from '../components/CreateFolderModal';
import UploadImageModal from '../components/UploadImageModal';
import { LogOut, FolderPlus, Upload, Search, HardDrive } from 'lucide-react';
import api from '../utils/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [folderTree, setFolderTree] = useState([]);
  
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchFolderContent = useCallback(async () => {
    try {
      const url = currentFolderId ? `/folders?parentId=${currentFolderId}` : '/folders';
      const { data } = await api.get(url);
      setFolders(data.folders);
      setImages(data.images);
      setBreadcrumbs(data.breadcrumbs || []);
    } catch (err) {
      console.error(err);
    }
  }, [currentFolderId]);

  const fetchFolderTree = useCallback(async () => {
    try {
      const { data } = await api.get('/folders/tree');
      setFolderTree(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const refreshData = () => {
    fetchFolderContent();
    fetchFolderTree();
  };

  useEffect(() => {
    refreshData();
  }, [currentFolderId]);

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        tree={folderTree} 
        currentFolderId={currentFolderId} 
        onSelectFolder={setCurrentFolderId} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 glass border-b border-zinc-200/50 px-6 flex items-center justify-between shadow-sm z-10 w-full">
          <div className="flex items-center gap-4">
            <div className="md:hidden flex items-center gap-2 font-semibold text-zinc-800">
              <HardDrive className="text-brand-500" size={20} />
              Drive
            </div>
            {/* Search - decorative for now */}
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search in Drive..." 
                className="pl-10 pr-4 py-2 bg-zinc-100/50 border border-zinc-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all w-64 lg:w-96"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Action Buttons */}
            <button 
              onClick={() => setIsFolderModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm"
            >
              <FolderPlus size={16} />
              New Folder
            </button>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-full text-sm font-medium hover:bg-brand-500 transition-all shadow-sm shadow-brand-500/20"
            >
              <Upload size={16} />
              Upload
            </button>
            
            <div className="h-6 w-px bg-zinc-200 mx-2"></div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-zinc-900">{user?.name}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Folder Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-50/50">
          <FolderView 
            folders={folders} 
            images={images} 
            breadcrumbs={breadcrumbs}
            currentFolderId={currentFolderId}
            onSelectFolder={setCurrentFolderId}
          />
        </main>
      </div>

      {/* Modals */}
      {isFolderModalOpen && (
        <CreateFolderModal 
          isOpen={isFolderModalOpen} 
          onClose={() => setIsFolderModalOpen(false)} 
          parentId={currentFolderId}
          onSuccess={refreshData}
        />
      )}
      
      {isUploadModalOpen && (
        <UploadImageModal 
          isOpen={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)} 
          folderId={currentFolderId}
          onSuccess={fetchFolderContent}
        />
      )}
    </div>
  );
}
