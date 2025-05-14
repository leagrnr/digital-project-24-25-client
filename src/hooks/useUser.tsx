import { useEffect, useState } from 'react';
import { getUsers } from '../services/serviceApi.ts';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers()
            .then((res) => setUsers(res.data.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { users, loading, error };
};
