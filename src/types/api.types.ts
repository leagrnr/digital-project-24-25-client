export interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
    password?: string;
}

export interface Company {
    id: number;
    name: string;
    description?: string;
    website?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateCompanyData {
    name: string;
    description?: string;
    website?: string;
}

export interface UpdateCompanyData {
    name?: string;
    description?: string;
    website?: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateCategoryData {
    name: string;
    description?: string;
}

export interface UpdateCategoryData {
    name?: string;
    description?: string;
}

export interface Quiz {
    id: number;
    title: string;
    description?: string;
    category_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateQuizData {
    title: string;
    description?: string;
    category_id?: number;
}

export interface UpdateQuizData {
    title?: string;
    description?: string;
    category_id?: number;
}

export interface Lesson {
    id: number;
    title: string;
    content: string;
    category_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateLessonData {
    title: string;
    content: string;
    category_id?: number;
}

export interface UpdateLessonData {
    title?: string;
    content?: string;
    category_id?: number;
}

export interface Keyword {
    id: number;
    word: string;
    definition?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateKeywordData {
    word: string;
    definition?: string;
}

export interface UpdateKeywordData {
    word?: string;
    definition?: string;
}

export interface Reply {
    id: number;
    content: string;
    question_id: number;
    is_correct: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface CreateReplyData {
    content: string;
    question_id: number;
    is_correct: boolean;
}

export interface UpdateReplyData {
    content?: string;
    question_id?: number;
    is_correct?: boolean;
}

export interface Question {
    id: number;
    title: string;
    content: string;
    quiz_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateQuestionData {
    title: string;
    content: string;
    quiz_id: number;
}

export interface UpdateQuestionData {
    title?: string;
    content?: string;
    quiz_id?: number;
}

export interface Anecdote {
    id: number;
    title: string;
    content: string;
    category_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateAnecdoteData {
    title: string;
    content: string;
    category_id?: number;
}

export interface UpdateAnecdoteData {
    title?: string;
    content?: string;
    category_id?: number;
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}