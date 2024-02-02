'use client'

import React, { useState } from 'react';
import Navbar from '../components/navbar';

function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addNewNote = () => {
    const newNote = { title: 'Untitled', content: '' };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
  };

  const updateCurrentNote = (field, value) => {
    setCurrentNote({ ...currentNote, [field]: value });
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex bg-white dark:bg-black min-h-screen">
        <div className="navbar-hover">
          <Navbar darkMode={darkMode} />
        </div>
        <div className="flex-1 min-h-screen">
          <header className="flex justify-end p-4">
            <label className="switch">
              <input type="checkbox" onChange={toggleDarkMode} />
              <span className="slider round"></span>
            </label>
          </header>
          <div className="p-4 flex">
            <section className="notes-section">
              <h2 className="text-4xl font-bold text-gray-500">Notes</h2>
              <button 
                onClick={addNewNote} 
                className="mt-2 text-blue-600 dark:text-blue-400"
              >
                + New Document
              </button>
              <div>
                {notes.map((note, index) => (
                  <div key={index} className="mt-2">
                    {note.title}
                  </div>
                ))}
              </div>
            </section>
            <div className="note-details">
              <input
                className="title-input"
                placeholder="Untitled"
                value={currentNote.title}
                onChange={(e) => updateCurrentNote('title', e.target.value)}
              />
              <textarea
                className="content-area"
                placeholder="Start typing..."
                value={currentNote.content}
                onChange={(e) => updateCurrentNote('content', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
