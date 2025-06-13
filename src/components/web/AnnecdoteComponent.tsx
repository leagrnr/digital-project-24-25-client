import Ampoule from '../../assets/ampoule.png'

export default function AnnecdoteComponent() {
    return (
        <div className="flex flex-row items-center justify-center mt-[5vh] bg-custom-primary h-[15vh] m-0 md:m-8 p-4 md:p-8">
            <div
                className="bg-custom-secondary rounded-full flex items-center justify-center mr-4 w-20 h-20 md:w-[10vw] md:h-[10vw]"
            >
                <img src={Ampoule} className="w-full h-full" />
            </div>
            <div className="flex bg-custom-primary h-full flex-col w-[90vw] justify-center">
                <h2 className="text-white font-bold text-xl md:text-2xl lg:text-3xl">Le saviez-vous?</h2>
                <p className="text-white text-sm md:text-base lg:text-lg">
                    Un email avec une pièce jointe lourde peut avoir une empreinte carbone similaire à celle d'une ampoule allumée pendant une heure ? Les serveurs et les centres de données consomment beaucoup d'énergie pour stocker et transférer ces données.
                </p>
            </div>
        </div>
    );
}
