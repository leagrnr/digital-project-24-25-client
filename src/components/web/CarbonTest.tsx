import React, { useState } from 'react';
import Avatar1 from '../../assets/avatar-01.svg';
import Avatar2 from '../../assets/avatar-02.svg';
import Avatar3 from '../../assets/avatar-03.svg';
import Avatar4 from '../../assets/avatar-04.svg';
import Avatar5 from '../../assets/avatar-05.svg';

type Question = {
    text: string;
    options: { label: string; score: number }[];
};

const questions: Question[] = [
    {
        text: "Quel est ton mode de transport principal pour venir au travail ?",
        options: [
            { label: "Vélo / Marche", score: 0 },
            { label: "Transports en commun", score: 1 },
            { label: "Covoiturage", score: 2 },
            { label: "Voiture individuelle", score: 3 },
        ],
    },
    {
        text: "Quel est ton type d’alimentation au bureau ?",
        options: [
            { label: "Végétarien / Vegan", score: 0 },
            { label: "Mixte avec peu de viande", score: 1 },
            { label: "Régime omnivore (viande régulière)", score: 2 },
        ],
    },
    {
        text: "La climatisation et le chauffage au bureau sont...",
        options: [
            { label: "Utilisés avec modération", score: 0 },
            { label: "Toujours en marche", score: 2 },
        ],
    },
    {
        text: "À quelle fréquence changes-tu d’ordinateur pro ?",
        options: [
            { label: "Tous les 5 ans ou plus", score: 0 },
            { label: "Tous les 3-4 ans", score: 1 },
            { label: "Tous les 1-2 ans", score: 2 },
        ],
    },
    {
        text: "Imprimes-tu souvent des documents ?",
        options: [
            { label: "Presque jamais", score: 0 },
            { label: "Parfois (1-2 fois/semaine)", score: 1 },
            { label: "Souvent (plusieurs fois/semaine)", score: 2 },
        ],
    },
    {
        text: "Pour tes réunions, tu utilises plutôt :",
        options: [
            { label: "La visioconférence", score: 0 },
            { label: "Les déplacements en train", score: 1 },
            { label: "Les déplacements en voiture", score: 2 },
            { label: "Les déplacements en avion", score: 3 },
        ],
    },
];

const getResultMessage = (score: number) => {
    if (score <= 3) {
        return {
            title: "🌱 Éco-héros !",
            text: `Tu fais partie des collaborateurs les plus sobres en carbone.
Tu adoptes des comportements exemplaires au quotidien.`,
            impact: `✨ C’est comme si tu PLANTAIS 50 arbres par an.`,
            avatar: Avatar1,
        };
    } else if (score <= 6) {
        return {
            title: "🟡 Responsable",
            text: `Tu as de bonnes habitudes, et quelques petits ajustements peuvent t’amener au top.`,
            impact: `🍃 C’est comme si tu compenses l’impact de 2 ordinateurs portables.`,
            avatar: Avatar2,
        };
    } else if (score <= 9) {
        return {
            title: "🔍 Intermédiaire",
            text: `Ton impact est moyen, tu peux progresser facilement en réduisant certains gestes.`,
            impact: `🚗 C’est l’équivalent de 1 200 km en voiture.`,
            avatar: Avatar5,
        };
    } else if (score <= 12) {
        return {
            title: "⚠️ À améliorer",
            text: `Ton empreinte carbone est élevée. Revois tes pratiques pro et déplacements.`,
            impact: `✈️ C’est comme si tu prenais l’AVION 10 fois Paris-Marseille.`,
            avatar: Avatar3,
        };
    } else {
        return {
            title: "🚨 Urgence climatique !",
            text: `Ton mode de vie professionnel a un impact très élevé sur la planète.`,
            impact: `🌍 C’est comme COUPER 50 arbres chaque année.`,
            avatar: Avatar4,
        };
    }
};


const CarbonTest: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<number[]>([]);
    const [finished, setFinished] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const totalScore = scores.reduce((sum, val) => sum + val, 0);
    const result = getResultMessage(totalScore);

    const handleAnswer = (score: number) => {
        setScores(prev => [...prev, score]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
        } else {
            setFinished(true);
        }
    };

    const handleRestart = () => {
        setScores([]);
        setCurrentQuestionIndex(0);
        setFinished(false);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-6 mb-4 w-11/12 mx-auto px-2">
                <div className="flex items-center justify-between w-full mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold">Test Bilan Carbone</h2>
                </div>
            </div>

            {!finished ? (
                <div className="flex flex-col items-center justify-center mt-6 mb-4 w-11/12 mx-auto py-[5vh] border-gray-100 border-2 rounded-lg shadow-lg">
                    <h2 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold text-center">
                        {currentQuestion.text}
                    </h2>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-4/5 justify-center">
                        {currentQuestion.options.map((option, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleAnswer(option.score)}
                                className={`flex-1 max-w-full sm:max-w-[25%] min-w-[100px] h-[48px] sm:h-[60px] flex items-center justify-center rounded-lg border-1 border-gray-300 cursor-pointer select-none font-medium transition bg-custom-tertiary font-bold border-none text-white hover:bg-yellow-600`}
                                style={{ padding: 8 }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-6 mb-8 w-11/12 mx-auto py-[5vh] border-gray-100 border-2 rounded-lg shadow-lg text-center">
                    <img
                        src={result.avatar}
                        alt="avatar bilan carbone"
                        className="w-24 h-24 sm:w-48 sm:h-48 mb-4 rounded-full object-contain"
                    />
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">{result.title}</h2>
                    <p className="whitespace-pre-line text-gray-700 text-sm sm:text-base px-4 mb-2">{result.text}</p>
                    <p className="text-base font-semibold text-red-600 px-4">{result.impact}</p>
                    <button
                        onClick={handleRestart}
                        className="mt-6 bg-custom-tertiary text-white px-5 py-2 rounded-lg hover:bg-yellow-400-600 transition"
                    >
                        Refaire le test
                    </button>
                </div>
            )}
        </>
    );
};

export default CarbonTest;
