import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Magnetic = ({ children, strength = 0.5, className = "" }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * strength);
            yTo(y * strength);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", mouseMove);
        el.addEventListener("mouseleave", mouseLeave);

        return () => {
            el.removeEventListener("mousemove", mouseMove);
            el.removeEventListener("mouseleave", mouseLeave);
        };
    }, [strength]);

    return (
        <div ref={ref} className={`inline-block ${className}`}>
            {children}
        </div>
    );
};

export default Magnetic;
