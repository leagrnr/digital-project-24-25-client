import React, { useState, useEffect, useMemo } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, Select, MenuItem,
    FormControl, InputLabel, Typography, Button
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useAuth } from '../../contexts/AuthContext';

type Quiz = {
    id: number;
    title: string;
    category: {
        id: number;
        name: string;
    };
};

type Question = {
    id: number;
    id_quizz: number;
};

type Reply = {
    id_user: number;
    id_question: number;
    score: number;
};

const QuizList: React.FC = () => {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) setSelectedCategory(cat);
    }, [location.search]);

    useEffect(() => {
        apiService.getQuizzes().then(res => {
            setQuizzes(res.data ?? res);
        });
        apiService.getQuestions().then(res => {
            setQuestions(res.data ?? res);
        });
        apiService.getReplies().then(res => {
            setReplies(res.data ?? res);
        });
    }, []);

    const quizzesWithStatus = useMemo(() => {
        return quizzes.map((quiz) => {
            const quizQuestions = questions.filter(q => q.id_quizz === quiz.id);
            const hasAllCorrect = quizQuestions.every(q =>
                replies.some(r => r.id_user === user.id && r.id_question === q.id && r.score === 1)
            );
            return {
                ...quiz,
                isCompleted: hasAllCorrect,
            };
        });
    }, [quizzes, questions, replies, user.id]);

    const filteredQuizzes = useMemo(() => {
        return quizzesWithStatus.filter(quiz =>
            selectedCategory === 'all' || quiz.category.name === selectedCategory
        );
    }, [selectedCategory, quizzesWithStatus]);

    const categoryNames = useMemo(() => {
        const unique = new Set(quizzes.map(q => q.category.name));
        return Array.from(unique);
    }, [quizzes]);

    return (
        <Box sx={{ maxWidth: 1000, margin: '15vh auto 0 auto', px: { xs: 1, md: 0 } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                Vos quizz
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Catégorie"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <MenuItem value="all">Toutes</MenuItem>
                        {categoryNames.map(cat => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Titre</TableCell>
                            <TableCell>Catégorie</TableCell>
                            <TableCell>État</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredQuizzes.map((quiz) => (
                            <TableRow key={quiz.id}>
                                <TableCell>{quiz.title}</TableCell>
                                <TableCell>{quiz.category.name}</TableCell>
                                <TableCell>
                                    {quiz.isCompleted ? 'Quiz fait' : 'À faire'}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/quiz/${quiz.id}`}
                                        variant="contained"
                                        disabled={quiz.isCompleted}
                                        sx={{ backgroundColor: '#F0A202', color: 'white' }}
                                    >
                                        {quiz.isCompleted ? 'Terminé' : 'Faire le quiz'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default QuizList;
