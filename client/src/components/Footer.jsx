import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedin, FaRocket } from 'react-icons/fa';
import { soundManager } from '../utils/sound';
import Magnetic from './Magnetic';

const Footer = () => {

    const scrollToTop = () => {
        soundManager.play('click');
        gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power4.inOut" });

        // Rocket flight animation
        gsap.to(".rocket-icon", {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power4.in",
            onComplete: () => {
                gsap.set(".rocket-icon", { y: 0, opacity: 1 });
            }
        });
    };

    return (
        <footer className="relative bg-transparent pt-24 pb-12 transition-colors duration-700 overflow-hidden border-t border-gray-100 dark:border-white/5">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 items-center text-center md:text-left mb-16">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4 italic">
                            PRUT<span className="text-orange-600">HVI.</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs leading-loose">
                            Crafting innovative digital solutions with a focus on impact and elegance.
                        </p>
                    </div>

                    <div className="flex justify-center gap-8">
                        <Magnetic>
                            <a
                                href="https://github.com/PruthvrajYadav"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col items-center gap-2"
                                onMouseEnter={() => soundManager.play('hover')}
                            >
                                <div className="w-14 h-14 flex items-center justify-center rounded-2xl glass border border-gray-100 dark:border-white/10 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                    <FaGithub className="text-2xl" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="https://www.linkedin.com/in/pruthviraj-yadav-222303315?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col items-center gap-2"
                                onMouseEnter={() => soundManager.play('hover')}
                            >
                                <div className="w-14 h-14 flex items-center justify-center rounded-2xl glass border border-gray-100 dark:border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                    <FaLinkedin className="text-2xl" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                            </a>
                        </Magnetic>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6">
                        <button
                            onClick={scrollToTop}
                            className="group relative flex items-center gap-4 px-8 py-4 glass border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all active:scale-95"
                        >
                            <span className="text-sm font-black uppercase tracking-widest">Blast Off To Top</span>
                            <div className="rocket-icon text-orange-600 group-hover:animate-bounce">
                                <FaRocket />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center md:text-left">
                        © 2025 ALL RIGHTS RESERVED BY <span className="text-orange-600">PRUTHVIRAJ YADAV</span>
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
