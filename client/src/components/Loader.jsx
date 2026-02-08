import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ setLoading }) => {
    const loaderRef = useRef(null);
    const progressRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(loaderRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "expo.inOut",
                    onComplete: () => setLoading(false)
                });
            }
        });

        // Split text for animation
        const chars = textRef.current.innerText.split('');
        textRef.current.innerHTML = chars.map(char => `<span class="loader-char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

        tl.fromTo(".loader-char",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" }
        )
            .to(progressRef.current, {
                width: "100%",
                duration: 2,
                ease: "power2.inOut"
            }, "-=0.5")
            .to(".loader-char", {
                y: -50,
                opacity: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power4.in"
            });

    }, [setLoading]);

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
            <div className="relative overflow-hidden mb-8">
                <h1 ref={textRef} className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">
                    PRUTHVIRAJ.
                </h1>
            </div>

            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div ref={progressRef} className="h-full w-0 bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
            </div>

           
        </div>
    );
};

export default Loader;
