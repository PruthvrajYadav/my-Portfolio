import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tilt } from 'react-tilt';
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub
} from 'react-icons/fa';
import {
    SiExpress, SiMongodb, SiPostman, SiTailwindcss, SiVite
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { soundManager } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const containerRef = useRef(null);

    const categories = [
        {
            title: "Frontend",
            skills: [
                { name: "React", icon: <FaReact className="text-blue-400" />, level: 90 },
                { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" />, level: 95 },
                { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, level: 85 },
                { name: "Vite", icon: <SiVite className="text-purple-500" />, level: 80 },
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 85 },
                { name: "Express", icon: <SiExpress className="text-gray-900 dark:text-white" />, level: 80 },
                { name: "Postman", icon: <SiPostman className="text-orange-500" />, level: 75 },
            ]
        },
        {
            title: "Database",
            skills: [
                { name: "MongoDB", icon: <SiMongodb className="text-green-400" />, level: 80 },
            ]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;

            // Background Text Parallax
            // Starts at left, stays there until section is centered, then moves right
            gsap.fromTo(".bg-text",
                { x: 0 },
                {
                    xPercent: 30,
                    opacity: 0.1,
                    scrollTrigger: {
                        trigger: container,
                        start: "top center",
                        end: "bottom top",
                        scrub: 1.5
                    }
                }
            );

            // 3D Card Reveal
            gsap.fromTo(".skill-category-card",
                { y: 100, rotateX: 30, opacity: 0, scale: 0.9, transformPerspective: 1000 },
                {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 75%",
                    }
                }
            );

            // Rotating icons inside rings
            gsap.to(".skill-icon-floating", {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="skills" ref={containerRef} className="py-16 md:py-24 bg-transparent relative transition-colors duration-700">
            {/* Background Decorative Text */}
            <div className="bg-text absolute top-0 md:top-[-5%] left-0 text-[5rem] sm:text-[15rem] md:text-[25rem] font-black text-orange-500/5 dark:text-orange-500/5 pointer-events-none select-none uppercase leading-none z-0 whitespace-nowrap">
                Skills
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-orange-600 dark:text-orange-500 font-black tracking-widest uppercase mb-4 text-xs md:text-sm">Expertise</h2>
                    <h3 className="text-3xl md:text-5xl font-black italic text-gray-800 dark:text-gray-200">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Arsenal</span></h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {categories.map((category, idx) => (
                        <div key={idx} className="skill-category-card">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-[2px] w-8 bg-orange-600" />
                                <h4 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">
                                    {category.title} {category.title === "Frontend" ? "Development" : category.title === "Backend" ? "Architecture" : "Management"}
                                </h4>
                            </div>

                            <div className="space-y-6">
                                {category.skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="skill-item group p-4 md:p-6 rounded-2xl glass border border-gray-100 dark:border-white/10 hover:border-orange-500/30 transition-all duration-500"
                                        onMouseEnter={() => soundManager.play('hover')}
                                    >
                                        <div className="flex items-center gap-6 mb-4">
                                            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                                {skill.icon}
                                            </div>
                                            <div className="flex-1 flex justify-between items-end">
                                                <h5 className="text-lg font-black uppercase tracking-tight text-gray-800 dark:text-gray-200">{skill.name}</h5>
                                                <span className="text-xs font-black text-orange-600 dark:text-orange-400">{skill.level}%</span>
                                            </div>
                                        </div>

                                        {/* Horizontal Progress Bar */}
                                        <div className="h-[2px] w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-1000 ease-out"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;
