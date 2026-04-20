import { ChevronRight, Folder, HardDrive, ChevronDown } from 'lucide-react';
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
          "flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer text-sm transition-colors group",
          isSelected ? "bg-brand-50 text-brand-700 font-medium" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
        ))}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleSelect}
      >
        <div 
          className={clsx("w-5 h-5 flex items-center justify-center rounded transition-colors", hasChildren ? "hover:bg-zinc-200" : "invisible")}
          onClick={handleToggle}
        >
          {isOpen ? <ChevronDown size={14} className="text-zinc-400" /> : <ChevronRight size={14} className="text-zinc-400" />}
        </div>
        <Folder 
          size={16} 
          className={clsx(isSelected ? "text-brand-500 fill-brand-100" : "text-zinc-400 group-hover:text-zinc-500")} 
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

export default function Sidebar({ tree, currentFolderId, onSelectFolder }) {
  return (
    <div className="w-64 border-r border-zinc-200/60 bg-white/50 backdrop-blur-xl flex flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-zinc-100 shrink-0">
        <div className="flex items-center gap-2 font-semibold text-zinc-800 text-lg">
          <HardDrive className="text-brand-500 fill-brand-100" size={24} />
          <span className="tracking-tight">Drive</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
        <div 
          className={twMerge(clsx(
            "flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer text-sm transition-colors mb-2 font-medium",
            currentFolderId === null ? "bg-brand-50 text-brand-700" : "text-zinc-700 hover:bg-zinc-100"
          ))}
          onClick={() => onSelectFolder(null)}
        >
          <HardDrive size={18} className={currentFolderId === null ? "text-brand-500" : "text-zinc-400"} />
          My Drive
        </div>

        <div className="mt-4">
          <div className="px-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Folders</div>
          {tree.map(node => (
            <TreeNode 
              key={node._id} 
              node={node} 
              currentFolderId={currentFolderId}
              onSelectFolder={onSelectFolder}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
