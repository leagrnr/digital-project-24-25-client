import type {
    User, CreateUserData, UpdateUserData,
    Company, CreateCompanyData, UpdateCompanyData,
    Category, CreateCategoryData, UpdateCategoryData,
    Quiz, CreateQuizData, UpdateQuizData,
    Lesson, CreateLessonData, UpdateLessonData,
    Keyword, CreateKeywordData, UpdateKeywordData,
    Reply, CreateReplyData, UpdateReplyData,
    Question, CreateQuestionData, UpdateQuestionData,
    Anecdote, CreateAnecdoteData, UpdateAnecdoteData,
    ApiError
} from '../types/api.types';

const BASE_URL = 'https://medef.frize.xyz';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

class ApiService {
    private baseURL: string;

    constructor() {
        this.baseURL = BASE_URL;
    }

    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const error: ApiError = {
                    message: errorData.message || `HTTP error! status: ${response.status}`,
                    status: response.status,
                    errors: errorData.errors,
                };
                throw error;
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error && 'status' in error) {
                throw error; // Re-throw API errors
            }

            console.error('API request failed:', error);
            throw new Error('Network error or request failed');
        }
    }

    // === USERS ===
    async getCurrentUser(): Promise<User> {
        return this.request<User>('/api/user');
    }

    async getUsers(): Promise<User[]> {
        const response = await this.request<{ data: User[] }>('/api/users');
        return response.data;
    }

    async createUser(userData: CreateUserData): Promise<User> {
        return this.request<User>('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async getUser(userId: number): Promise<User> {
        return this.request<User>(`/api/users/${userId}`);
    }

    async updateUser(userId: number, userData: UpdateUserData): Promise<User> {
        return this.request<User>(`/api/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async patchUser(userId: number, userData: Partial<UpdateUserData>): Promise<User> {
        return this.request<User>(`/api/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(userData),
        });
    }

    async deleteUser(userId: number): Promise<void> {
        return this.request<void>(`/api/users/${userId}`, {
            method: 'DELETE',
        });
    }

    // === COMPANIES ===
    async getCompanies(): Promise<Company[]> {
        return this.request<Company[]>('/api/compagnies');
    }

    async createCompany(companyData: CreateCompanyData): Promise<Company> {
        return this.request<Company>('/api/compagnies', {
            method: 'POST',
            body: JSON.stringify(companyData),
        });
    }

    async getCompany(companyId: number): Promise<Company> {
        return this.request<Company>(`/api/compagnies/${companyId}`);
    }

    async updateCompany(companyId: number, companyData: UpdateCompanyData): Promise<Company> {
        return this.request<Company>(`/api/compagnies/${companyId}`, {
            method: 'PUT',
            body: JSON.stringify(companyData),
        });
    }

    async patchCompany(companyId: number, companyData: Partial<UpdateCompanyData>): Promise<Company> {
        return this.request<Company>(`/api/compagnies/${companyId}`, {
            method: 'PATCH',
            body: JSON.stringify(companyData),
        });
    }

    async deleteCompany(companyId: number): Promise<void> {
        return this.request<void>(`/api/compagnies/${companyId}`, {
            method: 'DELETE',
        });
    }

    // === CATEGORIES ===
    async getCategories(): Promise<Category[]> {
        return this.request<Category[]>('/api/categories');
    }

    async createCategory(categoryData: CreateCategoryData): Promise<Category> {
        return this.request<Category>('/api/categories', {
            method: 'POST',
            body: JSON.stringify(categoryData),
        });
    }

    async getCategory(categoryId: number): Promise<Category> {
        return this.request<Category>(`/api/categories/${categoryId}`);
    }

    async updateCategory(categoryId: number, categoryData: UpdateCategoryData): Promise<Category> {
        return this.request<Category>(`/api/categories/${categoryId}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData),
        });
    }

    async patchCategory(categoryId: number, categoryData: Partial<UpdateCategoryData>): Promise<Category> {
        return this.request<Category>(`/api/categories/${categoryId}`, {
            method: 'PATCH',
            body: JSON.stringify(categoryData),
        });
    }

    async deleteCategory(categoryId: number): Promise<void> {
        return this.request<void>(`/api/categories/${categoryId}`, {
            method: 'DELETE',
        });
    }

    // === QUIZZES ===
    async getQuizzes(): Promise<Quiz[]> {
        return this.request<Quiz[]>('/api/quizz');
    }

    async createQuiz(quizData: CreateQuizData): Promise<Quiz> {
        return this.request<Quiz>('/api/quizz', {
            method: 'POST',
            body: JSON.stringify(quizData),
        });
    }

    async getQuiz(quizId: number): Promise<Quiz> {
        return this.request<Quiz>(`/api/quizz/${quizId}`);
    }

    async updateQuiz(quizId: number, quizData: UpdateQuizData): Promise<Quiz> {
        return this.request<Quiz>(`/api/quizz/${quizId}`, {
            method: 'PUT',
            body: JSON.stringify(quizData),
        });
    }

    async patchQuiz(quizId: number, quizData: Partial<UpdateQuizData>): Promise<Quiz> {
        return this.request<Quiz>(`/api/quizz/${quizId}`, {
            method: 'PATCH',
            body: JSON.stringify(quizData),
        });
    }

    async deleteQuiz(quizId: number): Promise<void> {
        return this.request<void>(`/api/quizz/${quizId}`, {
            method: 'DELETE',
        });
    }

    // === LESSONS ===
    async getLessons(): Promise<Lesson[]> {
        return this.request<Lesson[]>('/api/lessons');
    }

    async createLesson(lessonData: CreateLessonData): Promise<Lesson> {
        return this.request<Lesson>('/api/lessons', {
            method: 'POST',
            body: JSON.stringify(lessonData),
        });
    }

    async getLesson(lessonId: number): Promise<Lesson> {
        return this.request<Lesson>(`/api/lessons/${lessonId}`);
    }

    async updateLesson(lessonId: number, lessonData: UpdateLessonData): Promise<Lesson> {
        return this.request<Lesson>(`/api/lessons/${lessonId}`, {
            method: 'PUT',
            body: JSON.stringify(lessonData),
        });
    }

    async patchLesson(lessonId: number, lessonData: Partial<UpdateLessonData>): Promise<Lesson> {
        return this.request<Lesson>(`/api/lessons/${lessonId}`, {
            method: 'PATCH',
            body: JSON.stringify(lessonData),
        });
    }

    async deleteLesson(lessonId: number): Promise<void> {
        return this.request<void>(`/api/lessons/${lessonId}`, {
            method: 'DELETE',
        });
    }

    // === KEYWORDS ===
    async getKeywords(): Promise<Keyword[]> {
        return this.request<Keyword[]>('/api/keywords');
    }

    async createKeyword(keywordData: CreateKeywordData): Promise<Keyword> {
        return this.request<Keyword>('/api/keywords', {
            method: 'POST',
            body: JSON.stringify(keywordData),
        });
    }

    async getKeyword(keywordId: number): Promise<Keyword> {
        return this.request<Keyword>(`/api/keywords/${keywordId}`);
    }

    async updateKeyword(keywordId: number, keywordData: UpdateKeywordData): Promise<Keyword> {
        return this.request<Keyword>(`/api/keywords/${keywordId}`, {
            method: 'PUT',
            body: JSON.stringify(keywordData),
        });
    }

    async patchKeyword(keywordId: number, keywordData: Partial<UpdateKeywordData>): Promise<Keyword> {
        return this.request<Keyword>(`/api/keywords/${keywordId}`, {
            method: 'PATCH',
            body: JSON.stringify(keywordData),
        });
    }

    async deleteKeyword(keywordId: number): Promise<void> {
        return this.request<void>(`/api/keywords/${keywordId}`, {
            method: 'DELETE',
        });
    }

    // === REPLIES ===
    async getReplies(): Promise<Reply[]> {
        return this.request<Reply[]>('/api/replies');
    }

    async createReply(replyData: CreateReplyData): Promise<Reply> {
        return this.request<Reply>('/api/replies', {
            method: 'POST',
            body: JSON.stringify(replyData),
        });
    }

    async getReply(replyId: number): Promise<Reply> {
        return this.request<Reply>(`/api/replies/${replyId}`);
    }

    async updateReply(replyId: number, replyData: UpdateReplyData): Promise<Reply> {
        return this.request<Reply>(`/api/replies/${replyId}`, {
            method: 'PUT',
            body: JSON.stringify(replyData),
        });
    }

    async patchReply(replyId: number, replyData: Partial<UpdateReplyData>): Promise<Reply> {
        return this.request<Reply>(`/api/replies/${replyId}`, {
            method: 'PATCH',
            body: JSON.stringify(replyData),
        });
    }

    async deleteReply(replyId: number): Promise<void> {
        return this.request<void>(`/api/replies/${replyId}`, {
            method: 'DELETE',
        });
    }

    // === QUESTIONS ===
    async getQuestions(): Promise<Question[]> {
        return this.request<Question[]>('/api/questions');
    }

    async createQuestion(questionData: CreateQuestionData): Promise<Question> {
        return this.request<Question>('/api/questions', {
            method: 'POST',
            body: JSON.stringify(questionData),
        });
    }

    async getQuestion(questionId: number): Promise<Question> {
        return this.request<Question>(`/api/questions/${questionId}`);
    }

    async updateQuestion(questionId: number, questionData: UpdateQuestionData): Promise<Question> {
        return this.request<Question>(`/api/questions/${questionId}`, {
            method: 'PUT',
            body: JSON.stringify(questionData),
        });
    }

    async patchQuestion(questionId: number, questionData: Partial<UpdateQuestionData>): Promise<Question> {
        return this.request<Question>(`/api/questions/${questionId}`, {
            method: 'PATCH',
            body: JSON.stringify(questionData),
        });
    }

    async deleteQuestion(questionId: number): Promise<void> {
        return this.request<void>(`/api/questions/${questionId}`, {
            method: 'DELETE',
        });
    }

    // === ANECDOTES ===
    async getAnecdotes(): Promise<Anecdote[]> {
        return this.request<Anecdote[]>('/api/anecdoctes');
    }

    async createAnecdote(anecdoteData: CreateAnecdoteData): Promise<Anecdote> {
        return this.request<Anecdote>('/api/anecdoctes', {
            method: 'POST',
            body: JSON.stringify(anecdoteData),
        });
    }

    async getAnecdote(anecdoteId: number): Promise<Anecdote> {
        return this.request<Anecdote>(`/api/anecdoctes/${anecdoteId}`);
    }

    async updateAnecdote(anecdoteId: number, anecdoteData: UpdateAnecdoteData): Promise<Anecdote> {
        return this.request<Anecdote>(`/api/anecdoctes/${anecdoteId}`, {
            method: 'PUT',
            body: JSON.stringify(anecdoteData),
        });
    }

    async patchAnecdote(anecdoteId: number, anecdoteData: Partial<UpdateAnecdoteData>): Promise<Anecdote> {
        return this.request<Anecdote>(`/api/anecdoctes/${anecdoteId}`, {
            method: 'PATCH',
            body: JSON.stringify(anecdoteData),
        });
    }

    async deleteAnecdote(anecdoteId: number): Promise<void> {
        return this.request<void>(`/api/anecdoctes/${anecdoteId}`, {
            method: 'DELETE',
        });
    }

    // === AUTHENTICATION ===
    async login(email: string, password: string): Promise<{ token: string }> {
        return this.request<{ token: string }>('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }
}

const apiService = new ApiService();
export default apiService;