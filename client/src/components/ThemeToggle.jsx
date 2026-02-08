import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { soundManager } from '../utils/sound';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        soundManager.play('theme');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
            aria-label="Toggle Theme"
            onMouseEnter={() => soundManager.play('hover')}
        >
            {darkMode ? (
                <FaSun className="text-yellow-400 text-xl animate-spin-slow" />
            ) : (
                <FaMoon className="text-blue-400 text-xl" />
            )}
        </button>
    );
};

export default ThemeToggle;
