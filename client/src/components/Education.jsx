import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { soundManager } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".edu-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(".edu-reveal",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Background Text Parallax
            gsap.fromTo(".bg-text",
                { x: 0 },
                {
                    xPercent: 30,
                    opacity: 0.1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const education = [
        {
            degree: "Bachelor of Science in Information Technology",
            school: "Suman Education Society's (LN College)",
            period: "2021 – 2024",
            location: "Borivali East, Mumbai",
            description: "Specialized in software development, database management, and web technologies. Graduated with a strong foundation in modern IT infrastructure and application design."
        },
        {
            degree: "Higher Secondary Education (HSC)",
            school: "St. Lawrence Jr College (Borivali)",
            period: "2019 – 2021",
            location: "Borivali West, Mumbai",
            description: "Focused on Science stream with Information Technology as a major elective. Developed early interest in programming and logic."
        }
    ];

    return (
        <section id="education" ref={containerRef} className="py-24 bg-transparent relative overflow-hidden transition-colors duration-700">
            {/* Background Decorative Text */}
            <div className="bg-text absolute top-0 md:top-[-5%] left-0 text-[5rem] sm:text-[15rem] md:text-[25rem] font-black text-orange-500/5 dark:text-orange-500/5 pointer-events-none select-none uppercase leading-none z-0 whitespace-nowrap">
                Learn
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="edu-reveal text-orange-600 dark:text-orange-500 font-black tracking-widest uppercase mb-4 text-sm">Academic Background</h2>
                    <h3 className="edu-reveal text-4xl md:text-5xl font-black italic text-gray-800 dark:text-gray-200">Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">Journey</span></h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {education.map((item, index) => (
                        <div
                            key={index}
                            className="edu-card group p-8 rounded-[2.5rem] glass border border-gray-100 dark:border-white/10 hover:border-orange-500/30 transition-all duration-500 shadow-xl"
                            onMouseEnter={() => soundManager.play('hover')}
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 text-3xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                    <FaGraduationCap />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-4 mb-3">
                                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-500/5 px-3 py-1 rounded-full border border-orange-500/10">
                                            <FaCalendarAlt /> {item.period}
                                        </span>
                                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            <FaMapMarkerAlt /> {item.location}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-black mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">{item.degree}</h4>
                                    <p className="text-orange-600 dark:text-orange-500 font-bold mb-4">{item.school}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium italic">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Line */}
                            <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-100 dark:via-white/5 to-transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
