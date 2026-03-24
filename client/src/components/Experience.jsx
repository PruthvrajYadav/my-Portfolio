import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../utils/sound';
import { Tilt } from 'react-tilt';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const el = containerRef.current;

            // Optimization: Initial States & Hints
            gsap.set(".exp-item", { opacity: 0, y: 50, willChange: "transform, opacity" });
            gsap.set(el.querySelectorAll('.glass'), { scale: 0.8, rotateX: 15, willChange: "transform" });
            gsap.set(".exp-dot", { scale: 0, opacity: 0 });

            // Background Text Parallax (Left to Right Sweep)
            gsap.to(".bg-text", {
                xPercent: 15,
                opacity: 0.08,
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            // Timeline Growing Animation with Glow
            gsap.fromTo(lineRef.current,
                { height: "0%", opacity: 0 },
                {
                    height: "100%",
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".timeline-container",
                        start: "top 20%",
                        end: "bottom 80%",
                        scrub: true,
                    }
                }
            );

            // Batched Reveal for Experience Items
            ScrollTrigger.batch(".exp-item", {
                onEnter: batch => {
                    // Container Reveal
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        overwrite: true
                    });

                    // Inner Elements Reveal (Synced)
                    batch.forEach((item, i) => {
                        const card = item.querySelector('.glass');
                        const dot = item.querySelector('.exp-dot');

                        gsap.to(card, {
                            scale: 1,
                            rotateX: 0,
                            duration: 0.8,
                            ease: "back.out(1.5)",
                            delay: i * 0.2 // Sync with stagger
                        });

                        gsap.to(dot, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: "elastic.out(1, 0.5)",
                            delay: i * 0.2 + 0.1
                        });
                    });
                },
                start: "top 80%",
                once: true
            });

            // Number counter
            gsap.fromTo(".exp-counter",
                { innerHTML: 0 },
                {
                    innerHTML: 9,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    scrollTrigger: {
                        trigger: ".exp-counter",
                        start: "top 90%",
                        once: true
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const experiences = [
        {
            company: "WorknAI (Punarmilan Project)",
            role: "Full Stack Developer Intern",
            period: "Jan 2026 – Mar 2026",
            location: "3 Months",
            description: "Worked on the live project 'Punarmilan' as a Frontend Developer. Handled frontend development, integrated APIs for dynamic functionality, and built responsive UI using HTML, CSS, Bootstrap, and JavaScript. Collaborated with the backend team for seamless integration."
        },
        {
            company: "Code Chakra Tech",
            role: "MERN Stack Intern",
            period: "Sept 2024 – Feb 2025",
            location: "Sangli",
            description: "Spearheaded the development of scalable full-stack applications. Integrated complex RESTful APIs and optimized MongoDB query performance by 40%. Collaborated in an agile environment to deliver user-centric features."
        }
    ];

    return (
        <div id="experience" ref={containerRef} className="py-16 md:py-32 bg-transparent transition-colors duration-700 relative overflow-hidden">
            {/* Background Decorative Text */}
            <div className="bg-text absolute top-0 md:top-[-5%] left-0 text-[4rem] sm:text-[15rem] md:text-[25rem] font-black text-orange-500/5 dark:text-orange-500/5 pointer-events-none select-none uppercase leading-none z-0 whitespace-nowrap">
                Experience
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-orange-600 dark:text-orange-500 font-black tracking-widest uppercase mb-4 text-xs md:text-sm">Professional Journey</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-gray-200">Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Futures</span></h3>
                    <div className="mt-4 text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
                        <span className="exp-counter">0</span>+ <span className="text-sm md:text-lg font-light text-gray-500 uppercase tracking-widest block md:inline">Months of Development</span>
                    </div>
                </div>

                <div className="timeline-container relative">
                    {/* Vertical Growth Line */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-1 h-full bg-gray-100 dark:bg-white/5" />
                    <div ref={lineRef} className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-orange-500 to-red-600 z-10 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />

                    {experiences.map((exp, index) => (
                        <div key={index} className="exp-item relative mb-24 last:mb-0 perspective-1000">
                            {/* Central Dot */}
                            <div className="exp-dot absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-white dark:bg-black border-4 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] z-20" />

                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full`}>
                                {/* Left/Right alternating logic based on index */}
                                <div className={`${index % 2 === 0 ? 'md:order-1 text-right md:pr-16' : 'md:order-2 md:pl-16'}`}>
                                    <Tilt
                                        options={{ max: 5, scale: 1.02, speed: 1000, skew: true, glare: true, "max-glare": 0.1 }}
                                        className="p-6 md:p-8 rounded-3xl glass border border-gray-100 dark:border-white/10 hover:border-orange-500/30 transition-all duration-300 shadow-2xl group transform-style-3d hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] ml-10 md:ml-0"
                                        onMouseEnter={() => soundManager.play('hover')}
                                    >
                                        <div className="flex flex-col gap-2 mb-4 transform translate-z-10 text-left md:contents">
                                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-orange-500">{exp.period}</span>
                                            <h4 className="text-xl md:text-2xl font-black">{exp.role}</h4>
                                            <p className="text-orange-400 font-bold text-base md:text-lg">{exp.company}</p>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed transform translate-z-5 text-left">
                                            {exp.description}
                                        </p>
                                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex gap-4 justify-start md:justify-end transform translate-z-5">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5">{exp.location}</span>
                                        </div>
                                    </Tilt>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
