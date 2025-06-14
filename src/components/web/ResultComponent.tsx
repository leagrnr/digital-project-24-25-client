import { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar
} from 'recharts';
import dataJson from '../../data/result.json';

export default function ResultComponent() {
    const [data, setData] = useState<null | typeof dataJson>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setData(dataJson);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!data) return <div>Chargement...</div>;

    const slides = [
        {
            title: 'Progression mensuelle',
            content: (
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={data.progression}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="coursLus" name="Cours lus" stroke="#83A790" />
                        <Line type="monotone" dataKey="quizzReussis" name="Quizz réussis" stroke="#F5A50D" />
                    </LineChart>
                </ResponsiveContainer>
            )
        },
        {
            title: 'Répartition des résultats',
            content: (
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data.progression}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="coursLus" name="Cours lus" fill="#83A790" />
                        <Bar dataKey="quizzReussis" name="Quizz réussis" fill="#F5A50D" />
                    </BarChart>
                </ResponsiveContainer>
            )
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between bg-custom-primary mt-[10vh] rounded-b-3xl px-4 md:px-8 py-8 md:py-12 min-h-[70vh] w-full">
            {/* Texte à gauche */}
            <div className="w-full lg:w-[40%] text-white space-y-6 md:space-y-8 mx-auto">
                <h2 className="text-xl md:text-3xl font-semibold">Vos résultats de janvier</h2>
                <p>Bravo ! Ton empreinte carbone est très faible.</p>
                <p>
                    Ton impact annuel est équivalent à un Français qui vit en mode éco-responsable
                    (sans voiture et avec peu de déplacements en avion).
                </p>
                <p>
                    C’est comme si tu plantais <strong>50 arbres</strong> par an !
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-6 md:mt-8 w-full">
                    <button className="bg-custom-tertiary hover:bg-yellow-400 text-white font-semibold px-4 md:px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 w-full sm:w-auto">
                        Mon tableau de bord
                    </button>
                    <button className="border border-white text-white font-semibold px-4 md:px-6 py-3 rounded-full transition-all duration-200 hover:bg-white hover:text-black hover:shadow-lg hover:scale-105 w-full sm:w-auto">
                        Test bilan carbone
                    </button>
                </div>
            </div>

            {/* GRAPHIQUES */}
            <div className="w-full lg:w-[40%] mt-8 lg:mt-0 flex flex-col items-center mx-auto">
                {isMobile ? (
                    <div className="relative w-full max-w-full">
                        {/* Slide actif */}
                        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md transition-all duration-300">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                {slides[currentSlide].title}
                            </h3>
                            {slides[currentSlide].content}
                        </div>

                        {/* Flèches navigation */}
                        <button
                            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow p-2 rounded-full hover:scale-105 transition"
                        >
                            ◀
                        </button>
                        <button
                            onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow p-2 rounded-full hover:scale-105 transition"
                        >
                            ▶
                        </button>

                        {/* Indicateurs */}
                        <div className="flex mt-4 justify-center space-x-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        i === currentSlide ? 'bg-custom-quaternary scale-110' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 w-full">
                        {slides.map((slide, i) => (
                            <div
                                key={i}
                                className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full"
                            >
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                    {slide.title}
                                </h3>
                                {slide.content}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
