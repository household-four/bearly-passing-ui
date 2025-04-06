export interface QuestionDTO {
    id: string;
    body: string;
    correctAnswer: string;
    difficulty: "EASY" | "MEDIUM" | "HARD"
}

export interface NewQuestion { 
    body: string;
    correctAnswer: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    studySet: { id: number };
}