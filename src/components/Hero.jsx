import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, CheckCircle2, Cloud, Sun, Moon } from 'lucide-react';
import { fetchPrayerTimes, searchLocations } from '../utils/api';
import { convertTo12Hour } from '../utils/time';

const Hero = ({ location, setLocation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [prayerData, setPrayerData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const searchRef = useRef(null);

    useEffect(() => {
        const loadTimes = async () => {
            if (!location?.lat || !location?.lon) return;
            setIsLoading(true);
            try {
                const data = await fetchPrayerTimes({
                    lat: location.lat,
                    lon: location.lon
                });
                setPrayerData(data);
            } catch (err) {
                console.error("Failed to load prayer times", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadTimes();
    }, [location]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
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

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const results = await searchLocations(query);
            setSuggestions(results);
            setShowSuggestions(true);
        } catch (err) {
            console.error("Search failed", err);
        }
    };

    const handleSelect = (loc) => {
        setLocation({
            lat: loc.lat,
            lon: loc.lon,
            name: loc.fullDisplayName
        });
        setSearchQuery('');
        setShowSuggestions(false);
    };

    const times = prayerData?.times;
    const hijri = prayerData?.date?.hijri;
    const gregorian = prayerData?.date?.gregorian;
    const qibla = prayerData?.qibla;

    const hijriDate = hijri ? `${hijri.day} ${hijri.month.en} ${hijri.year}` : "Loading...";
    const gregorianDate = gregorian ? `${gregorian.weekday.en}, ${gregorian.day} ${gregorian.month.en} ${gregorian.year}` : "Loading...";

    const prayers = [
        { name: 'Fajr', time: times?.Fajr || '05:36', icon: <Cloud className="text-blue-400" size={20} /> },
        { name: 'Dhuhr', time: times?.Dhuhr || '12:36', icon: <Sun className="text-yellow-500" size={20} /> },
        { name: 'Asr', time: times?.Asr || '15:48', icon: <Cloud className="text-blue-300" size={20} /> },
        { name: 'Maghrib', time: times?.Maghrib || '18:16', icon: <Sun className="text-orange-500" size={20} /> },
        { name: 'Isha', time: times?.Isha || '19:30', icon: <Moon className="text-indigo-400" size={20} /> },
    ];

    // Simple "Now" logic for frontend display
    const currentHourMin = currentTime.getHours() * 60 + currentTime.getMinutes();
    let activeIndex = -1;

    if (times) {
        const timesInMin = prayers.map(p => {
            const [h, m] = p.time.split(':').map(Number);
            return h * 60 + m;
        });
        for (let i = timesInMin.length - 1; i >= 0; i--) {
            if (currentHourMin >= timesInMin[i]) {
                activeIndex = i;
                break;
            }
        }
    }

    return (
        <div className="relative pt-12 pb-24 bg-[#0f172a] overflow-hidden min-h-[600px] flex flex-col justify-center">
            {/* Skyline Background Placeholder */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] opacity-10 pointer-events-none select-none overflow-hidden text-slate-400">
                <div className="flex items-end justify-center space-x-4 h-full">
                    {[40, 60, 80, 50, 90, 70, 100, 60, 40].map((h, i) => (
                        <div key={i} className="bg-slate-600/50 w-12 rounded-t-lg" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-white">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                    <div className="space-y-2">
                        <p className="text-slate-400 font-medium">Prayer Times in</p>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-6">
                            {location.name}
                        </h1>
                        <div className="relative max-w-md" ref={searchRef}>
                            <div className="flex items-center bg-white/5 rounded-full px-4 py-3 shadow-inner border border-white/10">
                                <Search className="text-slate-400 mr-3" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search city (e.g. Dubai, London)"
                                    className="bg-transparent border-none focus:outline-none w-full text-white placeholder:text-slate-500"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                />
                            </div>
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden z-50 shadow-2xl">
                                    {suggestions.map((loc, index) => (
                                        <button
                                            key={`${loc.id}-${index}`}
                                            className="w-full flex items-center px-4 py-3 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0"
                                            onClick={() => handleSelect(loc)}
                                        >
                                            <MapPin size={16} className="text-[#00b894] mr-3 flex-shrink-0" />
                                            <span className="text-slate-300 text-sm line-clamp-1">{loc.fullDisplayName}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:text-right space-y-4 w-full md:w-auto">
                        <p className="text-slate-300 font-medium text-lg">
                            {gregorianDate} | {hijriDate}
                        </p>
                        {qibla && (
                            <div className="flex items-center md:justify-end gap-2 text-[#00b894] bg-white/5 px-4 py-2 rounded-full w-fit md:ml-auto border border-white/10">
                                <MapPin size={18} fill="currentColor" className="text-white bg-[#00b894] rounded-full" />
                                <span className="text-sm font-semibold text-white">
                                    Qibla: {qibla.direction.degrees}° {qibla.direction.from}
                                </span>
                            </div>
                        )}
                        <div className="bg-[#482860] text-white px-6 py-3 rounded-full flex items-center gap-4 w-fit md:ml-auto shadow-lg">
                            <span className="font-medium whitespace-nowrap">
                                Imsak {times?.Imsak ? convertTo12Hour(times.Imsak).toLowerCase() : '...'} |
                                Iftar {times?.Maghrib ? convertTo12Hour(times.Maghrib).toLowerCase() : '...'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Prayer Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-12">
                    {prayers.map((prayer, index) => {
                        const isNow = index === activeIndex;
                        const time12hr = convertTo12Hour(prayer.time).toLowerCase().replace(' ', '');

                        return (
                            <div
                                key={prayer.name}
                                className={`
                                    relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center transition-all duration-300
                                    ${isNow ? 'ring-4 ring-[#00b894] scale-105 shadow-2xl z-20 bg-white/10' : 'shadow-md hover:bg-white/10'}
                                `}
                            >
                                {isNow && (
                                    <div className="absolute top-4 left-4 bg-[#00b894]/20 text-[#00b894] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                                        Now
                                    </div>
                                )}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">{prayer.name}</span>
                                    {prayer.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                    {time12hr}
                                </div>
                                {index === activeIndex + 1 && (
                                    <div className="mt-4 text-emerald-400/80 text-sm font-medium">
                                        Next Prayer
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );
};

export default Hero;

