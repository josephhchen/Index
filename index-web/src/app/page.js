'use client'

import React, { useState } from 'react';
import Link from 'next/link';

function Page() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log("Dark Mode: ", !darkMode);
  };

  const dynamicTitle = "Index".split('').map((char, index) => (
    <span key={index} className={`slide-up-char delay-${index}`}>{char}</span>
  ));

  return (

    <div className={`no-scrollbar overflow-y-hidden ${darkMode ? 'dark' : ''}`}>
      <div className="no-scrollbar bg-white dark:bg-black min-h-screen">
        <header className="no-scrollbar flex flex-col md:flex-row justify-between items-center p-4">
          <h1 className="no-scrollbar text-lg md:text-xl font-semibold text-black dark:text-white">Logo</h1>

          <div className="no-scrollbar flex items-center">
            <label className="no-scrollbar switch">
              <input type="checkbox" onChange={toggleDarkMode} />
              <span className=" no-scrollbar slider round"></span>
            </label>

            <div className="no-scrollbar text-gray-600 dark:text-gray-400 ml-4">Log In</div>
            
            <div className="no-scrollbar ml-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold">
              <Link href="/note">
                Get Started
              </Link>
            </div>
          </div>
        </header>
        <div className="no-scrollbar flex flex-col items-center justify-center h-screen">
          <h2 className="no-scrollbar text-6xl md:text-9xl font-bold text-black dark:text-white">
            {dynamicTitle}
          </h2>
          <p className="no-scrollbar text-xl md:text-3xl text-black dark:text-white mt-4">The only app you need for maximum productivity.</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
