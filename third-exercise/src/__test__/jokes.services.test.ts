import axios from 'axios';
import { getCombinedJokes } from '../services/joke.services';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getCombinedJokes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an array of combined jokes', async () => {
        // Mock Chuck Norris API responses
        for (let i = 1; i <= 5; i++) {
            mockedAxios.get.mockResolvedValueOnce({
                data: { value: `Chuck Joke ${i}` },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { url: 'https://api.chucknorris.io/jokes/random' },
            });
        }

        // Mock Dad Joke API responses
        for (let i = 1; i <= 5; i++) {
            mockedAxios.get.mockResolvedValueOnce({
                data: `Dad Joke ${i}`,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { url: 'https://icanhazdadjoke.com/' },
            });
        }

        const combinedJokes = await getCombinedJokes();

        expect(combinedJokes).toHaveLength(5);

        combinedJokes.forEach((jokePair, index) => {
            expect(jokePair).toHaveProperty('chuck', `Chuck Joke ${index + 1}`);
            expect(jokePair).toHaveProperty('dad', `dad Joke ${index + 1}`); // first letter lowercased
            expect(jokePair).toHaveProperty(
                'combinado',
                `Chuck Joke ${index + 1} Also, dad Joke ${index + 1}`
            );
        });
    });

    it('should throw an error if Chuck Norris API fails', async () => {
        // Mock Chuck API to fail
        mockedAxios.get
            .mockRejectedValueOnce(new Error('Chuck API failed'))
            // Fill the rest to avoid hanging promises
            .mockResolvedValue({
                data: { value: 'Chuck Joke' },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { url: 'https://api.chucknorris.io/jokes/random' },
            });

        await expect(getCombinedJokes()).rejects.toThrow('Chuck API failed');
    });

    it('should throw an error if Dad Joke API fails', async () => {
        // Mock Chuck jokes successfully
        for (let i = 0; i < 5; i++) {
            mockedAxios.get.mockResolvedValueOnce({
                data: { value: `Chuck Joke ${i + 1}` },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { url: 'https://api.chucknorris.io/jokes/random' },
            });
        }

        // Mock Dad joke API to fail
        mockedAxios.get.mockRejectedValueOnce(new Error('Dad API failed'));

        await expect(getCombinedJokes()).rejects.toThrow('Dad API failed');
    });

    it('should lowercase the first letter of Dad jokes', async () => {
        // Mock Chuck jokes
        for (let i = 0; i < 5; i++) {
            mockedAxios.get.mockResolvedValueOnce({
                data: { value: `Chuck Joke ${i + 1}` },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { url: 'https://api.chucknorris.io/jokes/random' },
            });
        }

        // Mock Dad jokes with uppercase start
        for (let i = 0; i < 5; i++) {
            mockedAxios.get.mockResolvedValueOnce({
                data: `Dad Joke Upper ${i + 1}`,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { url: 'https://icanhazdadjoke.com/' },
            });
        }

        const combinedJokes = await getCombinedJokes();

        combinedJokes.forEach((jokePair) => {
            expect(jokePair.dad.charAt(0)).toBe('d');
        });
    });
});

