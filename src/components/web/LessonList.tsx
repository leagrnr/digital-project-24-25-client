import React, { useState, useMemo, useEffect } from 'react';
import apiService from '../../services/apiService';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box,
    Select, MenuItem, FormControl, InputLabel, TextField, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type LessonFromApi = {
    id: number;
    name: string;
    content: string;
    id_categorie: number;
};

type Lesson = {
    id: number;
    title: string;
    description: string;
    category: string;
};

type Keyword = {
    id: number;
    keyword: string;
    id_lesson: number;
};

type Category = {
    id: number;
    name: string;
};

const LessonList: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [keywords, setKeywords] = useState<Keyword[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [search, setSearch] = useState<string>('');
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
        apiService.getLessons().then((data) => {
            const lessonsArray = Array.isArray(data) ? data : data.data;
            setLessons(lessonsArray);
        });
        apiService.getKeywords().then((data) => {
            setKeywords(Array.isArray(data) ? data : data.data);
        });
    }, []);

    const lessonsWithCategoryName = useMemo(() => {
        return lessons.map((l: LessonFromApi) => {
            const categoryObj = categories.find(c => c.id === l.id_categorie);
            return {
                id: l.id,
                title: l.name,
                description: l.content.replace(/<[^>]+>/g, ''),
                category: categoryObj ? categoryObj.name : 'Inconnu',
            };
        });
    }, [lessons, categories]);

    const categoryNames = useMemo(
        () => Array.from(new Set(categories.map(c => c.name))),
        [categories]
    );

    const filteredLessons = useMemo(() => {
        return lessonsWithCategoryName.filter(lesson => {
            const lessonKeywords = keywords
                .filter(k => k.id_lesson === lesson.id)
                .map(k => k.keyword)
                .join(' ')
                .toLowerCase();

            const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
            const matchesSearch = lessonKeywords.includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, search, lessonsWithCategoryName, keywords]);

    const getKeywordsForLesson = (lessonId: number) =>
        keywords.filter(k => k.id_lesson === lessonId).map(k => k.keyword).join(', ');

    return (
        <Box
            sx={{
                maxWidth: { xs: '100%', md: 1000 },
                margin: '15vh auto 0 auto',
                px: { xs: 1, md: 0 },
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: 3,
                }}
            >
                Vos cours
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    justifyContent: { xs: 'flex-start', sm: 'space-between' },
                    gap: 2,
                    marginBottom: 2,
                }}
            >
                <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
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
                <TextField
                    label="Rechercher un mot clé"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ minWidth: { xs: '100%', sm: 250 } }}
                />
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <TableContainer
                    component={Paper}
                    sx={{
                        width: '100%',
                        overflowX: 'hidden',
                    }}
                >
                    <Table
                        stickyHeader
                        size="small"
                        sx={{
                            tableLayout: 'auto',
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom du cours</TableCell>
                                <TableCell>Thème</TableCell>
                                <TableCell>Mots clés</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredLessons.map((lesson) => (
                                <TableRow key={lesson.id}>
                                    <TableCell sx={{ wordBreak: 'break-word', maxWidth: '150px' }}>
                                        {lesson.title}
                                    </TableCell>
                                    <TableCell sx={{ wordBreak: 'break-word', maxWidth: '100px' }}>
                                        {lesson.category}
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '200px' }}>
                                        {getKeywordsForLesson(lesson.id)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            fullWidth
                                            component={Link}
                                            to={`/lesson/${lesson.id}`}
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#F0A202',
                                                color: 'white',
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                px: 1,
                                                py: 0.5,
                                                maxWidth: 120,
                                            }}
                                        >
                                            Voir le cours
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default LessonList;