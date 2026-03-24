import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { soundManager } from '../utils/sound';
import Magnetic from './Magnetic';
import ThemeToggle from './ThemeToggle';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Experience', id: 'experience' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (id) => {
        soundManager.play('click');
        const element = document.getElementById(id);
        if (element) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: element, offsetY: 80 },
                ease: "power4.inOut"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-3' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div
                        className="flex-shrink-0 cursor-pointer group"
                        onClick={() => handleNavClick('home')}
                        onMouseEnter={() => soundManager.play('hover')}
                    >
                        <span className="text-3xl font-black tracking-tighter italic group-hover:scale-110 transition-transform block text-orange-600 dark:text-orange-500">
                            PRUT<span className="text-gray-900 dark:text-white">HVI.</span>
                        </span>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-2">
                            {navLinks.map((link) => (
                                <Magnetic key={link.name}>
                                    <button
                                        onClick={() => handleNavClick(link.id)}
                                        onMouseEnter={() => soundManager.play('hover')}
                                        className="relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group overflow-hidden"
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                                    </button>
                                </Magnetic>
                            ))}
                            <div className="ml-4 flex items-center border-l border-gray-200 dark:border-white/10 pl-4">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <div className="w-6 h-5 relative flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`} />
                                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute inset-x-0 top-full w-full bg-white dark:bg-black border-b border-gray-100 dark:border-white/5 transition-all duration-500 ease-in-out ${isOpen ? 'h-screen opacity-100 translate-y-0' : 'h-0 opacity-0 -translate-y-10 overflow-hidden'}`}>
                <div className="flex flex-col items-center justify-center h-full px-6 space-y-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavClick(link.id)}
                            className="block w-full text-center text-2xl font-black uppercase tracking-[0.2em] text-gray-400 hover:text-orange-600 transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}
                    <div className="w-full pt-8 flex items-center justify-between border-t border-gray-100 dark:border-white/5">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Appearance</span>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
