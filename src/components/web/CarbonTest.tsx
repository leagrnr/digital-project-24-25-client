import React, { useState } from 'react';

const CarbonTest: React.FC = () => {
    const question = "Quel est ton principal mode de transport pour aller au travail ?";
    const answers = [
        "vélo / marche",
        "voiture",
        "transports en commun",
        "covoiturage",
    ];

    const [selected, setSelected] = useState<number | null>(null);

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-8 mb-4 w-11/12 sm:w-4/5 mx-auto">
                <div className="flex items-center justify-between w-full mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold">Test Bilan Carbonne</h2>
                </div>
            </div>
            <div className="w-11/12 sm:w-4/5 mx-auto flex flex-col items-center justify-center border border-gray-300 rounded-lg py-6 sm:py-8 px-2 sm:px-0">
                <h2 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold text-center">{question}</h2>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-4/5 justify-center">
                    {answers.map((answer, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelected(idx)}
                            className={`flex-1 max-w-full sm:max-w-[25%] min-w-[100px] h-[48px] sm:h-[60px] flex items-center justify-center rounded-lg border-1 border-gray-300 cursor-pointer select-none font-medium transition
                            ${selected === idx ? 'bg-yellow-400 font-bold border-none' : 'bg-white'}`}
                            style={{padding: 8}}
                        >
                            {answer}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CarbonTest;