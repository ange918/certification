import type { Student } from "@shared/schema";

export type { Student };

// API functions to interact with the database
export const findStudentByMatricule = async (matricule: string): Promise<Student | null> => {
  try {
    const response = await fetch(`/api/students/matricule/${encodeURIComponent(matricule)}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error finding student:', error);
    return null;
  }
};

export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const response = await fetch('/api/students');
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error loading students:', error);
    return [];
  }
};

export const addStudent = async (student: Omit<Student, 'id' | 'createdAt'>): Promise<Student | null> => {
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add student');
    }
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const studentMatriculeExists = async (matricule: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/students/check-matricule/${encodeURIComponent(matricule)}`);
    if (response.ok) {
      const result = await response.json();
      return result.exists;
    }
    return false;
  } catch (error) {
    console.error('Error checking matricule:', error);
    return false;
  }
};
