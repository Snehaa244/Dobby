import { Folder, Image as ImageIcon, ChevronRight, Home, MoreVertical } from 'lucide-react';
import { formatBytes } from '../utils/formatSize';
import { useState } from 'react';

export default function FolderView({ folders, images, breadcrumbs, onSelectFolder }) {
  const [previewImage, setPreviewImage] = useState(null);

  if (folders.length === 0 && images.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-400">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-4 border border-zinc-200">
          <Folder size={48} className="text-zinc-300" />
        </div>
        <p className="text-lg font-medium text-zinc-600">This folder is empty</p>
        <p className="text-sm mt-1">Upload an image or create a new folder.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm font-medium text-zinc-600">
        <button 
          onClick={() => onSelectFolder(null)}
          className="hover:bg-zinc-200 p-1.5 rounded-md transition-colors"
        >
          <Home size={16} />
        </button>
        {breadcrumbs.map((crumb) => (
          <div key={crumb._id} className="flex items-center">
            <ChevronRight size={14} className="mx-1 text-zinc-400" />
            <button 
              onClick={() => onSelectFolder(crumb._id)}
              className="hover:bg-zinc-200 px-2 py-1 rounded-md transition-colors truncate max-w-[150px]"
            >
              {crumb.name}
            </button>
          </div>
        ))}
      </div>

      {folders.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-1">Folders</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {folders.map(folder => (
              <div 
                key={folder._id}
                onClick={() => onSelectFolder(folder._id)}
                className="group bg-white border border-zinc-200/80 rounded-2xl p-4 flex flex-col cursor-pointer hover:border-brand-400 hover:shadow-md hover:shadow-brand-500/5 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <Folder size={32} className="text-brand-500 fill-brand-100" />
                  <button className="text-zinc-300 hover:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="mt-auto">
                  <h4 className="font-medium text-zinc-800 truncate" title={folder.name}>{folder.name}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{formatBytes(folder.size || 0)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className={folders.length > 0 ? "pt-4 border-t border-zinc-200" : ""}>
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-1">Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map(image => (
              <div 
                key={image._id}
                onClick={() => setPreviewImage(image)}
                className="group bg-white border border-zinc-200/80 rounded-2xl overflow-hidden cursor-pointer hover:border-brand-400 hover:shadow-md hover:shadow-brand-500/5 transition-all flex flex-col"
              >
                <div className="aspect-square bg-zinc-100 relative overflow-hidden flex-shrink-0">
                  <img 
                    src={`http://localhost:5000${image.url}`} 
                    alt={image.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="overflow-hidden">
                    <h4 className="font-medium text-sm text-zinc-800 truncate" title={image.name}>{image.name}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{formatBytes(image.size)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/90 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col bg-zinc-900 rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-zinc-800 text-white">
              <div>
                <h3 className="font-medium">{previewImage.name}</h3>
                <p className="text-xs text-zinc-400">{formatBytes(previewImage.size)}</p>
              </div>
              <button 
                className="text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition-colors"
                onClick={() => setPreviewImage(null)}
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-black/50">
              <img 
                src={`http://localhost:5000${previewImage.url}`} 
                alt={previewImage.name} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
