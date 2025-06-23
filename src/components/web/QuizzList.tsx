import React, { useState, useEffect, useMemo } from 'react';
import apiService from '../../services/apiService';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, Select, MenuItem,
    FormControl, InputLabel, Typography, Button
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type Quiz = {
    id: number;
    title: string;
    description?: string;
    category_id?: number;
};

type Category = {
    id: number;
    name: string;
};

const QuizList: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) setSelectedCategory(cat);
    }, [location.search]);

    useEffect(() => {
        apiService.getCategories().then((data) => {
            setCategories(Array.isArray(data) ? data : data.data);
        });
        apiService.getQuizzes().then((data) => {
            setQuizzes(Array.isArray(data) ? data : data.data);
        });
    }, []);

    const quizzesWithCategoryName = useMemo(() => {
        return quizzes.map((q) => {
            const categoryObj = categories.find(c => c.id === q.category_id);
            return {
                ...q,
                category: categoryObj ? categoryObj.name : 'Inconnu',
            };
        });
    }, [quizzes, categories]);

    const categoryNames = useMemo(
        () => Array.from(new Set(categories.map(c => c.name))),
        [categories]
    );

    const filteredQuizzes = useMemo(() => {
        return quizzesWithCategoryName.filter(quiz =>
            selectedCategory === 'all' || quiz.category === selectedCategory
        );
    }, [selectedCategory, quizzesWithCategoryName]);

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
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredQuizzes.map((quiz) => (
                            <TableRow key={quiz.id}>
                                <TableCell>{quiz.title}</TableCell>
                                <TableCell>{quiz.category}</TableCell>
                                <TableCell>{quiz.description}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/quiz/${quiz.id}`}
                                        variant="contained"
                                        sx={{ backgroundColor: '#F0A202', color: 'white' }}
                                    >
                                        Voir le quiz
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