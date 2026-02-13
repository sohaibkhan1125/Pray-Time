import React, { useState, useEffect } from 'react';
import { Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/10' : 'py-6 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Moon className="text-white fill-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Pray<span className="text-emerald-500">Time</span></span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {['Home', 'Prayer Times', 'Qibla', 'FAQ'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">
                            {item}
                        </a>
                    ))}
                    <button className="glow-button bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all">
                        Get Started
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300">
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#1e293b] border-b border-white/10 py-6 px-6 space-y-4 shadow-2xl">
                    {['Home', 'Prayer Times', 'Qibla', 'FAQ'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block text-lg font-medium text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>
                            {item}
                        </a>
                    ))}
                    <button className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold">
                        Get Started
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
