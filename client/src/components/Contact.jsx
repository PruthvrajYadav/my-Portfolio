import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaPaperPlane, FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import { soundManager } from '../utils/sound';
import Magnetic from './Magnetic';
import RippleButton from './RippleButton';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const containerRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const el = containerRef.current;

            // Background Text Parallax (Left to Right Sweep)
            gsap.to(".bg-text", {
                xPercent: 30,
                opacity: 0.08,
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            // Section Header & Info Reveal
            gsap.fromTo(".contact-reveal",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 75%",
                    }
                }
            );

            // Form Inputs Cascade Reveal
            if (formRef.current) {
                const inputs = formRef.current.querySelectorAll("input, textarea, button");
                gsap.fromTo(inputs,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: "top 80%"
                        }
                    }
                );
            }

            // Moving gradient light effect
            gsap.to(".contact-light", {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        soundManager.play('click');

        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            soundManager.play('theme'); // Play a pleasant completion sound

            // Trigger success animation
            gsap.fromTo(".success-mark",
                { scale: 0, rotate: -180 },
                { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }
            );

            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <div id="contact" ref={containerRef} className="py-24 bg-transparent relative transition-colors duration-700 overflow-hidden">
            {/* Background Decorative Text */}
            <div className="bg-text absolute top-0 md:top-[-2%] left-2 md:left-[-5%] text-[5rem] sm:text-[15rem] md:text-[25rem] font-black text-orange-500/5 dark:text-orange-500/5 pointer-events-none select-none uppercase leading-none z-0 whitespace-nowrap">
                Hello
            </div>

            {/* Moving Gradient Lights */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="contact-light absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
                <div className="contact-light absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="contact-reveal text-orange-600 dark:text-orange-500 font-black tracking-widest uppercase mb-4 text-sm">Get In Touch</h2>
                    <h3 className="contact-reveal text-4xl md:text-5xl font-black italic text-gray-800 dark:text-gray-200">Let’s Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Something Legendary</span></h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div className="contact-reveal group cursor-default">
                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                                Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
                                I’m currently looking for <span className="font-black text-gray-900 dark:text-white">new opportunities</span> and collaborations.
                            </p>

                            <div className="space-y-6">
                                <a
                                    href="mailto:pruthvirajyadav703@gmail.com"
                                    className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl md:rounded-3xl glass border border-gray-100 dark:border-white/10 hover:border-orange-500/30 transition-all duration-300 group/item"
                                    onMouseEnter={() => soundManager.play('hover')}
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 text-xl md:text-2xl group-hover/item:scale-125 transition-transform">
                                        <FaEnvelope />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Me</p>
                                        <p className="text-sm md:text-lg font-black dark:text-white break-all">pruthvirajyadav703@gmail.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl md:rounded-3xl glass border border-gray-100 dark:border-white/10 hover:border-red-500/30 transition-all duration-300 group/item">
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 text-xl md:text-2xl group-hover/item:scale-125 transition-transform">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</p>
                                        <p className="text-sm md:text-lg font-black dark:text-white">Sangli, Maharashtra</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="contact-reveal flex flex-wrap gap-4 md:gap-6">
                            {[
                                { icon: <FaGithub />, link: "https://github.com/PruthvrajYadav", color: "hover:bg-gray-800" },
                                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/pruthviraj-yadav-222303315?utm_source=share_via&utm_content=profile&utm_medium=member_android", color: "hover:bg-blue-700" }
                            ].map((social, i) => (
                                <Magnetic key={i}>
                                    <a
                                        href={social.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl glass border border-gray-100 dark:border-white/10 ${social.color} hover:text-white text-xl md:text-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
                                        onMouseEnter={() => soundManager.play('hover')}
                                    >
                                        {social.icon}
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-reveal relative">
                        <div className="p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] glass border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden">
                            {status === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
                                    <FaCheckCircle className="success-mark text-7xl text-green-500 mb-6" />
                                    <h4 className="text-3xl font-black mb-2 uppercase tracking-widest">Sent Successfully!</h4>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">I’ll get back to you shortly.</p>
                                    <button
                                        onClick={() => setStatus('')}
                                        className="mt-10 text-orange-500 font-black uppercase tracking-widest text-sm border-b-2 border-orange-500 pb-1"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="relative group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block ml-2">Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-white/10 outline-none transition-all text-gray-900 dark:text-white font-black placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                                placeholder="JACK SPARROW"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 block ml-2">Your Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-white/10 outline-none transition-all text-gray-900 dark:text-white font-black placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                                placeholder="JACK@PEARL.COM"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 block ml-2">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-white/10 outline-none transition-all text-gray-900 dark:text-white font-black placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                            placeholder="NEW ADVENTURE"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 block ml-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-white/10 outline-none transition-all text-gray-900 dark:text-white font-black placeholder:text-gray-300 dark:placeholder:text-gray-600 resize-none"
                                            placeholder="CAPTAIN, I HAVE AN IDEA..."
                                        ></textarea>
                                    </div>

                                    <RippleButton
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full group relative overflow-hidden px-8 py-5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] shadow-2xl shadow-orange-500/20 disabled:opacity-50"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            {status === 'sending' ? 'TRANSMITTING...' : (
                                                <>LAUNCH MESSAGE <FaPaperPlane className="text-sm group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></>
                                            )}
                                        </span>
                                        {/* Ripple/Slide Background Effect */}
                                        <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </RippleButton>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
