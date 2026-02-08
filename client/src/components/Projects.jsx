import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tilt } from 'react-tilt';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { soundManager } from '../utils/sound';
import { useParallax } from '../hooks/useParallax';
import { useBatchReveal } from '../hooks/useBatchReveal';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const containerRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: "Online Blogging System",
            category: "Full Stack Web App",
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?fit=crop&w=800&q=80",
            description: "Developed a full-stack web application that allows users to create, edit, and manage blog posts with user authentication, rich text editing, and responsive UI. Implemented RESTful APIs for CRUD operations and integrated MongoDB for data storage.",
            tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
            github: "https://github.com",
            live: "https://simple-blog-website-two.vercel.app/",
            color: "from-purple-500 to-indigo-600"
        },
        {
            id: 2,
            title: "Fitness Trainee Website",
            category: "Frontend Web App",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?fit=crop&w=800&q=80",
            description: "Developed a responsive fitness website using HTML, CSS, and React to provide users with information about workouts, trainers, and fitness plans. Designed multiple sections such as Home, Services, Workout Plans, Trainers, and Contact with modern UI/UX.",
            tech: ["React.js", "Tailwind CSS", "Framer Motion"],
            github: "https://github.com/PruthvrajYadav",
            live: "https://fitness-website-iota-ivory.vercel.app/",
            color: "from-orange-400 to-red-500"
        }
    ];

    // Background Text Parallax (Left to Right Sweep)
    React.useEffect(() => {
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

    useBatchReveal(containerRef, ".project-card", { start: "top 80%" }, {
        from: { opacity: 0, scale: 0.9, y: 100, rotateX: 10, willChange: "transform, opacity, rotateX" },
        to: { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.2, ease: "expo.out" }
    });

    const openModal = (project) => {
        soundManager.play('click');
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';

        // Modal Entrance Animation
        setTimeout(() => {
            gsap.fromTo(".modal-content",
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
            );
            gsap.fromTo(".modal-tag",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, delay: 0.3 }
            );
        }, 10);
    };

    const closeModal = () => {
        soundManager.play('click');
        gsap.to(".modal-content", {
            scale: 0.8, opacity: 0, y: 20, duration: 0.4,
            onComplete: () => {
                setSelectedProject(null);
                document.body.style.overflow = 'auto';
            }
        });
    };

    return (
        <div id="projects" ref={containerRef} className="py-24 bg-transparent relative transition-colors duration-700 overflow-hidden">
            {/* Background Decorative Text */}
            <div className="bg-text absolute top-0 md:top-[-5%] left-0 text-[5rem] sm:text-[15rem] md:text-[25rem] font-black text-orange-500/5 dark:text-orange-500/5 pointer-events-none select-none uppercase leading-none z-0 whitespace-nowrap">
                Works
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-orange-600 dark:text-orange-500 font-black tracking-widest uppercase mb-4 text-sm">Portfolio</h2>
                    <h3 className="text-4xl md:text-5xl font-black italic text-gray-800 dark:text-gray-200">Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Creations</span></h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card group p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass border border-gray-100 dark:border-white/10 hover:border-orange-500/30 transition-all duration-500 shadow-xl relative overflow-hidden flex flex-col"
                            onMouseEnter={() => soundManager.play('hover')}
                        >
                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                                {/* Rounded Project Thumbnail */}
                                <div className="w-full lg:w-40 aspect-square flex-shrink-0 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group-hover:scale-105 transition-transform duration-700 relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-4 mb-3">
                                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-500/5 px-3 py-1 rounded-full border border-orange-500/10">
                                            {project.category}
                                        </span>
                                        <div className="flex gap-2">
                                            {project.tech.slice(0, 2).map((t, i) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h4 className="text-2xl font-black mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors uppercase tracking-tight">{project.title}</h4>

                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium italic mb-6 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => openModal(project)}
                                            className="px-6 py-3 bg-orange-600/10 hover:bg-orange-600 text-orange-600 hover:text-white border border-orange-600/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
                                        >
                                            Details
                                        </button>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-5 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-xl transition-all flex items-center justify-center border border-transparent hover:border-orange-500/30"
                                        >
                                            <FaGithub size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Line like in Education */}
                            <div className="mt-auto pt-8">
                                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-100 dark:via-white/5 to-transparent" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cinematic Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeModal} />

                    <div className="modal-content relative bg-white dark:bg-[#0a0a0a] rounded-[2rem] md:rounded-[40px] max-w-4xl w-full p-6 sm:p-10 md:p-16 shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden my-auto">
                        {/* Background Decoration */}
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />

                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-orange-500 transition-colors z-20"
                        >
                            <FaTimes size={24} className="md:w-8 md:h-8" />
                        </button>

                        <div className="grid md:grid-cols-2 gap-12 relative z-10">
                            <div>
                                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8">
                                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex gap-2 sm:gap-4 mt-4 md:mt-0">
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        onMouseEnter={() => soundManager.play('hover')}
                                        onClick={() => soundManager.play('click')}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 md:px-8 md:py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl md:rounded-2xl text-gray-900 dark:text-white font-black text-xs md:text-base transition-all"
                                    >
                                        <FaGithub /> CODE
                                    </a>
                                    <a
                                        href={selectedProject.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        onMouseEnter={() => soundManager.play('hover')}
                                        onClick={() => soundManager.play('click')}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 md:px-8 md:py-4 bg-orange-600 hover:bg-orange-700 rounded-xl md:rounded-2xl text-white font-black text-xs md:text-base transition-all shadow-xl shadow-orange-500/20"
                                    >
                                        <FaExternalLinkAlt /> LIVE
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <span className="text-orange-500 font-black tracking-widest uppercase text-xs mb-2 block">{selectedProject.category}</span>
                                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">
                                    {selectedProject.title}
                                </h3>

                                <div className="mb-8">
                                    <h4 className="text-sm font-black uppercase tracking-widest mb-3 text-gray-400">Mission</h4>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-gray-400">Weaponry</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map((t, i) => (
                                            <span key={i} className="modal-tag px-4 py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl text-xs font-black border border-orange-500/20">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
