import React, { useState, useEffect } from 'react';
import { Clock, Calendar, MapPin, Loader2 } from 'lucide-react';
import { fetchPrayerTimes } from '../utils/api';
import { convertTo12Hour } from '../utils/time';

const PrayerTimes = ({ locationId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTimes = async () => {
            setLoading(true);
            try {
                const result = await fetchPrayerTimes(locationId);
                setData(result);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (locationId) {
            getTimes();
        }
    }, [locationId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="text-emerald-500 animate-spin" size={48} />
                <p className="text-slate-400 font-medium">Fetching prayer times...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl inline-block">
                    <p className="text-red-400 font-medium">Error: {error || 'Unable to load data'}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 text-emerald-400 underline font-medium">Try Again</button>
                </div>
            </div>
        );
    }

    const today = data.PrayerTimes[0];
    const city = data.CityInfo;

    const prayerIcons = {
        imsak: '🌅',
        gunes: '☀️',
        ogle: '🕛',
        ikindi: '🌇',
        aksam: '🌆',
        yatsi: '🌙'
    };

    const prayerNames = {
        imsak: 'Fajr (Imsak)',
        gunes: 'Sunrise',
        ogle: 'Dhuhr',
        ikindi: 'Asr',
        aksam: 'Maghrib',
        yatsi: 'Isha'
    };

    return (
        <section className="py-24 max-w-7xl mx-auto px-6" id="prayer-times">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Prayer Timings in <span className="text-emerald-500">{city.name}</span></h2>
                    <div className="flex items-center space-x-6 text-slate-400">
                        <div className="flex items-center space-x-2">
                            <Calendar size={18} className="text-emerald-400" />
                            <span>{today.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin size={18} className="text-emerald-400" />
                            <span>{city.name}, {data.CountryInfo.name}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
                    <span className="text-slate-400 text-sm">Hijri Date:</span>
                    <span className="ml-2 font-bold text-emerald-400">{today.hDate}</span>
                </div>
            </div>

            <div className="prayer-grid">
                {Object.entries(prayerNames).map(([key, name]) => (
                    <div key={key} className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-4 group hover:border-emerald-500/50 transition-all duration-300">
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                            {prayerIcons[key]}
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-widest">{name}</h3>
                            <p className="text-4xl font-bold text-white tracking-tight">{convertTo12Hour(today[key])}</p>
                        </div>
                        <div className="w-12 h-1 px-4 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-emerald-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Weekly Schedule Preview */}
            <div className="mt-16 glass-card overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-white/5">
                    <h3 className="font-bold flex items-center space-x-2 text-lg">
                        <Clock size={20} className="text-emerald-400" />
                        <span>Weekly Schedule</span>
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-slate-500 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 border-b border-white/5 font-semibold">Date</th>
                                <th className="px-6 py-4 border-b border-white/5 font-semibold">Fajr</th>
                                <th className="px-6 py-4 border-b border-white/5 font-semibold">Sunrise</th>
                                <th className="px-6 py-4 border-b border-white/5 font-semibold">Dhuhr</th>
                                <th className="px-6 py-4 border-b border-white/5 font-semibold">Asr</th>
                                <th className="px-6 py-4 border-b border-white/5 font-semibold">Maghrib</th>
                                <th className="px-6 py-4 border-b border-white/5 font-semibold">Isha</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.PrayerTimes.slice(0, 7).map((day, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-300">{day.date}</td>
                                    <td className="px-6 py-4 font-bold text-white">{convertTo12Hour(day.imsak)}</td>
                                    <td className="px-6 py-4 text-slate-400">{convertTo12Hour(day.gunes)}</td>
                                    <td className="px-6 py-4 text-slate-300">{convertTo12Hour(day.ogle)}</td>
                                    <td className="px-6 py-4 text-slate-300">{convertTo12Hour(day.ikindi)}</td>
                                    <td className="px-6 py-4 text-emerald-400 font-bold">{convertTo12Hour(day.aksam)}</td>
                                    <td className="px-6 py-4 text-slate-300">{convertTo12Hour(day.yatsi)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default PrayerTimes;
