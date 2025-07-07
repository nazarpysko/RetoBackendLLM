import { Router } from "express";
import { getCombinedJokes } from "../services/joke.services";

const jokesRouter = Router();

jokesRouter.get('/emparejados', async (req, res) => {
    const useLLM = req.query.useLLM === 'true';

    try {
        const combinedJokes = await getCombinedJokes(useLLM);
        res.status(200).json(combinedJokes);
    } catch (error) {
        console.error('Error fetching combined jokes:', error);
        res.status(500).json({ message: 'Error fetching combined jokes.' });
    }
});

export default jokesRouter;