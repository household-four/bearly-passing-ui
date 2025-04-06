import { QuestionDTO } from "./questionDto";
import { User } from "./user";

export interface StudySetDTO {
    id: number;
    description: string;
    title: string;
    questionIds: number[];
    questions: QuestionDTO[];
    creator: User;
}