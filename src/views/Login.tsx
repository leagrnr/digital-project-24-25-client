import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError("Identifiants incorrects");
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-custom-primary">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4"
            >
                <div>
                    <label htmlFor="email" className="block text-sm mb-1 font-bold">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-primary"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm mb-1 font-bold">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-primary"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="bg-[#cd6d4f] text-white font-semibold py-2 px-4 rounded hover:bg-[#b65e43] transition duration-300"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
}
