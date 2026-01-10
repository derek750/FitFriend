import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user';

declare module 'express-serve-static-core' {
    interface Request {
        isAuthenticated(): boolean;
        user?: IUser;
        login(user: any, done: (err: any) => void): void;
        logout(done: (err: any) => void): void;
    }
}

export interface AuthRequest extends Request {
    user?: IUser;
}

export const isAuthenticated = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Not authenticated. Please login with Google.' });
};