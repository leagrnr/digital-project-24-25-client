import apiClient from './api';

export const getUsers = () => apiClient.get('/users');
export const getReplies = () => apiClient.get('/replies');