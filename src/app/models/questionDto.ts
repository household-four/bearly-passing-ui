export interface QuestionDTO {
    id: string;
    body: string;
    correctAnswer: string;
    difficulty: "EASY" | "MEDIUM" | "HARD"
}