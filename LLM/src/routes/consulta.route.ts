import { Router, Request, Response } from 'express';
import { askLLM } from '../services/llm.service';


const consultaRouter = Router();

consultaRouter.post('/', async (req: Request, res: Response) => {
    const { pregunta } = req.body || {};

    if (!pregunta) {
        res.status(400).json({ message: 'La pregunta es requerida' });
        return;
    }

    try {
        const respuesta = await askLLM(pregunta);
        res.status(200).json({ respuesta });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

export default consultaRouter;