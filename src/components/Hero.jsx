import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Clock, Search, X, Loader2 } from 'lucide-react';
import { fetchLocations } from '../utils/api';

const Hero = ({ setLocationId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [locations, setLocations] = useState({ countries: {}, states: {}, cities: {} });
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const loadLocations = async () => {
            setIsLoading(true);
            try {
                const data = await fetchLocations();
                setLocations(data);
            } catch (err) {
                console.error("Failed to load locations", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadLocations();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const filtered = [];

        // Search in cities (most likely what users search for)
        Object.entries(locations.cities).forEach(([id, name]) => {
            if (name.toLowerCase().includes(query.toLowerCase())) {
                filtered.push({ id, name, type: 'City' });
            }
        });

        // Search in states
        Object.entries(locations.states).forEach(([id, name]) => {
            if (name !== '-' && name.toLowerCase().includes(query.toLowerCase())) {
                filtered.push({ id, name, type: 'State' });
            }
        });

        // Search in countries
        Object.entries(locations.countries).forEach(([id, name]) => {
            if (name.toLowerCase().includes(query.toLowerCase())) {
                filtered.push({ id, name, type: 'Country' });
            }
        });

        setSuggestions(filtered.slice(0, 10)); // Limit to 10 suggestions
        setShowSuggestions(true);
    };

    const handleSelect = (loc) => {
        setLocationId(loc.id);
        setSearchQuery(loc.name);
        setShowSuggestions(false);
        // Smooth scroll to results
        document.getElementById('prayer-times')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" id="home">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                    <Clock className="text-emerald-400" size={16} />
                    <span className="text-sm font-medium text-slate-300">Accurate Prayer Times Worldwide</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight">
                    Stay Connected to Your <br />
                    <span className="gradient-text">Spiritual Journey</span>
                </h1>

                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Experience the most precise prayer timings with our advanced calculation methods.
                    Beautifully designed for your daily peace and devotion.
                </p>

                <div className="flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto" ref={searchRef}>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            {isLoading ? (
                                <Loader2 className="text-emerald-500 animate-spin" size={20} />
                            ) : (
                                <Search className="text-slate-500" size={20} />
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Search your city, state or country..."
                            className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-12 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all font-medium text-lg placeholder:text-slate-600 backdrop-blur-md"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => { setSearchQuery(''); setSuggestions([]); }}
                                className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl backdrop-blur-xl">
                                {suggestions.map((loc, index) => (
                                    <button
                                        key={`${loc.type}-${loc.id}-${index}`}
                                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-emerald-500/10 text-left transition-colors border-b border-white/5 last:border-0"
                                        onClick={() => handleSelect(loc)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <MapPin size={18} className="text-emerald-400" />
                                            <span className="text-white font-medium">{loc.name}</span>
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded">
                                            {loc.type}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {showSuggestions && searchQuery.length >= 2 && suggestions.length === 0 && !isLoading && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-[#1e293b] border border-white/10 rounded-2xl p-6 z-50 shadow-2xl text-center">
                                <p className="text-slate-400">No locations found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                        <button
                            onClick={() => document.getElementById('prayer-times')?.scrollIntoView({ behavior: 'smooth' })}
                            className="glow-button w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all"
                        >
                            <span>View Times</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Hero Stats/Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-white/5">
                    {[
                        { label: 'Calculations', value: 'Dynamic' },
                        { label: 'Precision', value: 'High' },
                        { label: 'Reliability', value: '100%' },
                        { label: 'Themes', value: 'Modern' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
