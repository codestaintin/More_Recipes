import request from 'supertest';
import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import { assert } from 'chai';
import server from '../../server';
import authSeed from './seeder/authSeed';
import recipeSeed from './seeder/recipeSeed';

dotEnv.config();

describe('Test cases for all recipes actions', () => {
  before(authSeed.emptyUserTable);
  before(recipeSeed.emptyRecipeTable);
  before(authSeed.addUser);
  before(authSeed.addUser1);
  before(recipeSeed.addRecipe);

  let token;
  let token2;
  let id;
  let id2;
  before((done) => {
    request(server)
      .post('/api/v1/users/signin')
      .send(authSeed.setLogin('mohzak@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        id = jwtDecode(token).id;
        done();
      });
  });

  before((done) => {
    request(server)
      .post('/api/v1/users/signin')
      .send(authSeed.setLogin('jayjay@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token2 = res.body.token;
        id2 = jwtDecode(token2).id;
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
      it('should return a status of 201 when token is valid but inputs are valid', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': token })
          .send({ recipeDetails: recipeSeed.setInput('Okro soup',
            'This is how to cook okro', 'Okro and water', 'okro_img') })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Recipe creation successful ');
            done();
          });
      });
      it('should return a status of 409 if recipe already exists for that user', (done) => {
        request(server)
          .post('/api/v1/recipes')
          .set({ 'x-access-token': token })
          .send({ recipeDetails: recipeSeed.setInput('Okro soup',
            'This is how to cook okro', 'Okro and water', 'okro_img') })
          .expect(409)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'You have this recipe already, please edit it');
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
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.isArray(res.body.recipes);
          assert.isNotEmpty(res.body);
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
    it('should return a status of 404 when recipe is not found', (done) => {
      request(server)
        .get('/api/v1/recipes/0')
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
        .patch('/api/v1/recipes/:recipeId')
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Token not provided');
          done();
        });
    });
    it('should return a status of 401 if user tries to update with an invalid token', (done) => {
      request(server)
        .patch('/api/v1/recipes/:recipeId')
        .set({ 'x-access-token': 'nonsensetoken' })
        .send(recipeSeed.setUpdateRecipe('Okro soup and yam', 'Okro plant', 'This is how cook okro', 'okro_img', 4))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
    it('should return a status of 404 if recipe is not found', (done) => {
      request(server)
        .patch('/api/v1/recipes/0')
        .set({ 'x-access-token': token })
        .send(recipeSeed.setUpdateRecipe('Chicken', 'Okro plant', 'This is how chicken', 'okro_img', 4))
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Recipe Not Found');
          done();
        });
    });
    it('should return a status of 201 if update is successful', (done) => {
      request(server)
        .patch('/api/v1/recipes/1')
        .set({ 'x-access-token': token })
        .send(recipeSeed.setUpdateRecipe('Chicken', 'Okro plant', 'This is how chicken', 'okro_img', 4))
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Recipe successfully updated');
          done();
        });
    });
    it('should return a status of 404 if it is not the creator of the recipe', (done) => {
      request(server)
        .patch('/api/v1/recipes/1')
        .set({ 'x-access-token': token2 })
        .send(recipeSeed.setUpdateRecipe('Chicken', 'Okro plant', 'This is how chicken', 'okro_img', 4))
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'You have no access to edit this recipe');
          done();
        });
    });
  });
  /**
   * Test cases for GET user recipes actions
   */
  describe('GET /users/:userId/my-recipes', () => {
    it('should return a status of 403 if the user is not authorized', (done) => {
      request(server)
        .get('/api/v1/users/1/my-recipes')
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Token not provided');
          done();
        });
    });
    it('should return a status of 401 if the user is not authorized', (done) => {
      request(server)
        .get('/api/v1/users/1/my-recipes')
        .set({ 'x-access-token': 'nonsense' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
    it('should return a status of 200 when getting user recipes is successful', (done) => {
      request(server)
        .get(`/api/v1/users/${id}/my-recipes`)
        .set({ 'x-access-token': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'This are your recipes');
          assert.isObject(res.body);
          assert.isArray(res.body.recipes);
          done();
        });
    });
  });
  /**
   * Test cases for GET user recipes actions
   */
  describe('GET /users/:userId/my-recipes', () => {
    it('should return a status of 403 if the user is not authorized', (done) => {
      request(server)
        .get('/api/v1/users/1/my-recipes')
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Token not provided');
          done();
        });
    });
    it('should return a status of 403 if the user is not authorized', (done) => {
      request(server)
        .get('/api/v1/users/1/my-recipes')
        .set({ 'x-access-token': 'nonsense' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
    it('should return a status of 403 if the user is not authorized', (done) => {
      request(server)
        .get(`/api/v1/users/${id}/my-recipes`)
        .set({ 'x-access-token': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'This are your recipes');
          assert.isObject(res.body);
          assert.isArray(res.body.recipes);
          done();
        });
    });
  });
  /**
   * Test cases for DELETE recipes actions
   */
  describe('DEL /api/v1/recipes/:recipeId when deleting a recipe', () => {
    it('should return a status of 403 if the user is not authorized', (done) => {
      request(server)
        .del('/api/v1/recipes/1')
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Token not provided');
          done();
        });
    });
    it('should return a status code of 401 when an invalid authorization token is entered', (done) => {
      request(server)
        .post('/api/v1/recipes')
        .set({ 'x-access-token': 'nonsense' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
    it('should return a status of 404 if recipe does not exists', (done) => {
      request(server)
        .del('/api/v1/recipes/0')
        .set({ 'x-access-token': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Recipe not found');
          done();
        });
    });
    it('should return a status of 200 if recipe does not exists', (done) => {
      request(server)
        .del('/api/v1/recipes/1')
        .set({ 'x-access-token': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Recipe successfully deleted');
          done();
        });
    });
  });
  /**
   * Test cases for Search recipes actions
   */
  describe('Recipe search', () => {
    it('should return a status of 200 on recipe found', (done) => {
      request(server)
        .get('/api/v1/search?search=yam')
        .set({ 'x-access-token': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.isObject(res.body);
          assert.isArray(res.body.recipeFound);
          done();
        });
    });
  });
});
