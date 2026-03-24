import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../utils/sound';
import { useReveal } from '../hooks/useReveal';
import { useBatchReveal } from '../hooks/useBatchReveal';
import img from '../assets/img/image.png';

const About = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    // Hooks replaces parts of the big useEffect
    // Background Text Parallax
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".bg-text",
                { x: 0 },
                {
                    xPercent: 30,
                    opacity: 0.1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom top",
                        scrub: 1.5
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    useReveal(containerRef, ".about-image-reveal",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", scale: 1.2, filter: "grayscale(100%)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, filter: "grayscale(0%)", duration: 1.5, ease: "power4.out", scrollTrigger: { start: "top 80%" } }
    );

    // useBatchReveal for skill bars using string selector
    useBatchReveal(containerRef, ".skill-bar-fill", { start: "top 95%" }, {
        from: { width: 0 },
        to: { width: (i, t) => t.dataset.width, duration: 1.5, ease: "power2.out", stagger: 0.1 }
    });

    // Timeline + Floating Animations

    const handleGlow = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--x', `${x} px`);
        e.currentTarget.style.setProperty('--y', `${y} px`);
    };

    const skills = [
        { name: "Frontend Development", width: "75%" },
        { name: "Backend Development", width: "70%" },
        { name: "Database Design", width: "70%" },
    ];

    return (
        <div id="about" ref={containerRef} className="py-16 md:py-32 bg-transparent relative transition-colors duration-700">
            {/* Background Decorative Text */}
            <div className="bg-text absolute top-0 md:top-[-5%] left-0 text-[5rem] sm:text-[15rem] md:text-[25rem] font-black text-orange-500/5 dark:text-orange-500/5 pointer-events-none select-none uppercase leading-none z-0 whitespace-nowrap">
                About
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
                    {/* Left: Image with 3D feel */}
                    <div className="image-container relative group perspective-1000">
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />
                        <div ref={imageRef} className="about-image-reveal relative aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={img}
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-8 left-8">
                                <p className="text-white text-3xl font-black tracking-tighter mb-1">PRUTHVIRAJ</p>
                                <div className="h-1 w-12 bg-orange-500 mb-2" />
                                <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">Web Developer</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="about-content">
                        <h2 className="about-text text-orange-600 dark:text-orange-500 font-black tracking-widest uppercase mb-4 text-sm">Who I Am</h2>
                        <h3 className="about-text text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight text-gray-800 dark:text-gray-200">
                            I build digital products that <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">breathe life</span> into code.
                        </h3>

                        <p className="about-text text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                            I am a developer by passion. I specialize in the <span className="text-gray-900 dark:text-white font-bold underline decoration-orange-500 underline-offset-4">MERN Stack</span>,
                            creating fluid applications where every pixel and every line of server-side logic serves a purpose.
                        </p>

                        <div className="stats-grid grid grid-cols-2 gap-4 md:gap-6 mb-12">
                            <div
                                className="stats-card relative overflow-hidden p-4 md:p-6 glass rounded-2xl border border-gray-100 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 group cursor-default"
                                onMouseEnter={() => soundManager.play('hover')}
                                onMouseMove={handleGlow}
                            >
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(400px circle at var(--x) var(--y), rgba(249, 115, 22, 0.15), transparent 40%)' }} />
                                <h4 className="text-2xl md:text-3xl font-black text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform relative z-10">6 month</h4>
                                <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest relative z-10">Experience</p>
                            </div>
                            <div
                                className="stats-card relative overflow-hidden p-4 md:p-6 glass rounded-2xl border border-gray-100 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 group cursor-default"
                                onMouseEnter={() => soundManager.play('hover')}
                                onMouseMove={handleGlow}
                            >
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(400px circle at var(--x) var(--y), rgba(239, 68, 68, 0.15), transparent 40%)' }} />
                                <h4 className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform relative z-10">2</h4>
                                <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest relative z-10">Masterpieces</p>
                            </div>
                        </div>

                        {/* Skill Bars */}
                        <div className="space-y-6">
                            {skills.map((skill, index) => (
                                <div key={index} className="about-text">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-800 dark:text-gray-300 font-black text-xs uppercase tracking-widest">{skill.name}</span>
                                        <span className="text-orange-500 font-black text-xs">{skill.width}</span>
                                    </div>
                                    <div className="h-1 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            data-width={skill.width}
                                            className="skill-bar-fill h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
