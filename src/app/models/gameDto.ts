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
    studentId: number;
    studentName: string;
    score: number;
    completed: boolean;
}