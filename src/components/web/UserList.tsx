import React from 'react';
import { useApi } from '../../hooks/useApi';
import { useMutation } from '../../hooks/useMutation';
import apiService from '../../services/apiService';
import type {User} from '../../types/api.types';

const UserList: React.FC = () => {
    const { data: users, loading, error, refetch } = useApi(
        () => apiService.getUsers()
    );

    const deleteUserMutation = useMutation((userId: number) =>
        apiService.deleteUser(userId)
    );

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUserMutation.mutate(userId);
            await refetch(); // Rafraîchir la liste
        } catch (err) {
            // L'erreur est déjà gérée par useMutation
            console.error('Erreur lors de la suppression:', err);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error.message}</div>;

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            {users?.map((user: User) => (
                <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <button
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={deleteUserMutation.loading}
                    >
                        {deleteUserMutation.loading ? 'Suppression...' : 'Supprimer'}
                    </button>
                    {deleteUserMutation.error && (
                        <div style={{ color: 'red' }}>
                            Erreur: {deleteUserMutation.error.message}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserList;