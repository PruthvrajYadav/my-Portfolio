import { useState, useEffect } from 'react';

/**
 * Typing effect hook.
 * @param {string} text - Full text to type.
 * @param {number} speed - Speed in ms.
 * @returns {string} - Current typed text.
 */
export const useTyping = (text, speed = 100) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayText('');

        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [text, speed]);

    return displayText;
};
