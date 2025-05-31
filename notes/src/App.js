import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import NoteModal from './components/NoteModal';
import Login from './components/Login';
import Register from './components/Register';
import { getNotes, addNote, updateNote, deleteNote } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Fetch notes when the component mounts or when searchQuery changes
    if (isAuthenticated) {
      fetchNotes(searchQuery);
    }
  }, [searchQuery]);

  const fetchNotes = async (search = '') => {
    try {
      const response = await getNotes(search);
      setNotes(response.data || []);
    } catch (error) {
      // Jika error 401/403, redirect ke login
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        window.location.href = '/';
      } else {
        console.error('Error fetching notes:', error);
      }
    }
  };

  const handleAddNote = () => {
    setCurrentNote(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditNote = async (id) => {
    try {
      const response = await getNotes('', id);
      setCurrentNote(response.data);
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching note details:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        fetchNotes(searchQuery);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

const handleSaveNote = async (noteData) => {
  try {
    if (isEditing) {
      await updateNote(currentNote.id, noteData);
    } else {
      await addNote(noteData);
    }

    await fetchNotes(searchQuery); // Penting: gunakan searchQuery
    setIsModalOpen(false);
  } catch (error) {
    console.error('Error saving note:', error);
  }
};


  const handleCategoryFilter = (category) => {
    setSearchQuery(category);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Notes app component that will be rendered
  const NotesApp = () => (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <Sidebar 
        onAddNote={handleAddNote} 
        onCategorySelect={handleCategoryFilter}
      />
      
      <MainContent 
        notes={notes} 
        onEdit={handleEditNote} 
        onDelete={handleDeleteNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveNote}
          note={currentNote}
          isEditing={isEditing}
        />
      )}
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={<NotesApp />} 
        />
      </Routes>
    </Router>
  );
}

export default App;