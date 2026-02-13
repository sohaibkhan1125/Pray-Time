import React from 'react';
import { Moon, Facebook, Twitter, Instagram, Mail, ChevronRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-white/10 bg-[#0f172a]">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <Moon className="text-white fill-white" size={24} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">Pray<span className="text-emerald-500">Time</span></span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Providing accurate and reliable prayer times for the global Muslim community. Designed with devotion and precision.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Facebook, url: 'https://facebook.com' },
                                { Icon: Twitter, url: 'https://twitter.com' },
                                { Icon: Instagram, url: 'https://instagram.com' }
                            ].map(({ Icon, url }, i) => (
                                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'Prayer Times', 'Qibla Finder', 'Islamic Calendar'].map((link) => (
                                <li key={link}>
                                    <a href="/" className="text-slate-400 hover:text-emerald-400 flex items-center group transition-colors">
                                        <ChevronRight size={16} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Resources</h4>
                        <ul className="space-y-4">
                            {['Calculation Methods', 'Privacy Policy', 'Terms of Use', 'FAQ'].map((link) => (
                                <li key={link}>
                                    <a href="/" className="text-slate-400 hover:text-emerald-400 flex items-center group transition-colors">
                                        <ChevronRight size={16} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Stay Updated</h4>
                        <p className="text-slate-400 mb-6 font-medium">Get notifications for prayer times and Islamic events.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                            <button className="absolute right-2 top-2 bg-emerald-500 p-2 rounded-lg hover:bg-emerald-600 transition-colors">
                                <Mail size={20} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-500 text-sm font-medium">
                    <p>© {currentYear} PrayTime App. All rights reserved.</p>
                    <div className="flex space-x-8">
                        <a href="/" className="hover:text-emerald-400 transition-colors">Privacy</a>
                        <a href="/" className="hover:text-emerald-400 transition-colors">Terms</a>
                        <a href="/" className="hover:text-emerald-400 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
