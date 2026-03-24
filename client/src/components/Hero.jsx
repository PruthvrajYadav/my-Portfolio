import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../utils/sound';
import Magnetic from './Magnetic';
import { FaChevronDown, FaDownload } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const badgeRef = useRef(null);
    const [role, setRole] = useState('');

    useEffect(() => {
        // Typing animation
        const roles = ["MERN Stack Developer", "Frontend Developer", "Backend Developer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout;

        const type = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                setRole(currentRole.substring(0, charIndex - 1));
                charIndex--;
            } else {
                setRole(currentRole.substring(0, charIndex + 1));
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before new word
            }

            typingTimeout = setTimeout(type, typeSpeed);
        };

        type();

        const ctx = gsap.context(() => {
            // Intro animation
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(badgeRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.5 }
            );

            // Splitting title into characters for animation
            const titleChars = titleRef.current.innerText.split('');
            titleRef.current.innerHTML = titleChars.map(char => `<span class="char">${char}</span>`).join('');

            tl.fromTo(".char",
                { y: 100, opacity: 0, rotateX: -90 },
                { y: 0, opacity: 1, rotateX: 0, stagger: 0.05, duration: 1.5, ease: "expo.out" },
                "-=0.5"
            );

            tl.fromTo(".hero-cta",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
                "-=1"
            );

            // Scroll animations
            gsap.to(titleRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: 200,
                opacity: 0,
                scale: 0.8
            });

            // Floating Background Shapes
            gsap.to(".shape-1", {
                y: 100,
                x: 50,
                rotation: 360,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });

            gsap.to(".shape-2", {
                y: -150,
                x: -100,
                rotation: -360,
                duration: 25,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });

        }, containerRef);

        return () => {
            clearTimeout(typingTimeout);
            ctx.revert();
        };
    }, []);

    const scrollToAbout = () => {
        soundManager.play('click');
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            gsap.to(window, {
                duration: 2,
                scrollTo: { y: aboutSection, offsetY: 0 },
                ease: "power4.inOut"
            });
        }
    };

    return (
        <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Kinetic Grid / Shapes - Removed for Single Color Background */}
            <div className="absolute inset-0 z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div ref={badgeRef} className="mb-8 overflow-hidden inline-block">
                    <span className="inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/5 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-xs font-black tracking-[0.2em] uppercase animate-pulse shadow-[0_0_20px_rgba(249,115,22,0.1)] dark:shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                        Available for Work
                    </span>
                </div>

                <h1 ref={titleRef} className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black mb-6 tracking-tighter leading-none flex flex-wrap justify-center text-gray-900 dark:text-white">
                    Pruthviraj
                </h1>

                <div className="h-16 mb-8 flex justify-center items-center">
                    <span className="text-xl md:text-4xl font-light text-orange-600 dark:text-orange-400 font-mono">
                        {role}<span className="animate-pulse inline-block ml-1 h-6 md:h-8 w-1 bg-orange-600 dark:bg-orange-400" />
                    </span>
                </div>

                <div className="hero-cta flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                    <Magnetic>
                        <button
                            onClick={() => {
                                soundManager.play('click');
                                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                            }}
                            onMouseEnter={() => soundManager.play('hover')}
                            className="group relative w-full md:w-auto px-8 md:px-10 py-4 md:py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] overflow-hidden transition-transform active:scale-95"
                        >
                            <span className="relative z-10">View Projects</span>
                            <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </button>
                    </Magnetic>

                    <Magnetic>
                        <a
                            href="/pruthviraj_yadav.pdf"
                            download="Pruthviraj_Yadav_Resume.pdf"
                            onClick={() => soundManager.play('click')}
                            onMouseEnter={() => soundManager.play('hover')}
                            className="bg-transparent text-orange-600 dark:text-orange-400  w-full md:w-auto border border-gray-200 dark:border-white/10 hover:border-orange-500 transition-all px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center justify-center gap-2"
                        >
                            Get Resume <FaDownload className="text-[10px]" />
                        </a>
                    </Magnetic>

                    <Magnetic>
                        <button
                            onClick={() => {
                                soundManager.play('click');
                                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                            }}
                            onMouseEnter={() => soundManager.play('hover')}
                            className="bg-transparent text-gray-500 dark:text-gray-400 w-full md:w-auto border border-gray-100 dark:border-white/5 hover:border-gray-300 transition-all px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]"
                        >
                            Contact Me
                        </button>
                    </Magnetic>
                </div>

                {/* Scroll Indicator */}
                <div
                    onClick={scrollToAbout}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center group"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-orange-600 dark:via-orange-400 to-orange-600 dark:to-orange-400 mb-2" />
                    <FaChevronDown className="mt-2 text-orange-500 group-hover:translate-y-1 transition-transform animate-bounce" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
