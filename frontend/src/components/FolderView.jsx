import { Folder, Image as ImageIcon, ChevronRight, Home, MoreVertical, Download, Trash2, Eye } from 'lucide-react';
import { formatBytes } from '../utils/formatSize';
import { useState } from 'react';

export default function FolderView({ folders, images, breadcrumbs, onSelectFolder, viewMode = 'grid' }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  if (folders.length === 0 && images.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400">
        <div className="w-28 h-28 bg-slate-100 rounded-3xl flex items-center justify-center mb-5 border border-slate-200 shadow-sm">
          <Folder size={56} className="text-slate-300" />
        </div>
        <p className="text-lg font-semibold text-slate-600">This folder is empty</p>
        <p className="text-sm mt-2 text-slate-500">Upload an image or create a new folder to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 text-sm bg-gradient-to-r from-teal-50 via-white to-pink-50 rounded-2xl px-4 py-3 shadow-sm border border-slate-100">
        <button 
          onClick={() => onSelectFolder(null)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
        >
          <Home size={16} />
        </button>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb._id} className="flex items-center">
            <ChevronRight size={14} className="mx-1 text-slate-300" />
            <button 
              onClick={() => onSelectFolder(crumb._id)}
              className="px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900 font-medium truncate max-w-[150px]"
            >
              {crumb.name}
            </button>
          </div>
        ))}
      </div>

      {/* Folders Section */}
      {folders.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4 px-2">Folders</h3>
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" 
            : "space-y-2"
          }>
            {folders.map(folder => (
              <div 
                key={folder._id}
                onClick={() => onSelectFolder(folder._id)}
                onMouseEnter={() => setHoveredItem(`folder-${folder._id}`)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group bg-gradient-to-br from-white via-teal-50 to-pink-50 border border-slate-200 rounded-2xl cursor-pointer hover:border-pink-300 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-0.5 transition-all duration-200 ${
                  viewMode === 'list' ? 'flex items-center gap-4 p-4' : 'p-5 flex flex-col'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <Folder size={28} className="text-pink-500 fill-pink-100" />
                      </div>
                      <button 
                        className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <div className="mt-auto">
                      <h4 className="font-semibold text-slate-800 truncate" title={folder.name}>{folder.name}</h4>
                      <p className="text-xs text-slate-500 mt-1.5">{formatBytes(folder.size || 0)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Folder size={20} className="text-indigo-500 fill-indigo-100" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">{folder.name}</h4>
                      <p className="text-xs text-slate-500">{formatBytes(folder.size || 0)}</p>
                    </div>
                    <button 
                      className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Images Section */}
      {images.length > 0 && (
        <section className={folders.length > 0 ? "pt-6 border-t border-slate-200" : ""}>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Images</h3>
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" 
            : "space-y-2"
          }>
            {images.map(image => (
              <div 
                key={image._id}
                onClick={() => setPreviewImage(image)}
                onMouseEnter={() => setHoveredItem(`image-${image._id}`)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-200 flex ${
                  viewMode === 'list' ? 'flex-row items-center gap-4 p-3' : 'flex-col'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="aspect-square bg-slate-100 relative overflow-hidden flex-shrink-0">
                      <img 
                        src={`http://localhost:5000${image.url}`} 
                        alt={image.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <button className="p-2 bg-white/90 rounded-xl text-slate-700 hover:bg-white transition-colors shadow-lg">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 bg-white/90 rounded-xl text-slate-700 hover:bg-white transition-colors shadow-lg">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm text-slate-800 truncate" title={image.name}>{image.name}</h4>
                      <p className="text-xs text-slate-500 mt-1.5">{formatBytes(image.size)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                      <img 
                        src={`http://localhost:5000${image.url}`} 
                        alt={image.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-slate-800 truncate">{image.name}</h4>
                      <p className="text-xs text-slate-500">{formatBytes(image.size)}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="max-w-5xl w-full max-h-[90vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">{previewImage.name}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{formatBytes(previewImage.size)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                  <Download size={18} />
                </button>
                <button 
                  className="px-4 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
                  onClick={() => setPreviewImage(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-slate-50">
              <img 
                src={`http://localhost:5000${previewImage.url}`} 
                alt={previewImage.name} 
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
