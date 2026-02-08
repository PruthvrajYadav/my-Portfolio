import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MouseSpotlight = () => {
    const lightRef = useRef(null);

    useEffect(() => {
        const el = lightRef.current;

        // Use quickTo for high performance mouse tracking
        const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

        const handleMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={lightRef}
            className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 mix-blend-screen dark:mix-blend-screen opacity-50 dark:opacity-30"
            style={{
                background: 'radial-gradient(circle, var(--spotlight-color, rgba(59,130,246,0.3)) 0%, transparent 70%)',
                willChange: 'transform',
                transition: 'background 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        />
    );
};

export default MouseSpotlight;
