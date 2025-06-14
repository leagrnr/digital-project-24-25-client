import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Leaf, Users, Smartphone, Shield } from 'lucide-react';

// Données des cours
const coursesData = [
    {
        id: 1,
        title: "Écologie numérique",
        description: "Pratiques visant à réduire l'impact environnemental du numérique. Elle encourage un usage plus sobre des technologies.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop&crop=center",
        icon: <Leaf className="w-8 h-8 text-green-500" />,
        color: "from-green-50 to-emerald-100",
        category: "Écologie"
    },
    {
        id: 2,
        title: "Sobriété numérique",
        description: "Démarche qui consiste à réduire l'usage superflu du numérique afin de limiter son impact écologique. Elle encourage des choix technologiques responsables et essentiels.",
        image: "https://www.gide.net/wp-content/uploads/2021/05/ecoconception-sobriete-numerique.png",
        icon: <Leaf className="w-8 h-8 text-emerald-500" />,
        color: "from-emerald-50 to-teal-100",
        category: "Écologie"
    },
    {
        id: 3,
        title: "Développement durable numérique",
        description: "Approches technologiques qui intègrent les principes du développement durable dans la conception et l'utilisation des outils numériques.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=250&fit=crop&crop=center",
        icon: <Leaf className="w-8 h-8 text-green-600" />,
        color: "from-green-100 to-emerald-50",
        category: "Écologie"
    },
    {
        id: 4,
        title: "Cybersécurité fondamentale",
        description: "Principes essentiels de la sécurité numérique pour protéger les données personnelles et professionnelles contre les cybermenaces.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=center",
        icon: <Shield className="w-8 h-8 text-red-500" />,
        color: "from-red-50 to-orange-100",
        category: "Sécurité"
    },
    {
        id: 5,
        title: "Protection des données",
        description: "Méthodes et outils pour sécuriser et protéger les informations sensibles dans l'environnement numérique actuel.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&crop=center",
        icon: <Shield className="w-8 h-8 text-blue-600" />,
        color: "from-blue-50 to-indigo-100",
        category: "Sécurité"
    },
    {
        id: 6,
        title: "Sécurité des réseaux",
        description: "Techniques avancées pour sécuriser les infrastructures réseau et prévenir les intrusions malveillantes.",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop&crop=center",
        icon: <Shield className="w-8 h-8 text-purple-600" />,
        color: "from-purple-50 to-violet-100",
        category: "Sécurité"
    }
];

const CourseCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1); // mobile
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2); // tablette
            } else {
                setItemsPerView(3); // desktop
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calcul du nombre maximum d'index basé sur les éléments par vue
    const maxIndex = Math.max(0, coursesData.length - itemsPerView);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    // Obtenir les cours visibles
    const getVisibleCourses = () => {
        const visible = [];
        for (let i = 0; i < itemsPerView; i++) {
            const index = (currentIndex + i) % coursesData.length;
            visible.push(coursesData[index]);
        }
        return visible;
    };

    const visibleCourses = getVisibleCourses();

    return (
        <div className="w-full max-w-7xl mt-[10vh] p-6 pb-16">
            {/* Titre principal */}
            <div className=" mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    On commence un cours ?
                </h2>
            </div>

            {/* Carousel */}
            <div className="relative">
                {/* Boutons de navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    disabled={coursesData.length <= itemsPerView}
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    disabled={coursesData.length <= itemsPerView}
                >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>

                {/* Conteneur des cartes */}
                <div className="overflow-hidden">
                    <div
                        className={`grid min-h-[350px] transition-all duration-500 ease-in-out gap-6 pb-6 ${
                            itemsPerView === 1 ? 'grid-cols-1' :
                                itemsPerView === 2 ? 'grid-cols-2' :
                                    'grid-cols-3'
                        }`}
                    >
                        {visibleCourses.map((course, index) => (
                            <div
                                key={`${course.id}-${currentIndex}-${index}`}
                                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                            >
                                <div className={`rounded-2xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50`}>
                                    {/* Image et icône */}
                                    <div className="relative mb-6 rounded-xl overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Contenu */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-400 transition-colors">
                                            {course.title}
                                        </h3>

                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            {course.description}
                                        </p>

                                        {/* Bouton */}
                                        <div className="pt-4">
                                            <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-yellow-400 transition-colors group-hover:gap-3">
                                                <span>Voir le cours</span>
                                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Indicateurs */}
            <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentIndex
                                ? 'bg-custom-quaternary scale-110'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseCarousel;