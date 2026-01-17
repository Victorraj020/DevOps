const request = require('supertest');
const app = require('../src/index');

describe('GET /', () => {
    let server;

    beforeAll(() => {
        server = app.listen(0); // Start on random port
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return 200 OK', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });
});

describe('GET /health', () => {
    let server;

    beforeAll(() => {
        server = app.listen(0); // Start on random port
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return 200 OK and status UP', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('UP');
    });
});
