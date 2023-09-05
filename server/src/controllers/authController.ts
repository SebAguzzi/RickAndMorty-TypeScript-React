import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import * as admin from "firebase-admin";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const userRecord = await admin
      .auth()
      .getUserByEmail(username)
      .catch(() => null);

    const existingUser = await User.findOne({ where: { username } });

    if (userRecord || existingUser) {
      return res.status(401).json({
        msg: "Email address is already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    await createUserInFirebase(username, password);

    return res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred on the server." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const existingUser = await User.findOne({ where: { username } });

    if (!existingUser) {
      return res.status(400).json({ message: "Username does not exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred on the server." });
  }
};

export const users = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("User listing error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred on the server." });
  }
};

export const createUserInFirebase = async (email: string, password: string) => {
  // Crea el usuario en Firebase Authentication
  const userRecord = await admin.auth().createUser({
    email,
    password,
  });
};
