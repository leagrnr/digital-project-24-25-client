import { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import dataJson from '../../data/result.json';

export default function ResultComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(dataJson);
    }, []);

    if (!data) return <div>Chargement...</div>;

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between bg-custom-primary mt-[10vh] rounded-b-3xl px-8 py-12">
            {/* Texte */}
            <div className="w-full lg:w-1/2 text-white space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold">Vos résultats de janvier</h2>
                <p>Bravo ! Ton empreinte carbone est très faible.</p>
                <p>
                    Ton impact annuel est équivalent à un Français qui vit en mode éco-responsable
                    (sans voiture et avec peu de déplacements en avion).
                </p>
                <p>
                    C’est comme si tu plantais <strong>50 arbres</strong> par an !
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="bg-custom-tertiary hover:bg-yellow-400 text-white font-semibold px-6 py-3 rounded-full">
                        Mon tableau de bord
                    </button>
                    <button className="border border-white text-white font-semibold px-6 py-3 rounded-full">
                        Test bilan carbone
                    </button>
                </div>
            </div>

            {/* Graphiques */}
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col items-center gap-6">
                {/* Ligne */}
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
                    <ResponsiveContainer width="100%" height={300}>
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
                </div>
            </div>
        </div>
    );
}
