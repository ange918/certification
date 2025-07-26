export interface Student {
  id: string;
  name: string;
  firstName: string;
  matricule: string;
  filiere: string;
  photo: string;
}

const STORAGE_KEY = 'futur_students';

const defaultStudents: Student[] = [
  {
    id: '1',
    name: 'KOUAKOU',
    firstName: 'Jean',
    matricule: 'FUT2024001',
    filiere: 'Informatique',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
  },
  {
    id: '2',
    name: 'DIABATE',
    firstName: 'Marie',
    matricule: 'FUT2024002',
    filiere: 'Marketing Digital',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
  },
  {
    id: '3',
    name: 'TRAORE',
    firstName: 'Amadou',
    matricule: 'FUT2024003',
    filiere: 'Comptabilité',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
  }
];

export const loadStudents = (): Student[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize with default data if none exists
    saveStudents(defaultStudents);
    return defaultStudents;
  } catch (error) {
    console.error('Error loading students:', error);
    return defaultStudents;
  }
};

export const saveStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving students:', error);
  }
};

export const findStudentByMatricule = (matricule: string): Student | null => {
  const students = loadStudents();
  return students.find(s => s.matricule.toUpperCase() === matricule.toUpperCase()) || null;
};

export const addStudent = (student: Omit<Student, 'id'>): Student => {
  const students = loadStudents();
  const newStudent: Student = {
    ...student,
    id: Date.now().toString()
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
};

export const studentMatriculeExists = (matricule: string): boolean => {
  const students = loadStudents();
  return students.some(s => s.matricule.toUpperCase() === matricule.toUpperCase());
};
