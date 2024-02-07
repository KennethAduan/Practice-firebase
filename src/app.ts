import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { userRoutes } from "./routes/userRoutes";
import { UserController } from "./controllers/UserController";

require("dotenv").config();
const app = express();
const userController = new UserController();

const port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes(userController));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
