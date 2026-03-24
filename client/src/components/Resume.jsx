import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaDownload, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import { soundManager } from '../utils/sound';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Resume = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const el = containerRef.current;

            // Section Reveal
            gsap.fromTo(".resume-reveal",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    }
                }
            );

            // Floating Light effect
            gsap.to(".resume-light", {
                x: "random(-50, 50)",
                y: "random(-50, 50)",
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="resume" ref={containerRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden transition-colors duration-700">
            {/* Background Decorative Text */}
            <div className="bg-text absolute top-0 right-0 text-[10rem] sm:text-[15rem] md:text-[25rem] font-black text-orange-500/5 dark:text-orange-500/5 pointer-events-none select-none uppercase leading-none z-0 whitespace-nowrap">
                CV
            </div>

            {/* Subtle Light Effect */}
            <div className="resume-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="mb-16">
                    <h2 className="resume-reveal text-orange-600 dark:text-orange-500 font-black tracking-widest uppercase mb-4 text-sm">Resume & CV</h2>
                    <h3 className="resume-reveal text-4xl md:text-6xl font-black text-gray-800 dark:text-gray-200">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 italic">Professional</span> Story
                    </h3>
                </div>

                <div className="resume-reveal flex flex-col items-center justify-center gap-12 max-w-3xl mx-auto p-12 rounded-[2.5rem] glass border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-3xl bg-orange-500/10 text-orange-500 text-5xl md:text-6xl mb-6">
                            <FaFilePdf />
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg animate-bounce">
                            <FaDownload className="text-sm" />
                        </div>
                    </div>

                    <div className="text-center">
                        <h4 className="text-2xl md:text-3xl font-black mb-4">Pruthviraj Yadav - Resume</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                            A comprehensive overview of my experience, projects, and technical expertise in the MERN Stack. 
                            Download the PDF to learn more about my journey.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Magnetic>
                            <a
                                href="/resume.pdf"
                                download="Pruthviraj_Yadav_Resume.pdf"
                                onClick={() => soundManager.play('click')}
                                onMouseEnter={() => soundManager.play('hover')}
                                className="group relative px-10 py-5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl shadow-orange-500/30 hover:scale-105 transition-all"
                            >
                                <FaDownload className="group-hover:translate-y-1 transition-transform" />
                                <span>Download PDF</span>
                            </a>
                        </Magnetic>

                        <Magnetic>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => soundManager.play('click')}
                                onMouseEnter={() => soundManager.play('hover')}
                                className="px-10 py-5 glass border border-gray-100 dark:border-white/10 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                            >
                                <FaExternalLinkAlt />
                                <span>Preview CV</span>
                            </a>
                        </Magnetic>
                    </div>
                </div>

                <div className="resume-reveal mt-16 text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                    Curious about the tech stack? Check the <a href="#skills" className="text-orange-500 underline underline-offset-4">Skills Section</a>
                </div>
            </div>
        </section>
    );
};

export default Resume;
