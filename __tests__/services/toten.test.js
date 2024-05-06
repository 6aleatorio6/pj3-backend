import prisma from '../../src/prisma.js';
import bcrypt from 'bcrypt';
import app from '../../src/app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST - usuário parcial e visita', () => {

    beforeAll(async () =>{
        await request('http://127.0.0.1:3000').delete('/visita/1')
        await request('http://127.0.0.1:3000').delete('')
    })
})