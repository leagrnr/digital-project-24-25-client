import Ampoule from '../../assets/ampoule.png'
import result from '../../data/result.json'

const TOTAL = 36;

export default function BannerDashboardComponent() {
    const last = result.progression[result.progression.length - 1];
    const percentCours = (last.coursLus / TOTAL) * 100;
    const percentQuizz = (last.quizzReussis / TOTAL) * 100;
    const percentGlobal = Math.round((percentCours + percentQuizz) / 2);

    return (
        <div className="flex flex-col items-center bg-custom-quaternary justify-center mt-[5vh] rounded-b-3xl px-2 sm:px-4 md:px-8 py-6 md:py-16 min-h-[60vh] w-full">
            <div className="bg-custom-secondary rounded-full flex items-center justify-center aspect-square w-1/2 sm:w-20 md:w-1/5 md:max-w-[10vw] md:max-h-[15vh] mb-4 sm:mb-6 md:mb-8 md:mr-4">
                <img src={Ampoule} className="w-full h-full object-contain" />
            </div>
            <p className="text-white text-lg sm:text-sm md:text-base lg:text-xl font-bold text-center mb-2 sm:mb-4">
                Alain Dupont
            </p>
            <div className="flex flex-row items-center justify-between md:justify-center text-center font-bold mb-4 bg-white w-3/4 md:w-1/2 gap-2 sm:gap-8 rounded-2xl shadow-lg py-2 sm:py-0 px-4 mx-auto mt-4 md:mt-8">
                <p className="text-base sm:text-lg md:text-xl">Cours lus : {last.coursLus} / {TOTAL}</p>
                <p className="text-base sm:text-lg md:text-xl">Quizz finis : {last.quizzReussis} / {TOTAL}</p>
            </div>
            <div className="w-3/4 md:w-1/2 mt-4 sm:mt-6 mx-auto">
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