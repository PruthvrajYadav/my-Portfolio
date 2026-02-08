import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Batched reveal animation for lists/grids.
 * @param {Object} triggerRef - React ref for scope.
 * @param {string|Array} selector - Target element(s).
 * @param {Object} vars - ScrollTrigger options (start, etc.).
 * @param {Object} animation - Animation config { from: {}, to: {} }. 
 *                             'to' can be a standard var object or a function receiving the batch.
 */
export const useBatchReveal = (triggerRef, selector, vars = {}, animation = {}) => {
    useLayoutEffect(() => {
        if (!triggerRef.current) return;

        const ctx = gsap.context(() => {
            // Initial set
            if (animation.from) {
                gsap.set(selector, animation.from);
            }

            ScrollTrigger.batch(selector, {
                start: "top 85%",
                once: true,
                onEnter: batch => {
                    gsap.to(batch, {
                        ...animation.to,
                        overwrite: true
                    });
                },
                ...vars
            });
        }, triggerRef);

        return () => ctx.revert();
    }, [triggerRef, selector]);
};
