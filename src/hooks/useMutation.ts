import { useState } from 'react';
import type {ApiError} from '../types/api.types';

interface UseMutationState {
    loading: boolean;
    error: ApiError | null;
}

interface UseMutationReturn<T, P> extends UseMutationState {
    mutate: (params: P) => Promise<T>;
    reset: () => void;
}

export function useMutation<T, P = void>(
    mutationFn: (params: P) => Promise<T>
): UseMutationReturn<T, P> {
    const [state, setState] = useState<UseMutationState>({
        loading: false,
        error: null,
    });

    const mutate = async (params: P): Promise<T> => {
        try {
            setState({ loading: true, error: null });
            const result = await mutationFn(params);
            setState({ loading: false, error: null });
            return result;
        } catch (err) {
            const error = err as ApiError;
            setState({ loading: false, error });
            throw error;
        }
    };

    const reset = () => {
        setState({ loading: false, error: null });
    };

    return {
        ...state,
        mutate,
        reset,
    };
}