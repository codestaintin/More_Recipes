import request from 'supertest';
import dotEnv from 'dotenv';
import { assert } from 'chai';
import server from '../../server';
import seed from './seeder/auth_seed';
import recipeSeed from './seeder/recipe_seed';

dotEnv.config();

describe('Test cases for all recipes actions', () => {
  before(seed.emptyUserTable);
  before(recipeSeed.emptyRecipeTable);
  before(seed.addUser);
//   before(recipeSeed.addRecipe);

  let token;
  before((done) => {
    request(server)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('mohzak@gmail.com', 'password'))
      .expect(201)
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
          .send(recipeSeed.setInput('Okro soup', 'Okro plant', 'How to cook okro', 'okro_img', 4))
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
          .send(recipeSeed.setInput('Food', 'Okro plant', 'This is how to cook okro soup', 'okro_img', 4))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    });
    describe('Test for invalid inputs', () => {
      it('should return a status of 401 when token is valid but inputs is invalid', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': token })
          .send(recipeSeed.setInput('', 'Okro plant', 'This is how to cook okro soup', 'okro_img', 4))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message.name[0], 'The name field is required.');
            done();
          });
      });
      it('should return a status of 401 when token is valid but inputs is invalid', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': token })
          .send(recipeSeed.setInput('Okro soup', '', 'This is how to cook okro soup', 'okro_img', 4))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message.ingredient[0], 'The ingredient field is required.');
            done();
          });
      });
      it('should return a status of 401 when token is valid but inputs is invalid', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': token })
          .send(recipeSeed.setInput('Okro soup', 'Okro plant', '', 'okro_img', 4))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message.description[0], 'The description field is required.');
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
        .send(recipeSeed.setInput('Okro soup', 'Okro plant', 'This is how cook okro', 'okro_img', 4))
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
    it('should return a status of 404 when user views a recipe with a valid token', (done) => {
      request(server)
        .get('/api/v1/recipes/1')
        .set({ 'x-access-token': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Recipe not found');
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
    // it('should return a status of 201 if user tries to update with an invalid token', (done) => {
    //   request(server)
    //     .put('/api/v1/recipes/1')
    //     .set({ 'x-access-token': token })
    //     .send(recipeSeed.setUpdateRecipe('Okro and Yam', 'Okro plant', 'This is how cook okro', 'okro_img', 4))
    //     .expect(201)
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       assert.equal(res.body.message, 'Recipe successfully updated');
    //       done();
    //     });
    // });
  });
});
