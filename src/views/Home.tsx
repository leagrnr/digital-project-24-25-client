import { useAuth } from '../contexts/AuthContext';
import {useEffect} from "react";



export default function Home() {
    const { user, loading } = useAuth();

    useEffect(() => {
        console.log("User:", user);
    }, [user]);

    if (loading) return <p>Chargement...</p>;


    return (
        <div>
            < h2 className={"mt-[15vh]"}>Bienvenue{user?.email ? `, ${user.email}` : ''} !</h2>
        </div>
    );
}
