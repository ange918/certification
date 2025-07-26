// Simple shared types for the application
export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Student {
  id: string;
  name: string;
  firstName: string;
  matricule: string;
  filiere: string;
  photo: string;
}

export type InsertUser = Omit<User, 'id'>;
export type InsertStudent = Omit<Student, 'id'>;
