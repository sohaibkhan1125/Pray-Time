import React, { useState, useEffect } from 'react';
import { Clock, Calendar, MapPin, Loader2 } from 'lucide-react';
import { fetchPrayerTimes } from '../utils/api';
import { convertTo12Hour } from '../utils/time';

const PrayerTimes = ({ location }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTimes = async () => {
            if (!location?.lat || !location?.lon) return;
            setLoading(true);
            try {
                const result = await fetchPrayerTimes({
                    lat: location.lat,
                    lon: location.lon
                });
                setData(result);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getTimes();
    }, [location]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="text-[#00b894] animate-spin" size={48} />
                <p className="text-slate-400 font-medium">Fetching prayer times...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl inline-block">
                    <p className="text-red-400 font-medium">Error: {error || 'Unable to load data'}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 text-[#00b894] underline font-medium">Try Again</button>
                </div>
            </div>
        );
    }

    const times = data.times;
    const hijri = data.date.hijri;
    const gregorian = data.date.gregorian;

    const prayerIcons = {
        Fajr: '🌅',
        Sunrise: '☀️',
        Dhuhr: '🕛',
        Asr: '🌇',
        Maghrib: '🌆',
        Isha: '🌙'
    };

    const prayerNames = {
        Fajr: 'Fajr',
        Sunrise: 'Sunrise',
        Dhuhr: 'Dhuhr',
        Asr: 'Asr',
        Maghrib: 'Maghrib',
        Isha: 'Isha'
    };

    return (
        <section className="py-24 max-w-7xl mx-auto px-6" id="prayer-times">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                        Prayer Timings in <span className="text-[#00b894]">{location.name.split(',')[0]}</span>
                    </h2>
                    <div className="flex items-center space-x-6 text-slate-400">
                        <div className="flex items-center space-x-2">
                            <Calendar size={18} className="text-[#00b894]" />
                            <span>{gregorian.day} {gregorian.month.en} {gregorian.year}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin size={18} className="text-[#00b894]" />
                            <span className="line-clamp-1">{location.name}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl shadow-sm">
                    <span className="text-slate-400 text-sm">Hijri Date:</span>
                    <span className="ml-2 font-bold text-[#00b894]">{hijri.day} {hijri.month.en} {hijri.year}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(prayerNames).map(([key, name]) => (
                    <div key={key} className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col items-center justify-center text-center space-y-4 group hover:border-[#00b894] transition-all duration-300 shadow-sm hover:shadow-md">
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                            {prayerIcons[key]}
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{name}</h3>
                            <p className="text-3xl font-black text-white tracking-tight">
                                {times[key] ? convertTo12Hour(times[key]) : '--:--'}
                            </p>
                        </div>
                        <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-[#00b894] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Note about real-time data */}
            <div className="mt-12 text-center p-6 bg-[#00b894]/5 border border-[#00b894]/20 rounded-3xl">
                <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                    All times are calculated based on your coordinates using the IslamicAPI service.
                </p>
            </div>
        </section>
    );
};

export default PrayerTimes;

