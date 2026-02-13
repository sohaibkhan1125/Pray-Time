import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How are the prayer times calculated?",
            answer: "Our prayer times are calculated using globally recognized astronomical algorithms. We use high-precision coordinates and adjustment methods like the Muslim World League or ISNA to ensure the most accurate results for your specific location."
        },
        {
            question: "Why do prayer times differ between apps?",
            answer: "Differences usually occur due to varying calculation methods, specifically for Fajr and Isha angles, and the method used for Asr (Hanafi vs Shafi). Our app uses the default standard settings which are accurate for most regions."
        },
        {
            question: "Can I use this app offline?",
            answer: "While the app requires an internet connection to fetch the initial data for the month, once loaded, the current day's times are cached in your browser so you can access them even if you briefly lose connection."
        },
        {
            question: "How do I change my city?",
            answer: "Currently, we show timings for the set location. We are working on a dynamic location search feature that will allow you to get times for any city worldwide using GPS or manual input."
        }
    ];

    return (
        <section className="py-24 max-w-4xl mx-auto px-6" id="faq">
            <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4">
                    <HelpCircle className="text-emerald-400" size={16} />
                    <span className="text-sm font-medium text-emerald-400 uppercase tracking-widest">Support</span>
                </div>
                <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="glass-card overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                            className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="text-lg font-semibold text-white">{faq.question}</span>
                            <div className={`p-1 rounded-lg transition-colors ${openIndex === i ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                                {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                            </div>
                        </button>
                        <div className={`px-8 transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="text-slate-400 leading-relaxed pt-2">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
