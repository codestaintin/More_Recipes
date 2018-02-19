import request from 'supertest';
import dotEnv from 'dotenv';
import { assert } from 'chai';
import server from '../../server';
import authSeed from './seeder/authSeed';
import recipeSeed from './seeder/recipeSeed';
import favoriteSeed from './seeder/favoriteSeed';

dotEnv.config();

describe('Test cases for all favorite actions', () => {
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
  describe('POST actions for favorite recipes', () => {
    describe('Test for making a recipe favorite', () => {
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

    describe('Test for getting user favorite recipes', () => {
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
            assert.isArray(res.body.recipes);
            assert.isNotEmpty(res.body.recipes);
            done();
          });
      });
    });
    describe('Test for getting all favorite recipes', () => {
      it('should return a status code of 200 and' +
        'get the list of all favorite recipes', (done) => {
        request(server)
          .get('/api/v1/favorites')
          .set({ 'x-access-token': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.isObject(res.body);
            assert.isNotEmpty(res.body);
            assert.isObject(res.body.paginationMeta);
            assert.isArray(res.body.recipes);
            done();
          });
      });
    });
    describe('Test for deleting a user favorite recipe', () => {
      it('should return a status code of 200 when' +
        'favorite is deleted', (done) => {
        request(server)
          .del('/api/v1/recipes/1/favorite')
          .set({ 'x-access-token': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Favorite successfully deleted');
            done();
          });
      });
    });
  });
});