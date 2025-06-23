import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import coursesData from '../../data/courses.json';

type Lesson = {
    id: number;
    name: string;
    content: string;
};

const CourseCarousel: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        apiService.getLessons().then((res: any) => {
            const data = res.data ?? res;
            setLessons(data);
        });

        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, Math.min(coursesData.length, lessons.length) - itemsPerView);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    const getFirstParagraph = (html: string) => {
        const match = html.match(/<p>(.*?)<\/p>/);
        return match ? match[1] : '';
    };

    const getVisibleCourses = () => {
        const visible = [];
        for (let i = 0; i < itemsPerView; i++) {
            const idx = (currentIndex + i) % Math.min(coursesData.length, lessons.length);
            visible.push({
                ...coursesData[idx],
                title: lessons[idx]?.name ?? 'Chargement...',
                description: getFirstParagraph(lessons[idx]?.content ?? ''),
                id: lessons[idx]?.id,
            });
        }
        return visible;
    };

    const visibleCourses = getVisibleCourses();

    return (
        <div className="w-full max-w-7xl mt-[10vh] p-6 pb-16 mx-auto flex flex-col">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-left ml-4">
                    On commence un cours ?
                </h2>
            </div>

            <div className="relative">
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl border border-gray-200"
                    disabled={lessons.length <= itemsPerView}
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl border border-gray-200"
                    disabled={lessons.length <= itemsPerView}
                >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>

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
                                <div className="rounded-2xl p-6 h-full shadow-lg hover:shadow-xl border border-white/50">
                                    <div className="relative mb-6 rounded-xl overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-400 transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            {course.description}
                                        </p>
                                        <div className="pt-4">
                                            <button
                                                onClick={() => navigate(`/lesson/${course.id}`)}
                                                className="flex items-center gap-2 text-gray-700 font-medium hover:text-yellow-400 transition-colors group-hover:gap-3"
                                            >
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
