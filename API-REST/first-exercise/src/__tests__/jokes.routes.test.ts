import supertest from 'supertest';
import app from '../app';
import * as jokeService from '../services/joke.services';
import Joke from '../models/Joke';
import mongoose from 'mongoose';
import clearAndPopulateDatabase from './helper';

const api = supertest(app);

const API_PREFIX = '/api/v1';

afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
});

describe('Jokes Router', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    describe('GET /jokes', () => {
        it('should return a Chuck Norris joke when type is chuck', async () => {
            jest.spyOn(jokeService, 'getChuckNorrisJoke').mockResolvedValueOnce('Chuck joke!');
            
            const response = await api.get(`${API_PREFIX}/jokes/chuck`);
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ jokeType: 'chuck', joke: 'Chuck joke!' });
        });
    
        it('should return a Dad joke when type is dad', async () => {
            jest.spyOn(jokeService, 'getDadJoke').mockResolvedValueOnce('Dad joke!');
            
            const response = await api.get(`${API_PREFIX}/jokes/dad`);
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ jokeType: 'dad', joke: 'Dad joke!' });
        });
    
        it('should return 400 for invalid joke type', async () => {
            const response = await api.get(`${API_PREFIX}/jokes/invalid`);
            
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Invalid joke type. Try Chuck or Dad or leave it blank for a random joke.' });
        });
    
        it('should return a joke when type is missing (random joke type)', async () => {
            // Mock both jokes because we can't control Math.random easily
            jest.spyOn(jokeService, 'getChuckNorrisJoke').mockResolvedValue('Chuck joke!');
            jest.spyOn(jokeService, 'getDadJoke').mockResolvedValue('Dad joke!');
    
            const response = await api.get(`${API_PREFIX}/jokes`);
            
            expect(response.status).toBe(200);
            // Since jokeType is random, just check that the joke matches one of the mocked responses
            expect(['chuck', 'dad']).toContain(response.body.jokeType);
            expect(['Chuck joke!', 'Dad joke!']).toContain(response.body.joke);
        });
    
        it('should return 500 if API call fails', async () => {
            jest.spyOn(jokeService, 'getChuckNorrisJoke').mockRejectedValueOnce(new Error('API failed'));
    
            const response = await api.get(`${API_PREFIX}/jokes/chuck`);
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error fetching data' });
        });
    });

    describe('POST /jokes', () => {
        it('should create a new joke when text is provided in request body', async () => {
            const response = await api.post(`${API_PREFIX}/jokes`).send({ text: 'Test joke' });
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('joke' , 'Test joke');
            expect(response.body).toHaveProperty('id');
        });

        it('should return 400 if text is not provided in request body', async () => {
            const response = await api.post(`${API_PREFIX}/jokes`).send({});
            
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Joke text is required.' });
        });

        it('should return 500 if Mongoose error occurs', async () => {
            jest.spyOn(Joke, 'create').mockRejectedValueOnce(new Error('Error saving joke. '));

            const response = await api.post(`${API_PREFIX}/jokes`).send({ text: 'Test joke' });
            
            expect(response.status).toBe(500);
        });
    });

    describe('PUT /jokes/:number', () => {
        let jokeIds: string[];

        const validAndNonExistingId = new mongoose.Types.ObjectId();
        
        beforeAll(async () => {
            jokeIds = await clearAndPopulateDatabase();
        });
        
        it('should update a joke when text is provided in request body', async () => {
            const jokeId = jokeIds[0];
            
            const response = await api.put(`${API_PREFIX}/jokes/${jokeId}`).send({ text: 'Updated joke' });
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('joke' , 'Updated joke');
            expect(response.body).toHaveProperty('id');
        });

        it('should return 400 if text is not provided in request body', async () => {
            const jokeId = jokeIds[0];
            
            const response = await api.put(`${API_PREFIX}/jokes/${jokeId}`).send({});
            
            expect(response.status).toBe(400);
        });

        it('should return 400 if number is not a valid integer', async () => {
            const response = await api.put(`${API_PREFIX}/jokes/a`).send({ text: 'Updated joke' });
            
            expect(response.status).toBe(400);
        });

        it('should return 404 if joke is not found', async () => {
            const response = await api.put(`${API_PREFIX}/jokes/${validAndNonExistingId}`).send({ text: 'Updated joke' });
            
            expect(response.status).toBe(404);
        });

        it('should return 500 if Mongoose error occurs', async () => {
            jest.spyOn(Joke, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Error updating joke. '));
            
            const response = await api.put(`${API_PREFIX}/jokes/${validAndNonExistingId}`).send({ text: 'Updated joke' });
            
            expect(response.status).toBe(500);
        });
    });

    describe('DELETE /jokes/:number', () => {
        let jokeIds: string[];
        const validAndNonExistingId = new mongoose.Types.ObjectId();
      
        beforeAll(async () => {
          jokeIds = await clearAndPopulateDatabase();
        });
      
        it('should delete a joke successfully when valid id is provided', async () => {
          const jokeId = jokeIds[0];
      
          const response = await api.delete(`${API_PREFIX}/jokes/${jokeId}`);
      
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('joke');
          expect(response.body).toHaveProperty('id', jokeId);
        });
      
        it('should return 400 if number is invalid', async () => {
          const response = await api.delete(`${API_PREFIX}/jokes/asdfa`);
      
          expect(response.status).toBe(400);
        });
      
        it('should return 404 if joke to delete is not found', async () => {
          const response = await api.delete(`${API_PREFIX}/jokes/${validAndNonExistingId}`);
      
          expect(response.status).toBe(404);
        });
      
        it('should return 500 if Mongoose error occurs during deletion', async () => {
          jest.spyOn(Joke, 'findByIdAndDelete').mockRejectedValueOnce(new Error('Error deleting joke.'));
      
          const jokeId = jokeIds[0];
          const response = await api.delete(`${API_PREFIX}/jokes/${jokeId}`);
      
          expect(response.status).toBe(500);
        });
      });
      
});
