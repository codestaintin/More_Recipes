import request from 'supertest';
import dotEnv from 'dotenv';
import { assert } from 'chai';
import server from '../../server';
import authSeed from './seeder/authSeed';
import recipeSeed from './seeder/recipeSeed';

dotEnv.config();

describe('Test cases for all recipes actions', () => {
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
 * Test cases for POST recipe actions
 */
  describe('POST /api/v1/recipes when creating a recipe', () => {
    describe('Test for valid user before carrying out recipe actions', () => {
      it('should return a status code of 403 if user is not authorized', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .send({ recipeDetails: recipeSeed.setInput('Food', 'Okro plant', 'This is how to cook okro soup', 'okro_img', 4) })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Token not provided');
            done();
          });
      });
    });
    describe('Test for invalid authorization token', () => {
      it('should return a status code of 401 when an invalid authorization token is entered', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': 'nonsense' })
          .send({ recipeDetails: recipeSeed.setInput('Food', 'Okro plant', 'This is how to cook okro soup', 'okro_img', 4) })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    });
    describe('Test for invalid inputs', () => {
      it('should return a status of 500 when token is valid but inputs is invalid', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': token })
          .send({ recipeDetails: recipeSeed.setInput('', 'Okro plant', 'This is how to cook okro soup', 'okro_img', 4) })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.name[0], 'The name field is required.');
            done();
          });
      });
      it('should return a status of 500 when token is valid but inputs is invalid', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': token })
          .send({ recipeDetails: recipeSeed.setInput('Okro soup', '', 'This is how to cook okro soup', 'okro_img', 4) })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.ingredient[0], 'The ingredient field is required.');
            done();
          });
      });
      it('should return a status of 401 when token is valid but inputs is invalid', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': token })
          .send({ recipeDetails: recipeSeed.setInput('Okro soup', 'Okro plant', '', 'okro_img', 4) })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.description[0], 'The description field is required.');
            done();
          });
      });
    });
  });

  /**
   * Test cases for GET recipe actions
   */
  describe('GET /api/v1/recipes when getting recipes', () => {
    it('should return a status of 403 if the user is not authorized', (done) => {
      request(server)
        .get('/api/v1/recipes')
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Token not provided');
          done();
        });
    });
    it('should return a status of 200 when user views all recipe with a valid token', (done) => {
      request(server)
        .get('/api/v1/recipes')
        .set({ 'x-access-token': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.isObject(res.body);
          assert.isNotEmpty(res.body);
          done();
        });
    });
    it('should return a status of 200 when user views a recipe with a valid token', (done) => {
      request(server)
        .get('/api/v1/recipes/1')
        .set({ 'x-access-token': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.isObject(res.body);
          assert.isNotEmpty(res.body);
          done();
        });
    });
  });
  /**
   * Test cases for PUT recipes actions
   */
  describe('PUT /api/v1/recipes when updating a recipe', () => {
    it('should return a status of 403 if the user is not authorized', (done) => {
      request(server)
        .put('/api/v1/recipes/:recipeId')
        .send(recipeSeed.setUpdateRecipe('Okro soup', 'Okro plant', 'This is how cook okro', 'okro_img', 4))
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Token not provided');
          done();
        });
    });
    it('should return a status of 401 if user tries to update with an invalid token', (done) => {
      request(server)
        .put('/api/v1/recipes/:recipeId')
        .set({ 'x-access-token': 'nonsensetoken' })
        .send(recipeSeed.setUpdateRecipe('Okro soup and yam', 'Okro plant', 'This is how cook okro', 'okro_img', 4))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
  });
});
