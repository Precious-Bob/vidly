const req = require('supertest');
const app = require('../../app');
const genreModel = require('../../models/genreModel');

describe('create genre', () => {
  it('should return 201 and the task created', async () => {
    const res = await req(app)
      .post('/api/genres')
      .set('content-type', 'application/json')
      .send({
        name: 'genre created',
        completed: 'true',
      });
    expect(res.body).toHaveProperty('genre');
  });
});
