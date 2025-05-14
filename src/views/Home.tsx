import StatsCarousel from "../components/web/StatsCarousel.tsx";
import UserComponent from "../components/web/UserComponent.tsx";
import ReplyComponent from "../components/web/ReplyComponent";

export default function Home() {
    return (
        <>
            <StatsCarousel/>
            <UserComponent/>
            <ReplyComponent/>
        </>
    );
}