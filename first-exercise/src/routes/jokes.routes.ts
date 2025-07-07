import { Router, Request, Response } from 'express';
import { getChuckNorrisJoke, getDadJoke } from "../services/joke.services";
import Joke from '../models/Joke';
import mongoose from 'mongoose';

const jokesRouter = Router();

const validJokeTypes = ['chuck', 'dad', ''];

jokesRouter.get('{/:type}', async (req: Request, res: Response) => {
    let jokeType = req.params?.type?.toLowerCase() ?? '';

    if (!validJokeTypes.includes(jokeType)) {
        res.status(400).json({ message: 'Invalid joke type. Try Chuck or Dad or leave it blank for a random joke.' });
        return;
    }

    if (!jokeType) {
        jokeType = Math.random() < 0.5 ? 'chuck' : 'dad';
    }

    try {
        let joke: string;
        if (jokeType === 'chuck')
            joke = await getChuckNorrisJoke();
        else
            joke = await getDadJoke();

        res.status(200).json({jokeType, joke});

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

jokesRouter.post('/', async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
        res.status(400).json({ message: 'Joke text is required.' });
        return;
    }

    try {
        const newJoke = await Joke.create({ text });
        res.status(201).json({ joke: newJoke.text, id: newJoke._id });
    } catch (error) {
        console.error('Error saving joke:', error);
        res.status(500).json({ message: 'Error saving joke.' });
    }
});

jokesRouter.put('/:number', async (req: Request, res: Response) => {
    const { number } = req.params;
    const { text } = req.body;
  
    if (!text) {
        res.status(400).json({ message: 'New joke text is required.' });
        return;
    }

    if (!number || !mongoose.Types.ObjectId.isValid(number)) {
        res.status(400).json({ message: 'Number must be passed and be a valid moongose id.' });
        return;
    }
  
    try {
      const updatedJoke = await Joke.findByIdAndUpdate(number, { text }, { new: true });
  
      if (!updatedJoke){
        res.status(404).json({ message: 'Joke not found.' });
        return;
      }
  
      res.status(201).json({ joke: updatedJoke.text, id: updatedJoke._id });
    } catch (error) {
      console.error('Error updating joke:', error);
      res.status(500).json({ message: 'Error updating joke.' });
    }
  });

jokesRouter.delete('/:number', async (req: Request, res: Response) => {
    const { number } = req.params;
    
    if (!number || !mongoose.Types.ObjectId.isValid(number)) {
        res.status(400).json({ message: 'Number must be passed and be a valid mongoose id.' });
        return;
    }
    
    try {
        const deletedJoke = await Joke.findByIdAndDelete(number);
        if (!deletedJoke) {
            res.status(404).json({ message: 'Joke not found.' });
            return;
        }

        res.status(200).json({ joke: deletedJoke.text, id: deletedJoke._id });
    } catch (error) {
        console.error('Error deleting joke:', error);
        res.status(500).json({ message: 'Error deleting joke.' });
    }
});

export default jokesRouter;
