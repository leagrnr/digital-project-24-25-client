import Logo from '../../assets/logo.svg';

export default function FooterComponent() {
    return (
        <footer className="bg-gray-100 py-8">
            <div className="flex flex-row justify-around">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img src={Logo} alt="Logo" className="w-24 h-auto" />
                </div>

                {/* Liens */}

                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-yellow-400">Tableau de bord</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Cours</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Quiz</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Bilan carbone</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Paramètre</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Mon compte</a></li>
                    </ul>

                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-yellow-400">Mentions légales</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Conditions générales de vente</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Politique de confidentialité</a></li>
                    </ul>

            </div>
        </footer>
    );
}
