import request from 'supertest';
import express from 'express';
import mathRouter from '../routes/math.routes';
import supertest from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

const api = supertest(app);

const API_PREFIX = '/api/v1';

beforeEach(() => {
    jest.clearAllMocks();
});

afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
});

describe('Math Routes', () => {
   
    describe('LCM', () => {
        it('should return 400 if the query parameter is not provided', async () => {
            const response = await api.get(`${API_PREFIX}/math/lcm`);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Numbers query parameter is required' });
        });

        it('should return 400 if the query parameter is not a comma-separated list of numbers', async () => {
            const response = await api.get(`${API_PREFIX}/math/lcm?numbers=1,2,3,4,a`);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Numbers query parameter must be a comma-separated list of numbers' });
        });
        
        it('should return the LCM of an array of ordered numbers', async () => {
            const response = await api.get(`${API_PREFIX}/math/lcm?numbers=1,2,3`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ lcm: 6 });
        });

        it('should return the LCM of an array of unordered numbers', async () => {
            const response = await api.get(`${API_PREFIX}/math/lcm?numbers=4,2,9`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ lcm: 36 });
        });
    });

    describe('Increment', () => {
        it('should return 400 if the query parameter is not provided', async () => {
            const response = await api.get(`${API_PREFIX}/math/increment`);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Query parameter "number" must be a valid integer.' });
        });

        it('should return 400 if the query parameter is not a valid integer', async () => {
            const response = await api.get(`${API_PREFIX}/math/increment?number=a`);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Query parameter "number" must be a valid integer.' });
        });

        it('should return the increment of a number', async () => { 
            const response = await api.get(`${API_PREFIX}/math/increment?number=1`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ increment: 2 });
        });
    });
    
});

