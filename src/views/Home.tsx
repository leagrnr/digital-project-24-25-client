// import { useAuth } from '../contexts/AuthContext.tsx';
import AnecdoteComponent from "../components/web/AnecdoteComponent.tsx";
import ResultComponent from "../components/web/ResultComponent.tsx";
import CourseCarousel from "../components/web/CarouselLessonComponent.tsx";

export default function Home() {
    // const { user } = useAuth();

    return (
        <div>
            {/*<h2 className={"mt-[15vh]"}>Bienvenue{user?.email ? `, ${user.email}` : ''} !</h2>*/}
            <ResultComponent />
            <AnecdoteComponent />
            <CourseCarousel />
        </div>
    );
}
