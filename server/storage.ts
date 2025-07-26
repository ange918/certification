import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, students, type User, type InsertUser, type Student, type InsertStudent } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Student methods
  getStudent(id: string): Promise<Student | undefined>;
  getStudentByMatricule(matricule: string): Promise<Student | undefined>;
  getAllStudents(): Promise<Student[]>;
  createStudent(student: InsertStudent): Promise<Student>;
  studentMatriculeExists(matricule: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getStudent(id: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student || undefined;
  }

  async getStudentByMatricule(matricule: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.matricule, matricule.toUpperCase()));
    return student || undefined;
  }

  async getAllStudents(): Promise<Student[]> {
    return await db.select().from(students).orderBy(students.createdAt);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const [student] = await db
      .insert(students)
      .values({
        ...insertStudent,
        matricule: insertStudent.matricule.toUpperCase(),
        name: insertStudent.name.toUpperCase(),
      })
      .returning();
    return student;
  }

  async studentMatriculeExists(matricule: string): Promise<boolean> {
    const [existingStudent] = await db
      .select({ id: students.id })
      .from(students)
      .where(eq(students.matricule, matricule.toUpperCase()));
    return !!existingStudent;
  }
}

export const storage = new DatabaseStorage();
