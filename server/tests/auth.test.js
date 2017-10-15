import request from 'supertest';
import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import { assert } from 'chai';
import server from '../../server';
import seed from './seeder/auth_seed';

dotEnv.config();

describe('POST Test suites for User sign up', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);

  describe('Test case for firstName inputs', () => {
    it('should return status code 401 and a message when firstName input is empty', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.firstName[0], 'The firstName field is required.');
          done();
        });
    });
  });

  describe('Test case for firstName inputs', () => {
    it('should return status code 401 and a message when firstName input is less than 6 characters', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Ade', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.firstName[0], 'The firstName must be at least 6 characters.');
          done();
        });
    });
  });

  describe('Test case for firstName inputs', () => {
    it('should return status code 401 and a message when firstName does not consist of alphabetic characters', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput(1233, 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.firstName[0], 'The firstName field must contain only alphabetic characters.');
          done();
        });
    });
  });

  describe('Test case for lastName inputs', () => {
    it('should return status code 401 and a message when lastname input is empty', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Ndubuiisi', '', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.lastName[0], 'The lastName field is required.');
          done();
        });
    });
  });

  describe('Test case for lastname inputs', () => {
    it('should return status code 401 and a message when firstName input is less than 6 characters', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Ademola', 'Xu', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.lastName[0], 'The lastName must be at least 4 characters.');
          done();
        });
    });
  });

  describe('Test case for lastname inputs', () => {
    it('should return status code 401 and a message when lastname does not consist of alphabetic characters', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Ayoola', 1234, 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.lastName[0], 'The lastName field must contain only alphabetic characters.');
          done();
        });
    });
  });

  describe('Test case for username inputs', () => {
    it('should return status code 401 and a message when username input is empty', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Akpobure', 'Ademola', '', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.username[0], 'The username field is required.');
          done();
        });
    });
  });

  describe('Test case for username inputs', () => {
    it('should return status code 401 and a message when username input is less than 6 characters', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Ademola', 'Xuinjin', 'ade', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.username[0], 'The username must be at least 6 characters.');
          done();
        });
    });
  });

  describe('Test case for email inputs', () => {
    it('should return status code 401 and a message when email input is empty', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Issac', 'Ademola', 'ademola23', '', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.email[0], 'The email field is required.');
          done();
        });
    });
  });

  describe('Test case for email inputs', () => {
    it('should return status code 401 and a message when email is not valid', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Issac', 'Ademola', 'ademola23', 'nondse', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.email[0], 'The email format is invalid.');
          done();
        });
    });
  });

  describe('Test case for password inputs', () => {
    it('should return status code 401 and a message when password input is empty', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', '', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.password[0], 'The password field is required.');
          done();
        });
    });
  });

  describe('Test case for password inputs', () => {
    it('should return status code 401 and a message when confirm password input is empty', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', ''))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid credentials');
          done();
        });
    });
  });

  describe('Test case for password inputs', () => {
    it('should return status code 401 and a message when firstName input is empty', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'anomaly'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid credentials');
          done();
        });
    });
  });

  describe('Test case for password inputs', () => {
    it('should return status code 401 and a message when the password characters is less than 6', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', 'pass', 'pass'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.password, 'The password must be at least 6 characters.');
          done();
        });
    });
  });
  describe('Test case for correct inputs', () => {
    it('should create a new user and return status 200 and a token', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          const decodedToken = jwtDecode(res.body.token);
          assert.equal(decodedToken.id, 2);
          assert.equal(decodedToken.username, 'ademola23');
          done();
        });
    });
  });
  describe('Test case for correct inputs', () => {
    it('should create a new user and return status 200 and a token', (done) => {
      request(server)
        .post('/api/v1/users/signup')
        .send(seed.setInput('', '', '', '', '', ''))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          //   console.log(res.body);
          assert.deepEqual(res.body, {
            message:
            {
              firstName: ['The firstName field is required.'],
              lastName: ['The lastName field is required.'],
              username: ['The username field is required.'],
              email: ['The email field is required.'],
              password: ['The password field is required.'] }
          });
          done();
        });
    });
  });
});

describe('POST Test suites for User sign in', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);

  it('should return status code 400 and a message if the email format is invalid', (done) => {
    request(server)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('Benjamin', 'password'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.message.email, 'The email format is invalid.');
        done();
      });
  });

  it('should return status code 404 and a message if the email does not exist', (done) => {
    request(server)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('Benjamin@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.code, 404);
        assert.equal(res.body.message, 'User not found, please register');
        done();
      });
  });

  it('should return 200 and give the user token if credentials are correct.', (done) => {
    request(server)
      .post('/api/v1/users/signin')
      .send(seed.setLogin('mohzak@gmail.com', 'password'))
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        assert.exists(res.body);
        const decodedToken = jwtDecode(res.body.token);
        assert.equal(decodedToken.username, 'mohzaky');
        done();
      });
  });
});
