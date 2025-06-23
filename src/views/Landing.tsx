import Avatar from "../assets/avatar-01.svg";
import { ChartNoAxesCombined, BookOpenCheck, CircleHelp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();
    const handleStart = () => navigate('/login');

    return (
        <div className="bg-custom-primary space-y-16">
            <div className="flex flex-col items-center bg-custom-quaternary justify-center mt-[5vh] rounded-b-3xl px-2 sm:px-4 md:px-8 py-6 md:py-16 min-h-[60vh] w-full space-y-6">
                <img src={Avatar} style={{ height: '30vh' }} className="w-full max-w-xs sm:max-w-md md:max-w-lg object-contain" />
                <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">Bienvenue sur Kit It !</h1>
                <p className="text-white text-xl sm:text-2xl text-center">Votre nouvelle plateforme pour apprendre à intégrer dans son quotidien le numérique éco-responsable.</p>
                <button
                    className="bg-custom-primary text-white px-8 py-2 rounded-xl font-bold"
                    onClick={handleStart}
                >
                    Démarrer
                </button>
            </div>
            <div className="space-y-10">
                <h2 className="font-bold text-2xl sm:text-3xl text-white text-center">Ce qu'on propose</h2>
                <div className="space-y-6 flex flex-col items-center justify-center">
                    {[
                        "Des cours en autonomie",
                        "Des quiz pour évaluer votre niveau",
                        "Des tests d'empreintes",
                        "Tableau de bord et suivi des évolutions"
                    ].map((titre, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md sm:max-w-lg space-y-4">
                            <h3 className="font-bold text-xl text-center">{titre}</h3>
                            <div className="flex justify-center items-center">
                                <button
                                    className="bg-custom-primary text-white px-8 py-2 rounded-xl font-bold"
                                    onClick={handleStart}
                                >
                                    Démarrer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center text-justify space-y-10">
                    <h2 className="font-bold text-2xl sm:text-3xl text-white text-center">Votre plateforme d'apprentissage pour votre entreprise</h2>
                    <p className="text-white text-lg sm:text-xl text-justify w-full max-w-3xl px-4">Cette plateforme vous permettra de découvrir les actions éco-responsable à mettre en oeuvre dans votre entreprise pour réduire drastiquement votre impact environnemental. Vous aurez donc toutes les cartes en mains pour développer vos compétences dans ce domaine.</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-around items-center bg-white w-full max-w-4xl mx-auto gap-4 sm:gap-8 pt-[2vh] pb-[2vh]">
                <div className="flex flex-col items-center">
                    <BookOpenCheck className="h-16 w-16 sm:h-[10vh] sm:w-[10vh] text-gray-600" />
                    <p>10+ Cours</p>
                </div>
                <div className="flex flex-col items-center">
                    <CircleHelp className="h-16 w-16 sm:h-[10vh] sm:w-[10vh] text-gray-600" />
                    <p>10+ Quiz</p>
                </div>
                <div className="flex flex-col items-center">
                    <ChartNoAxesCombined className="h-16 w-16 sm:h-[10vh] sm:w-[10vh] text-gray-600" />
                    <p>Tests évolutifs</p>
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center justify-around w-full text-justify space-y-10 pb-10">
                    <div className="border-t-2 border-b-2 border-orange-500 py-4 w-full flex justify-center">
                        <h2 className="italic font-bold text-2xl sm:text-3xl text-white text-center">
                            Kit-it, la nouvelle ère écoresponsable pour votre entreprise.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}