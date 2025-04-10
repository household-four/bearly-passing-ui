export interface GameDTO {
    gameType: string;
    id: number;
    studySetId: number;
    studySetName: string;
    userId: string;
    gameSessions: GameSession[]
}

export interface GameSession {
    id: number;
    gameId: number;
    gameType: "MATCHING" | "FLASHCARD" | "TIMED" | "ELIMINATION";
    studentId: number;
    studentName: string;
    studySetId: number;
    score: number;
    completed: boolean;
}