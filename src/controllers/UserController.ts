import { Request, Response } from "express";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../config/firebase";

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const users: any[] = [];
      usersSnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = req.body;
      const docRef = await addDoc(collection(db, "users"), newUser);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //   Delete user from collection
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // Delete user from collection
      await deleteDoc(doc(db, "users", id));
      //   res.status(204).send();
      res.status(204).json({ id });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Implement other CRUD operations similarly
}
