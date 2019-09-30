import { Teacher } from './person';

export interface Subject {
    id: string;
    name: string;
    teacherId: string;
    cabinet: string;
    description: string;
}
