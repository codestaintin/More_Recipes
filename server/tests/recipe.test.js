// import request from 'supertest';
// import dotEnv from 'dotenv';
// import { assert } from 'chai';
// import server from '../../server';
// import seed from './seeder/auth_seed';
// import recipeSeed from './seeder/recipe_seed';

// dotEnv.config();

// describe('Test cases for recipes', () => {
//   let userId;
//   before(seed.emptyUserTable);
//   before(recipeSeed.emptyRecipeTable);
//   before(seed.addUser);
//   before(recipeSeed.addRecipe);

//   let token;
//   before((done) => {
//     request(server)
//       .post('/api/v1/users/signin')
//       .send(seed.setLogin('mohzak@gmail.com', 'password'))
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         token = res.body.token;
//         done();
//       });
//   });

//   describe('POST /api/v1/recipes when creating a recipe', () => {
//     describe('Test for valid user before carrying out recipe actions', () => {
//       it('should return a status code of 400 if user is not authorized', (done) => {
//         request(server)
//           .post('api/v1/recipes')
//         .send(recipeSeed.setInput('Okro soup', 'Okro plant', 'How to cook okro', 'okro_img', 4))
//           .expect(404)
//           .end((err, res) => {
//             if (err) return done(err);
//             console.log(res.body);
//             done();
//           });
//       });
//     });
//   });
// });
