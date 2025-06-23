import MobileNavigation from '../components/mobile/NavbarComponent';
import Navbar from '../components/web/NavbarComponent';

import Avatar1 from '../assets/avatar-01.svg'

export default function Setting() {
    return (
        <>
            <MobileNavigation />
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <img src={Avatar1} style={{ height: '30vh' }} className="w-full object-contain" />
                <h1 className="text-4xl font-bold text-gray-800 text-center">En cours de développement !</h1>
            </div>
        </>
    );
}