import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';


gsap.registerPlugin(ScrollTrigger);

function App() {
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const appRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Synchronize ScrollTrigger with Lenis
        lenis.on('scroll', (e) => {
            ScrollTrigger.update();
            const progress = (e.animatedScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setScrollProgress(progress);
        });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Section Color Change Logic for Spotlight
        const sections = [
            { id: "#home", color: "rgba(16, 185, 129, 0.3)" },       // Emerald
            { id: "#about", color: "rgba(5, 150, 105, 0.3)" },       // Forest
            { id: "#skills", color: "rgba(20, 184, 166, 0.3)" },     // Teal
            { id: "#experience", color: "rgba(101, 163, 13, 0.3)" }, // Lime
            { id: "#projects", color: "rgba(16, 185, 129, 0.3)" },   // Emerald
            { id: "#education", color: "rgba(5, 150, 105, 0.3)" },   // Forest
            { id: "#contact", color: "rgba(16, 185, 129, 0.3)" }     // Emerald
        ];

        const updateSpotlightColor = (color) => {
            const isDark = document.documentElement.classList.contains('dark');
            // For light mode, make colors more subtle/pastel to avoid harshness
            const themedColor = isDark ? color : color.replace('0.3', '0.1');
            document.documentElement.style.setProperty('--spotlight-color', themedColor);
        };

        sections.forEach(({ id, color }) => {
            ScrollTrigger.create({
                trigger: id,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => updateSpotlightColor(color),
                onEnterBack: () => updateSpotlightColor(color),
            });
        });

        // Handle manual theme toggle event to update spotlight immediately
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    // Re-trigger color update based on current scroll position
                    const activeSection = sections.find(s => {
                        const el = document.querySelector(s.id);
                        if (!el) return false;
                        const rect = el.getBoundingClientRect();
                        return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
                    }) || sections[0];
                    updateSpotlightColor(activeSection.color);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => {
            lenis.destroy();
            gsap.ticker.remove(raf);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {loading && <Loader setLoading={setLoading} />}
            <div ref={appRef} className="bg-[var(--bg-color)] min-h-screen text-black dark:text-white transition-colors duration-700 selection:bg-blue-500/30">
                <div
                    className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 z-[1000] shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                    style={{ width: `${scrollProgress}%` }}
                />
                <Cursor />
                <Navbar />
                <main className="relative overflow-hidden">
                    <Hero />
                    <About />
                    <Skills />
                    <Experience />
                    <Projects />
                    <Education />
                    <Contact />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
