const app = require('./server.js');
const supertest = require('supertest');
const request = supertest(app);

test('Gets total point balance', async () => {
    const res = await request.get('/')
    expect(res.status).toBe(200);
    expect(res.body.totalPoints).toBe(0);
});

test('Apply 300 points to DANNON', async () => {
    const res = await request.post('/add/DANNON/300');
    expect(res.status).toBe(200);
});

test('Apply 200 points to UNILEVER', async () => {
    const res = await request.post('/add/UNILEVER/200');
    expect(res.status).toBe(200);
});

test('Remove 200 points from DANNON', async () => {
    const res = await request.post('/remove/DANNON/200');
    expect(res.status).toBe(200);
});

test('Apply 10000 points to MILLER COORS', async () => {
    const res = await request.post('/add/MILLER COORS/10000');
    expect(res.status).toBe(200);
});

test('Apply 1000 points to DANNON', async () => {
    const res = await request.post('/add/DANNON/1000');
    expect(res.status).toBe(200);
});

test('Spend 5000 points', async () => {
    const res = await request.post('/spend').send({"points": 5000});
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([
        {"payer": "DANNON", "points": -100},
        {"payer": "UNILEVER", "points": -200},
        {"payer": "MILLER COORS", "points": -4700}
    ]);
});




