import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import FolderView from '../components/FolderView';
import CreateFolderModal from '../components/CreateFolderModal';
import UploadImageModal from '../components/UploadImageModal';
import { LogOut, FolderPlus, Upload, Search, HardDrive, LayoutGrid, List } from 'lucide-react';
import api from '../utils/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [folderTree, setFolderTree] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStarred, setShowStarred] = useState(false);
  
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

  // Filter folders by search query
  const filteredFolders = showStarred
    ? folders.filter(f => f.starred && (!searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase())))
    : searchQuery
      ? folders.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : folders;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        tree={folderTree} 
        currentFolderId={currentFolderId} 
        onSelectFolder={setCurrentFolderId}
        showStarred={showStarred}
        setShowStarred={setShowStarred}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-10 w-full">
          <div className="flex items-center gap-4">
            <div className="md:hidden flex items-center gap-2 font-semibold text-slate-900">
              <HardDrive className="text-indigo-600" size={20} />
              Drive
            </div>
            {/* Search */}
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search files and folders..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64 lg:w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Action Buttons */}
            <button 
              onClick={() => setIsFolderModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <FolderPlus size={16} />
              <span className="hidden lg:inline">New Folder</span>
            </button>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
            >
              <Upload size={16} />
              <span className="hidden sm:inline">Upload</span>
            </button>
            
            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-900">{user?.name}</span>
                <span className="text-xs text-slate-500">Personal</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Folder Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <FolderView 
            folders={filteredFolders} 
            images={showStarred ? images.filter(img => img.starred) : images} 
            breadcrumbs={breadcrumbs}
            currentFolderId={currentFolderId}
            onSelectFolder={setCurrentFolderId}
            viewMode={viewMode}
            refreshData={refreshData}
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
