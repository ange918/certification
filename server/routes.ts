import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStudentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Student routes
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.getAllStudents();
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  app.get("/api/students/matricule/:matricule", async (req, res) => {
    try {
      const { matricule } = req.params;
      const student = await storage.getStudentByMatricule(matricule);
      
      if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
      }
      
      res.json(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ error: "Failed to fetch student" });
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      const studentData = insertStudentSchema.parse(req.body);
      
      // Check if matricule already exists
      const exists = await storage.studentMatriculeExists(studentData.matricule);
      if (exists) {
        res.status(400).json({ error: "Ce matricule existe déjà" });
        return;
      }
      
      const student = await storage.createStudent(studentData);
      res.status(201).json(student);
    } catch (error: any) {
      console.error("Error creating student:", error);
      if (error.name === "ZodError") {
        res.status(400).json({ error: "Invalid student data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create student" });
      }
    }
  });

  app.get("/api/students/check-matricule/:matricule", async (req, res) => {
    try {
      const { matricule } = req.params;
      const exists = await storage.studentMatriculeExists(matricule);
      res.json({ exists });
    } catch (error) {
      console.error("Error checking matricule:", error);
      res.status(500).json({ error: "Failed to check matricule" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
