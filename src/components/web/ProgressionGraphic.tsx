import { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar
} from 'recharts';
import dataJson from '../../data/result.json';

export default function ProgressionGraphic() {
    const progression = dataJson.progression.slice(-6);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');

    return (
        <div className="flex flex-col items-center justify-center mt-6 mb-4 w-11/12 mx-auto px-2 ">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold">Votre progression</h2>
                <div>
                    <label htmlFor="chartType" className="mr-2 font-semibold text-base sm:text-lg">Type de graphique :</label>
                    <select
                        id="chartType"
                        value={chartType}
                        onChange={e => setChartType(e.target.value as 'line' | 'bar')}
                        className="border rounded px-2 py-1 text-base"
                    >
                        <option value="line">Lignes</option>
                        <option value="bar">Barres</option>
                    </select>
                </div>
            </div>
            <div className="w-full bg-white rounded-xl shadow mt-2 sm:mt-4 py-[2vh] px-[1vw] sm:px-[2vw]">
                <div className="w-full h-[250px] sm:h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'line' ? (
                            <LineChart data={progression}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="coursLus" name="Cours lus" stroke="#83A790" />
                                <Line type="monotone" dataKey="quizzReussis" name="Quizz réussis" stroke="#F5A50D" />
                            </LineChart>
                        ) : (
                            <BarChart data={progression}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="coursLus" name="Cours lus" fill="#83A790" />
                                <Bar dataKey="quizzReussis" name="Quizz réussis" fill="#F5A50D" />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}