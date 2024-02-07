import express, { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
const router = express.Router();

export const userRoutes = (userController: UserController) => {
  // GET /api/users
  router.get("/", userController.getAllUsers.bind(userController));

  // POST /api/users
  router.post("/", userController.createUser.bind(userController));

  //   // GET /api/users/:id
  //   router.get("/:id", userController.getUserById.bind(userController));

  //   // PUT /api/users/:id
  //   router.put("/:id", userController.updateUser.bind(userController));

  // DELETE /api/users/:id
  router.delete("/:id", userController.deleteUser.bind(userController));

  return router;
};
