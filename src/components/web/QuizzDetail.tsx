import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/apiService';
import {
    Box, Typography, Paper, RadioGroup,
    FormControlLabel, Radio, Button, Stack
} from '@mui/material';

type Question = {
    id: number;
    question: string;
    anwsers: string[];
    good_answer: number;
    id_quizz: number;
};

const QuizDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const userId = user?.id;

    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
    const [submitted, setSubmitted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        apiService.getQuestions().then((res: any) => {
            const all = res.data ?? res;
            const filtered = all.filter((q: Question) => q.id_quizz === Number(id));
            setQuestions(filtered);
        });
    }, [id]);

    const handleSelect = (questionId: number, answerIndex: number) => {
        if (!submitted) {
            setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
        }
    };

    const handleSubmit = async () => {
        setSubmitted(true);
        if (!userId) return;

        const now = new Date().toISOString();

        const existingReplies = await apiService.getReplies();
        const userReplies = existingReplies.data.filter((r: any) => r.id_user === userId);

        await Promise.all(
            questions.map(async (q) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.good_answer;

                const existing = userReplies.find((r: any) => r.id_question === q.id);

                if (existing) {
                    return apiService.patchReply(existing.id, {
                        score: isCorrect ? 1 : 0,
                        solve_at: now,
                    });
                } else {
                    return apiService.createReply({
                        id_user: userId,
                        id_question: q.id,
                        score: isCorrect ? 1 : 0,
                        solve_at: now,
                    });
                }
            })
        );
    };


    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
        setCurrentIndex(0);
    };

    const currentQuestion = questions[currentIndex];

    const getScore = () =>
        questions.reduce((score, q) =>
            answers[q.id] === q.good_answer ? score + 1 : score, 0);

    const getAnswerColor = (question: Question, index: number) => {
        if (!submitted) return undefined;
        const selected = answers[question.id];
        if (index + 1 === question.good_answer) return 'success';
        if (index + 1 === selected && selected !== question.good_answer) return 'error';
        return undefined;
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '85vh',
                px: 2,
                py: 4,
                backgroundColor: '#6E866B',
            }}
        >
            <Paper
                sx={{
                    p: 4,
                    maxWidth: 600,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 300,
                }}
            >
                {currentQuestion && (
                    <>
                        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                            Question {currentIndex + 1} sur {questions.length}
                        </Typography>
                        <Typography sx={{ mb: 2, textAlign: 'center' }}>
                            {currentQuestion.question}
                        </Typography>
                        <RadioGroup
                            value={answers[currentQuestion.id] ?? ''}
                            onChange={(e) => handleSelect(currentQuestion.id, Number(e.target.value))}
                        >
                            {currentQuestion.anwsers.map((answer, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={i + 1}
                                    control={<Radio color={getAnswerColor(currentQuestion, i)} />}
                                    label={answer}
                                    disabled={submitted}
                                />
                            ))}
                        </RadioGroup>

                        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setCurrentIndex(i => i - 1)}
                                disabled={currentIndex === 0}
                            >
                                Précédent
                            </Button>

                            {currentIndex < questions.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={() => setCurrentIndex(i => i + 1)}
                                >
                                    Suivant
                                </Button>
                            ) : (
                                !submitted && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                    >
                                        Valider mes réponses
                                    </Button>
                                )
                            )}
                        </Stack>
                    </>
                )}

                {submitted && (
                    <>
                        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
                            Score : {getScore()} / {questions.length}
                        </Typography>

                        {getScore() < questions.length ? (
                            <Button
                                variant="outlined"
                                onClick={handleRetry}
                                sx={{
                                    mt: 2,
                                    color: 'white',
                                    backgroundColor: '#F0A202',
                                    border: 'none',
                                    '&:hover': {
                                        backgroundColor: '#bd8003',
                                        color: 'white',
                                    },
                                }}
                            >
                                Réessayer
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="success"
                                href="/quiz"
                                sx={{ mt: 2 }}
                            >
                                Retour à la sélection
                            </Button>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default QuizDetail;
