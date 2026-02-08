import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal animation using fromTo.
 * @param {Object} triggerRef - React ref for scope.
 * @param {string} selector - Target element(s).
 * @param {Object} fromVars - Initial state.
 * @param {Object} toVars - Final state.
 */
export const useReveal = (triggerRef, selector, fromVars, toVars) => {
    useLayoutEffect(() => {
        if (!triggerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(selector,
                fromVars,
                {
                    ...toVars,
                    scrollTrigger: {
                        trigger: selector,
                        start: "top 85%",
                        ...toVars.scrollTrigger
                    }
                }
            );
        }, triggerRef);

        return () => ctx.revert();
    }, [triggerRef, selector]);
};
