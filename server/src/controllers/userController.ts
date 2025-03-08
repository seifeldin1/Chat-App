import { Request, Response } from "express";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({ username, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};
