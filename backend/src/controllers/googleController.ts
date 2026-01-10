import { Response } from 'express';
import passport from '../config/passport';
import { AuthRequest } from '../middleware/auth';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const startGoogleAuth = (req: AuthRequest, res: Response) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
};


export const handleGoogleCallback = passport.authenticate('google', {
    failureRedirect: 'http://localhost:5001/',
    successRedirect: 'http://localhost:5001/#/app', // must be same as host
}); 

export async function getUserInfo(req: AuthRequest, res: Response) {
    if (req.isAuthenticated() && req.user) {
        res.json({
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            picture: req.user.picture,
        });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}

export async function verifyGoogleUser(req: AuthRequest, res: Response) {
    try {
        const { idToken } = req.body;
        if (!idToken) return res.status(400).json({ error: 'No ID token' });

        // Verify the token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();
        if (!payload) return res.status(401).json({ error: 'Invalid token payload' });

        // Extract user info from payload
        const googleId = payload.sub;
        const email = payload.email;
        const name = payload.name;
        const picture = payload.picture;
        const emailVerified = payload.email_verified;

        // Optional: ensure email is verified
        if (!email || !emailVerified) {
            return res.status(403).json({ error: 'Email not verified' });
        }

        // Find or create user
        let user = await User.findOne({ googleId });
        if (!user) {
            user = await User.create({
                googleId,
                email,
                name,
                picture,
            });
        }

        req.logIn(user, (err) => {
            if (err) return res.status(450).json({ error: 'Failed to log in' });
            res.json({ user });
        });
        
        // Respond with user info (don't include secrets)
        res.json({ user: { id: user._id, email: user.email, name: user.name, picture: user.picture } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to verify token' });
    }
}