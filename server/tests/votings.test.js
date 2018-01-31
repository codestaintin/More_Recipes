import request from 'supertest';
import dotEnv from 'dotenv';
import { assert } from 'chai';
import server from '../../server';
import authSeed from './seeder/authSeed';
import recipeSeed from './seeder/recipeSeed';
import VotingSeed from './seeder/favoriteSeed';
import votingSeed from './seeder/votingSeed';

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
 * Test cases for PUT voting actions
 */
  describe('POST /api/v1/recipe/:recipeId/upVote when voting for a recipe', () => {
    describe('Test for valid user before carrying out voting actions', () => {
      it('should return a status code of 403 if user is not authorized', (done) => {
        request(server)
          .put('/api/v1/recipe/:recipeId/upVote')
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
          .put('/api/v1/recipe/:recipeId/upVote')
          .set({ 'x-access-token': 'nonsense' })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    });
    describe('Test recipe upvote', () => {
      it('should return a status code of 404 when an recipe is not found', (done) => {
        request(server)
          .put('/api/v1/recipe/0/upVote')
          .set({ 'x-access-token': token })
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Recipe not found');
            done();
          });
      });
      it('should return a status code of 201 when upvote is successful', (done) => {
        request(server)
          .put('/api/v1/recipe/1/upVote')
          .set({ 'x-access-token': token })
          .send(votingSeed.setInput(1, 1))
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Upvote successful');
            done();
          });
      });
      it('should return a status code of 200 when recipe is upvoted twice', (done) => {
        request(server)
          .put('/api/v1/recipe/1/upVote')
          .set({ 'x-access-token': token })
          .send(votingSeed.setInput(1, 1))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Upvote removed');
            done();
          });
      });
      it('should return a status code of 404 when an recipe is not found', (done) => {
        request(server)
          .put('/api/v1/recipe/0/downVote')
          .set({ 'x-access-token': token })
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Recipe not found');
            done();
          });
      });
      it('should return a status code of 201 when downvote is successful', (done) => {
        request(server)
          .put('/api/v1/recipe/1/downVote')
          .set({ 'x-access-token': token })
          .send(votingSeed.setInput(0, 1))
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Downvote Successful');
            done();
          });
      });
      it('should return a status code of 201 when a recipe is downvoted twice', (done) => {
        request(server)
          .put('/api/v1/recipe/1/downVote')
          .set({ 'x-access-token': token })
          .send(votingSeed.setInput(0, 1))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Voting removed');
            done();
          });
      });
    });
  });
});