// import UserList from "../components/web/UserList.tsx";
import AnnecdoteComponent from "../components/web/AnnecdoteComponent.tsx";
import ResultComponent from "../components/web/ResultComponent.tsx";
import CourseCarousel from "../components/web/CarouselLessonComponent.tsx";
import FooterComponent from "../components/web/FooterComponent.tsx";

export default function Home() {
    return (
        <div>
            <ResultComponent />
            <AnnecdoteComponent />
            <CourseCarousel />
        </div>
    );
}
