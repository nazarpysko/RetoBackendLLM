import supertest from 'supertest';
import app from '../app';
import * as jokeService from '../services/joke.services';

const api = supertest(app);

describe('GET /chistes/combinados', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an array of combined jokes', async () => {
        // Prepare mocked jokes
        const chuckJokes = Array.from({ length: 5 }, (_, i) => `Chuck Joke ${i + 1}`);
        const dadJokes = Array.from({ length: 5 }, (_, i) => `dad Joke ${i + 1}`);

        // Mock the joke service
        jest.spyOn(jokeService, 'getCombinedJokes').mockResolvedValueOnce(
            chuckJokes.map((chuckJoke, index) => ({
                chuck: chuckJoke,
                dad: dadJokes[index],
                combinado: `${chuckJoke} Also, ${dadJokes[index]}`
            }))
        );

        const response = await api.get('/api/v1/chistes/emparejados');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(5);

        response.body.forEach((jokePair: any, index: number) => {
            expect(jokePair).toHaveProperty('chuck', `Chuck Joke ${index + 1}`);
            expect(jokePair).toHaveProperty('dad', `dad Joke ${index + 1}`);
            expect(jokePair).toHaveProperty('combinado', `Chuck Joke ${index + 1} Also, dad Joke ${index + 1}`);
        });
    });

    it('should return 500 if joke service fails', async () => {
        jest.spyOn(jokeService, 'getCombinedJokes').mockRejectedValueOnce(new Error('Service failure'));

        const response = await api.get('/api/v1/chistes/emparejados');

        expect(response.status).toBe(500);
    });
});
