import Ampoule from '../../assets/ampoule.png'

export default function AnnecdoteComponent() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center mt-[5vh] bg-custom-primary h-auto m-0 md:m-8 p-4 md:p-8 rounded-2xl shadow-2xl overflow-hidden">
            <div
                className="bg-custom-secondary rounded-full flex items-center justify-center aspect-square w-20 md:w-auto md:max-w-[10vw] md:max-h-[15vh] mb-4 md:mb-0 md:mr-4"
            >
                <img src={Ampoule} className="w-full h-full object-contain" />
            </div>
            <div className="flex bg-custom-primary h-full flex-col w-full md:w-[90vw] justify-center">
                <h2 className="text-white font-bold text-xl md:text-2xl lg:text-3xl text-center md:text-left">Le saviez-vous?</h2>
                <p className="text-white text-sm md:text-base lg:text-base text-center md:text-left">
                    Un email avec une pièce jointe lourde peut avoir une empreinte carbone similaire à celle d'une ampoule allumée pendant une heure ? Les serveurs et les centres de données consomment beaucoup d'énergie pour stocker et transférer ces données.
                </p>
            </div>
        </div>
    );
}