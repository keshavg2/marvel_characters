import { Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async (req: Request, res: Response) => {
    // Implement signup logic, insert user data into the database
    const { name, email, phone_number, password } = req.body;
    console.log(name, email, phone_number, password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            phone_number: phone_number,
            password: hashedPassword,
        },
    });
    res.json({ message: 'Signup successful', user: newUser });
};

export const login = async (req: Request, res: Response) => {
    // Implement login logic, validate user credentials

    const { phone_number, password } = req.body;

    // Find the user by email in the database
    const user = await prisma.user.findFirst({ where: { phone_number } });

    // If user not found or password is incorrect
    console.log(user, password, user.password);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid phone or password' });
    }

    // Generate a JWT token
    // @ts-ignore
    const token = jwt.sign({ userId: user.id, userPhone: user.phone_number }, process.env.jwt_secret , { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token: token });
};
