import { Router, Request, Response } from 'express';
import { lcm, increment } from '../services/math.services';

const mathRouter = Router()

mathRouter.get('/lcm', (req: Request, res: Response) => {
    const numbersParam = req.query.numbers as string || '';

    if (!numbersParam) {
        res.status(400).json({ message: 'Numbers query parameter is required' });
        return;
    }

    const numbers = numbersParam.split(',').map(Number);

    if (numbers.some(isNaN)) {
        res.status(400).json({ message: 'Numbers query parameter must be a comma-separated list of numbers' });
        return;
    }

    const result = lcm(numbers);
    res.status(200).json({lcm: result});
});

mathRouter.get('/increment', (req: Request, res: Response) => {
    const numberParam = req.query.number as string || '';

    if (!numberParam || isNaN(Number(numberParam))) {
        res.status(400).json({ message: 'Query parameter "number" must be a valid integer.' });
        return;
    }

    const result = increment(Number(numberParam));
    res.status(200).json({increment: result});
});

export default mathRouter;