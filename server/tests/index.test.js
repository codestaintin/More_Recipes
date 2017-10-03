import request from 'supertest';
import server from '../../server';

describe('/GET: /api/v1/ Tests for index routes', () => {
  it('should return status code 404 when user visit an unregistered route', (done) => {
    request(server)
      .get('/api/v1/unregisteredroute')
      .expect(404)
      .end(done);
  });
  it('should return status code 200 when user visits the index route', (done) => {
    request(server)
      .get('/api/v1/')
      .expect(200)
      .end(done);
  });
});
