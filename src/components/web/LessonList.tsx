import React, { useState, useMemo } from 'react';
import coursData from '../../data/courses.json';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box,
    Select, MenuItem, FormControl, InputLabel, TextField
} from '@mui/material';

type Course = {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
};

const LessonList: React.FC = () => {
    const [courses] = useState<Course[]>(coursData);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [search, setSearch] = useState<string>('');

    const categories = useMemo(
        () => Array.from(new Set(courses.map(c => c.category))),
        [courses]
    );

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
            const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                course.description.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, search, courses]);

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                padding: 2,
                paddingTop: '15vh', // ⬅️ compense la navbar fixed
            }}
        >
        {/* Filtres haut */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Catégorie"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <MenuItem value="all">Toutes</MenuItem>
                        {categories.map(cat => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Rechercher un mot clé"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ minWidth: 250 }}
                />
            </Box>

            {/* Tableau centré avec scroll interne */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <TableContainer
                    component={Paper}
                    sx={{
                        maxWidth: 1000,
                        width: '100%',
                        height: '50vh',
                        overflowY: 'auto',
                    }}
                >
                    <Table stickyHeader>
                        <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                            <TableRow>
                                <TableCell>Nom du cours</TableCell>
                                <TableCell>Thème</TableCell>
                                <TableCell>Mots clés</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCourses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>{course.category}</TableCell>
                                    <TableCell>Data</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#F0A202', color: 'white' }}
                                            href={`/lesson/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
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
