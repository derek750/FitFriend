import express from 'express';
import * as Gemini from '../controllers/geminiController';

const geminiRouter = express.Router();

geminiRouter.post('/newExercise', Gemini.newExercise);

export default geminiRouter;
