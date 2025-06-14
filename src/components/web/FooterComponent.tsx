import Logo from '../../assets/logo.svg';

export default function FooterComponent() {
    return (
        <footer className="bg-gray-100 py-8 mt-[5vh]">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-around gap-8 md:gap-0">
                {/* Logo */}
                <div className="flex-shrink-0 mb-6 md:mb-0">
                    <img src={Logo} alt="Logo" className="w-24 h-auto" />
                </div>

                {/* Liens */}
                <div className="flex flex-col sm:flex-row gap-8">
                    <ul className="space-y-2 text-center sm:text-left">
                        <li><a href="#" className="hover:text-yellow-400">Tableau de bord</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Cours</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Quiz</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Bilan carbone</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Paramètre</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Mon compte</a></li>
                    </ul>

                    <ul className="space-y-2 text-center sm:text-left">
                        <li><a href="#" className="hover:text-yellow-400">Mentions légales</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Conditions générales de vente</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Politique de confidentialité</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}