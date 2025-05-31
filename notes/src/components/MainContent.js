import React from 'react';
import SearchBar from './SearchBar';
import NoteCard from './NoteCard';

function MainContent({ notes, onEdit, onDelete, searchQuery, setSearchQuery }) {
  return (
    <div className="flex-1 overflow-auto">
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {searchQuery ? `${searchQuery} Notes` : 'All Notes'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes && notes.length > 0 ? (
            notes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No notes found. Click "New Note" to create one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainContent;