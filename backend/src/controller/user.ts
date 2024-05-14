import { Router, Request, Response } from 'express';
import { models } from '../models/index';  // Adjust the path as necessary
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Controller functions to call CRUD APIs

// You can access models like this
const { User } = models;

export const createUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const user = await User.findOne({where:{email}});
        if(user){
            res.status(400).json({ message: 'User Already Exists' });
        }else{
        try {
            const hashedPassword  = await bcrypt.hash(password, saltRounds);
            await User.create({ email, username, password: hashedPassword });
            res.sendStatus(201)
        } catch (error) {
            res.status(400).json({ message: 'Failed to create user: ' + (error as Error).message });
        }
    }
}

export const getUSer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } }); // Await the promise

        if (user) { // Check if user is not null
            res.status(200).json({
                data: {
                    username: user.username,
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' }); // Handle the case where user is null
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
};

export const signin = async (req: Request, res: Response) => {
    const { email,  password } = req.body;
    try {
        const user = await User.findOne({where:{email}});
        if(user){
            const compare =await  bcrypt.compare(password, user.password)
            if(compare){
                res.status(200).json({
                    email: user.email,
                    token: `USER_TOKEN_${user.email}_4321`,
                    id:user.id
                })
            }else{
                res.status(400).json({
                    message:'Invalid credentials'
                })
            }
        }else{
            res.status(400).json({
                message:'Invalid credentials'
            })
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to login user: ' + (error as Error).message });
    }
}

