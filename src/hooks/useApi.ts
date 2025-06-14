import { useState, useEffect } from 'react';
import type {ApiError} from '../types/api.types';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
    refetch: () => Promise<void>;
}

export function useApi<T>(
    apiCall: () => Promise<T>,
    dependencies: any[] = []
): UseApiReturn<T> {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    const fetchData = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const result = await apiCall();
            setState({ data: result, loading: false, error: null });
        } catch (err) {
            const error = err as ApiError;
            setState({ data: null, loading: false, error });
        }
    };

    useEffect(() => {
        fetchData();
    }, dependencies);

    return {
        ...state,
        refetch: fetchData,
    };
}