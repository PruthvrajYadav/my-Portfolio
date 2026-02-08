import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a parallax effect on an element based on scroll.
 * @param {Object} triggerRef - React ref for the trigger element (container).
 * @param {string} selector - CSS selector or element to animate.
 * @param {Object} vars - GSAP vars for the parallax (e.g., { yPercent: 20 }).
 */
export const useParallax = (triggerRef, selector, vars = { yPercent: 20 }) => {
    useLayoutEffect(() => {
        if (!triggerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(selector, {
                ease: "none",
                ...vars,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    ...vars.scrollTrigger // Allow override
                }
            });
        }, triggerRef);

        return () => ctx.revert();
    }, [triggerRef, selector]); // Removed vars from dependency to avoid infinite loops if object is unstable
};
