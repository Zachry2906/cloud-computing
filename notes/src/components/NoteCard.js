import React from 'react';

function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">{note.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {note.category || 'Work'}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{formatDate(note.createdAt)}</span>
          
          <div className="flex space-x-2">
            <button 
              className="text-gray-400 hover:text-indigo-500"
              onClick={() => onEdit(note.id)}
            >
              <i className="fas fa-edit"></i>
            </button>
            
            <button 
              className="text-gray-400 hover:text-red-500"
              onClick={() => onDelete(note.id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;