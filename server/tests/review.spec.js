import request from 'supertest';
import dotEnv from 'dotenv';
import { assert } from 'chai';
import server from '../../server';
import authSeed from './seeder/authSeed';
import recipeSeed from './seeder/recipeSeed';
import reviewSeed from './seeder/reviewSeed';

dotEnv.config();


describe('Test cases for all review actions', () => {
  before(authSeed.emptyUserTable);
  before(recipeSeed.emptyRecipeTable);
  before(reviewSeed.emptyReviewTable);
  before(authSeed.addUser);
  before(recipeSeed.addRecipe);
  before(reviewSeed.addReview);

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
 * Test cases for POST review actions
 */
  describe('POST /api/v1/recipes/:recipeId/reviews when creating a review', () => {
    describe('Test for valid user before carrying out review actions', () => {
      it('should return a status code of 403 if user is not authorized', (done) => {
        request(server)
          .post('/api/v1/recipes/1/reviews')
          .send(reviewSeed.setInput('Very tasty recipe', 1, 1))
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
          .post('/api/v1/recipes/1/reviews')
          .set({ 'x-access-token': 'nonsense' })
          .send(reviewSeed.setInput('Very tasty recipe', 1, 1))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    });
    describe('Test for invalid inputs', () => {
      it('should return a status of 400 when token is valid' +
       'but inputs are invalid', (done) => {
        request(server)
          .post('/api/v1/recipes/1/reviews')
          .set({ 'x-access-token': token })
          .send(reviewSeed.setInput(''))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.content[0], 'The content field is required.');
            done();
          });
      });
      it('should return a status of 400 when token is valid' + 
      'but inputs are invalid', (done) => {
        request(server)
          .post('/api/v1/recipes/1/reviews')
          .set({ 'x-access-token': token })
          .send(reviewSeed.setInput('Awe'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.content[0], 'The content must be at least 4 characters.');
            done();
          });
      });
    });
    describe('Test for valid inputs after authorization', () => {
      it('should return a status code of 201 when inputs are valid', (done) => {
        request(server)
          .post('/api/v1/recipes/1/reviews')
          .set({ 'x-access-token': token })
          .send(reviewSeed.setInput('Very tasty recipe', 1, 1))
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Review Posted');
            assert.isObject(res.body.recipe);
            assert.isNotEmpty(res.body.recipe);
            done();
          });
      });
    });
    describe('Test for valid inputs after authorization', () => {
      it('should return a status code of 404' +
      'if recipe does not exist', (done) => {
        request(server)
          .post('/api/v1/recipes/9/reviews')
          .set({ 'x-access-token': token })
          .send(reviewSeed.setInput('Very tasty recipe', 1))
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'This recipe Does not exit');
            assert.isObject(res.body);
            assert.isNotEmpty(res.body);
            done();
          });
      });
    });
  });
  /**
   * Test cases for GET review actions
   */
  describe('GET /api/v1/recipes/:recipeId/reviews' + 
  'when getting a recipe reviews', () => {
    it('should return a status of 403 if the user is not authorized', (done) => {
      request(server)
        .get('/api/v1/recipes/1/reviews')
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Token not provided');
          done();
        });
    });
    it('should return a status of 200 when user views all reviews' + 
    'of a recipe with a valid token', (done) => {
      request(server)
        .get('/api/v1/recipes/1/reviews')
        .set({ 'x-access-token': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.isArray(res.body);
          assert.isNotEmpty(res.body);
          done();
        });
    });
  });
});