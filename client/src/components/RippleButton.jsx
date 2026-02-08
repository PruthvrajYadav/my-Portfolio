import React, { useState, useLayoutEffect } from 'react';
import Magnetic from './Magnetic';

const RippleButton = ({ children, onClick, className = "", magnetic = true, ...props }) => {
    const [ripples, setRipples] = useState([]);

    useLayoutEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples((arr) => arr.slice(1));
            }, 800); // Ripple duration
            return () => clearTimeout(timer);
        }
    }, [ripples]);

    const createRipple = (e) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple = { x, y, size, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        if (onClick) onClick(e);
    };

    const ButtonContent = (
        <button
            className={`relative overflow-hidden cursor-pointer ${className}`}
            onClick={createRipple}
            {...props}
        >
            <span className="relative z-10 pointer-events-none">{children}</span>
            <span className="absolute inset-0 z-0 pointer-events-none">
                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full bg-white/30 animate-ripple"
                        style={{
                            top: ripple.y,
                            left: ripple.x,
                            width: ripple.size,
                            height: ripple.size,
                            transform: 'scale(0)',
                        }}
                    />
                ))}
            </span>
        </button>
    );

    return magnetic ? <Magnetic>{ButtonContent}</Magnetic> : ButtonContent;
};

export default RippleButton;
