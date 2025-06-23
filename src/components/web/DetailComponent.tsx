import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import {
    Box, Typography, Paper, Button
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

type LessonApi = {
    id: number;
    name: string;
    content: string;
    id_categorie: number;
    ceated_at?: string;
    updated_at?: string;
    is_read?: boolean;
};

const LessonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [lesson, setLesson] = useState<LessonApi | null>(null);
    const [isRead, setIsRead] = useState(false);

    useEffect(() => {
        if (id) {
            apiService.getLesson(Number(id)).then((res: any) => {
                const lessonData = res.data ?? res;
                setLesson(lessonData);
                setIsRead(lessonData.is_read ?? false);
            });
        }
    }, [id]);

    if (!lesson) return <div>Chargement...</div>;

    const formattedDate = lesson.ceated_at
        ? new Date(lesson.ceated_at).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : '';

    const handleRead = async () => {
        if (!lesson) return;
        try {
            await apiService.patchLesson(lesson.id, { is_read: true });
            setIsRead(true);
            setLesson({ ...lesson, is_read: true });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error);
        }
    };

    return (
        <Box sx={{ mt: '15vh', px: 2 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 900, mx: 'auto' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {lesson.name}
                </Typography>
                {formattedDate && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {formattedDate}
                    </Typography>
                )}
                <Box
                    sx={{
                        textAlign: 'justify',
                        mb: 3,
                        '& h2': { fontSize: '1.2rem', fontWeight: 'bold', mt: 2 },
                        '& ul': {
                            pl: 3,
                            mb: 2,
                            listStyleType: 'disc',
                            listStylePosition: 'inside'
                        },
                        '& li': {
                            mb: 0.5,
                            display: 'list-item'
                        },
                        '& p': { mb: 2 },
                    }}
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
                <Button
                    variant={isRead ? "contained" : "outlined"}
                    color={isRead ? "success" : "primary"}
                    startIcon={<CheckIcon />}
                    sx={{ mt: 2 }}
                    onClick={handleRead}
                    disabled={isRead}
                >
                    {isRead ? "Cours lu" : "J’ai lu le cours"}
                </Button>
            </Paper>
        </Box>
    );
};

export default LessonDetail;