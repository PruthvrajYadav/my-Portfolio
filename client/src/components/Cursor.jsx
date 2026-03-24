import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
    const mainCursor = useRef(null);
    const secondaryCursor = useRef(null);
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;

            gsap.to(mainCursor.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out"
            });

            gsap.to(secondaryCursor.current, {
                x: clientX,
                y: clientY,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleHover = (e) => {
            const target = e.target;
            const isClickable = target.closest('button, a, .project-card, .skill-card, input, textarea');
            setIsPointer(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <div className="hidden lg:block">
            {/* Main Cursor Dot */}
            <div
                ref={mainCursor}
                className={`fixed top-0 left-0 w-2 h-2 bg-emerald-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ${isPointer ? 'scale-0' : 'scale-100'}`}
                style={{ transform: 'translate(-50%, -50%)' }}
            />

            {/* Secondary Fluid Cursor */}
            <div
                ref={secondaryCursor}
                className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-emerald-500/50 transition-all duration-300 mix-blend-difference
                ${isPointer ? 'w-20 h-20 bg-emerald-500/10 scale-100' : 'w-8 h-8 scale-100'}
                `}
                style={{ transform: 'translate(-50%, -50%)' }}
            />
        </div>
    );
};

export default Cursor;
