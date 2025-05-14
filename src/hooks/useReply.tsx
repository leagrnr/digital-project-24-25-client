import { useEffect, useState } from 'react';
import { getReplies } from '../services/serviceApi.ts';

export const useReplies = () => {
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getReplies()
            .then((res) => setReplies(res.data.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { replies, loading, error };
};
