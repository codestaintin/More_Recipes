import request from 'supertest';
import dotEnv from 'dotenv';
import { assert } from 'chai';
import server from '../../server';
import authSeed from './seeder/authSeed';
import recipeSeed from './seeder/recipeSeed';
import favoriteSeed from './seeder/favoriteSeed';

dotEnv.config();

describe('Test cases for all review actions', () => {
  before(authSeed.emptyUserTable);
  before(recipeSeed.emptyRecipeTable);
  before(authSeed.addUser);
  before(recipeSeed.addRecipe);

  let token;
  before((done) => {
    request(server)
      .post('/api/v1/users/signin')
      .send(authSeed.setLogin('mohzak@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });

  /**
   * Test cases for POST favorite actions
   */
  describe('POST /api/v1/recipes/:recipeId/favorite', () => {
    describe('Test for valid user before carrying out favorite actions', () => {
      it('should return a status code of 403 if user is not authorized', (done) => {
        request(server)
          .post('/api/v1/recipes/1/favorite')
          .send(favoriteSeed.setInput(1))
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Token not provided');
            done();
          });
      });
    });

    describe('Test for invalid authorization token', () => {
      it('should return a status code of 401 when' +
        'an invalid authorization token is entered', (done) => {
        request(server)
          .post('/api/v1/recipes/1/favorite')
          .set({ 'x-access-token': 'nonsense' })
          .send(favoriteSeed.setInput(1))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    });

    describe('Test for invalid authorization token', () => {
      it('should return a status code of 201 when' +
        'recipe becomes a favorite', (done) => {
        request(server)
          .post('/api/v1/recipes/1/favorite')
          .set({ 'x-access-token': token })
          .send(favoriteSeed.setInput(1))
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Recipe successfully made your favorite');
            done();
          });
      });
    });

    describe('Test for invalid authorization token', () => {
      it('should return a status code of 200 when' +
        'users want to get his/her favorite recipes', (done) => {
        request(server)
          .get('/api/v1/users/1/recipes')
          .set({ 'x-access-token': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.isObject(res.body);
            assert.isNotEmpty(res.body);
            assert.isObject(res.body.paginationMeta);
            assert.isArray(res.body.favorites);
            done();
          });
      });
    });
  });
});