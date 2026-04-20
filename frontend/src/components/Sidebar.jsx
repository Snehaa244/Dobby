import { ChevronRight, Folder, HardDrive, ChevronDown, Star, Clock, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function TreeNode({ node, level = 0, currentFolderId, onSelectFolder }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = currentFolderId === node._id;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelectFolder(node._id);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div>
      <div 
        className={twMerge(clsx(
          "flex items-center gap-1.5 py-2 px-3 rounded-xl cursor-pointer text-sm transition-all duration-200 group",
          isSelected 
            ? "bg-pink-50 text-pink-700 font-medium" 
            : "text-slate-600 hover:bg-orange-50 hover:text-orange-700"
        ))}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={handleSelect}
      >
        <div 
          className={clsx("w-5 h-5 flex items-center justify-center rounded-lg transition-colors", hasChildren ? "hover:bg-orange-100" : "invisible")}
          onClick={handleToggle}
        >
          {isOpen ? <ChevronDown size={14} className="text-orange-400" /> : <ChevronRight size={14} className="text-orange-400" />}
        </div>
        <Folder 
          size={18} 
          className={clsx(
            isSelected ? "text-pink-500" : "text-orange-400 group-hover:text-orange-500",
            isSelected && "fill-pink-100"
          )} 
        />
        <span className="truncate flex-1 select-none">{node.name}</span>
      </div>
      
      {isOpen && hasChildren && (
        <div className="mt-0.5">
          {node.children.map(child => (
            <TreeNode 
              key={child._id} 
              node={child} 
              level={level + 1} 
              currentFolderId={currentFolderId}
              onSelectFolder={onSelectFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ tree, currentFolderId, onSelectFolder, showStarred, setShowStarred }) {
  return (
    <div className="w-72 border-r border-slate-200 bg-white hidden md:flex flex-col shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-teal-400/20">
            <HardDrive className="text-white" size={20} />
          </div>
          <div>
            <span className="text-lg font-semibold text-indigo-700 tracking-tight">Drive</span>
            <p className="text-xs text-teal-500">Image Manager</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Quick Access */}
        <div>
          <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Quick Access</div>
          <div className="space-y-1">
            <div 
              className={twMerge(clsx(
                "flex items-center gap-3 py-2.5 px-3 rounded-xl cursor-pointer text-sm transition-all duration-200",
                currentFolderId === null 
                  ? "bg-indigo-50 text-indigo-700 font-medium" 
                  : "text-slate-600 hover:bg-slate-100"
              ))}
              onClick={() => onSelectFolder(null)}
            >
              <HardDrive size={18} className={currentFolderId === null ? "text-indigo-500" : "text-slate-400"} />
              My Drive
            </div>
            <div
              className={`flex items-center gap-3 py-2.5 px-3 rounded-xl cursor-pointer text-sm transition-all duration-200 ${showStarred ? 'bg-yellow-50 text-yellow-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
              onClick={() => setShowStarred && setShowStarred(!showStarred)}
            >
              <Star size={18} className={showStarred ? 'text-yellow-400' : 'text-slate-400'} />
              Starred
            </div>
            <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl cursor-pointer text-sm text-slate-600 hover:bg-slate-100 transition-all duration-200">
              <Clock size={18} className="text-slate-400" />
              Recent
            </div>
            <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl cursor-pointer text-sm text-slate-600 hover:bg-slate-100 transition-all duration-200">
              <Trash2 size={18} className="text-slate-400" />
              Trash
            </div>
          </div>
        </div>

        {/* Folders */}
        <div>
          <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Folders</div>
          {tree.length > 0 ? (
            <div className="space-y-0.5">
              {tree.map(node => (
                <TreeNode 
                  key={node._id} 
                  node={node} 
                  currentFolderId={currentFolderId}
                  onSelectFolder={onSelectFolder}
                />
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-sm text-slate-400 italic">
              No folders yet
            </div>
          )}
        </div>
      </div>

      {/* Storage Info */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Storage</span>
            <span className="text-xs text-slate-500">2.4 GB / 15 GB</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-1/6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
