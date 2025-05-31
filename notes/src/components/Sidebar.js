import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils';

function Sidebar({ onAddNote, onCategorySelect }) {
  const navigate = useNavigate();

    const Logout = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/logout`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Notes</h1>
      </div>
      
      <nav className="mt-6">
        <div 
          className="px-6 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-700 rounded-lg mx-2" 
          onClick={() => onCategorySelect('')}
        >
          <i className="fas fa-sticky-note mr-3 text-indigo-500"></i>
          <span>All Notes</span>
        </div>
        
        <div className="px-6 mt-6">
          <p className="text-gray-600 text-sm uppercase">Categories</p>
        </div>
        
        <div 
          className="px-6 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-700 rounded-lg mx-2" 
          onClick={() => onCategorySelect('Work')}
        >
          <i className="fas fa-briefcase mr-3 text-blue-500"></i>
          <span>Work</span>
        </div>
        
        <div 
          className="px-6 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-700 rounded-lg mx-2" 
          onClick={() => onCategorySelect('Study')}
        >
          <i className="fas fa-book mr-3 text-green-500"></i>
          <span>Study</span>
        </div>
        
        <div 
          className="px-6 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-700 rounded-lg mx-2" 
          onClick={() => onCategorySelect('Personal')}
        >
          <i className="fas fa-user mr-3 text-purple-500"></i>
          <span>Personal</span>
        </div>
      </nav>
      
      <div className="px-6 mt-6">
        <button 
          onClick={onAddNote}
          className="bg-indigo-600 text-white w-full py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          <i className="fas fa-plus mr-2"></i>New Note
        </button>
        
        <button onClick={Logout}
          className="bg-red-600 text-white w-full py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 mt-4"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;