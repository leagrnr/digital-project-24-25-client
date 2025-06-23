import Avatar from '../../assets/avatar-04.svg'
import result from '../../data/result.json'

const TOTAL = 6;

export default function BannerDashboardComponent() {
    const last = result.progression[result.progression.length - 1];
    const percentCours = (last.coursLus / TOTAL) * 100;
    const percentQuizz = (last.quizzReussis / TOTAL) * 100;
    const percentGlobal = Math.round((percentCours + percentQuizz) / 2);

    return (
        <div className="flex flex-col items-center bg-custom-quaternary justify-center mt-[5vh] rounded-b-3xl px-2 sm:px-4 md:px-8 py-6 md:py-16 min-h-[60vh] w-full">
            <img src={Avatar} style={{ height: '30vh' }} className="w-full object-contain" />
            <p className="text-white text-base sm:text-lg md:text-xl font-bold text-center mb-2 sm:mb-4">
                Alain Dupont
            </p>
            <div className="flex flex-row items-center justify-center text-center font-bold mb-4 bg-white w-full max-w-md gap-4 rounded-2xl shadow-lg py-2 px-2 sm:px-4 mx-auto mt-4 md:mt-8">
                <p className="text-xs sm:text-base md:text-lg">Cours lus : {last.coursLus} / {TOTAL}</p>
                <p className="text-xs sm:text-base md:text-lg">Quizz finis : {last.quizzReussis} / {TOTAL}</p>
            </div>
            <div className="w-full max-w-md mt-4 sm:mt-6 mx-auto">
                <div className="h-3 sm:h-4 bg-gray-300 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-custom-primary transition-all duration-500"
                        style={{ width: `${percentGlobal}%` }}
                    />
                </div>
                <p className="text-white text-xs sm:text-sm text-center mt-2 sm:mt-3">{percentGlobal}%</p>
            </div>
        </div>
    );
}