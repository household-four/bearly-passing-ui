export interface User {
    id: number;
    grade?: number;
    name: string;
    username: string;
    role: "TEACHER" | "STUDENT" | "ADMIN";
    roleName: "TEACHER" | "STUDENT" | "ADMIN";
}

export interface UserDTO {
    id: number;
    username: string;
    role: "TEACHER" | "STUDENT" | "ADMIN";
}