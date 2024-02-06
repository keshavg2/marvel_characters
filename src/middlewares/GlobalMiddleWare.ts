import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export class GlobalMiddleWare {
    static async authenticateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.header('Authorization');

        if (!token) return res.status(401).json({message: 'Access denied'});

        // @ts-ignore
        jwt.verify(token, process.env.jwt_secret, (err, user) => {
            if (err) return res.status(403).json({message: 'Invalid token'});

            console.log(user);
            req.body.user = user;
            next();
        });
    }
}

