/** Import all dependencies */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import Validator from 'validatorjs';
import db from '../models';

dotenv.config();

const User = db.User;
const secret = process.env.SECRET_TOKEN;

const userController = {

  /**
   * Create User and validate request 
   * @param {any} req 
   * @param {any} res 
   * @returns {object} object
   */
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, User.createRules());
    if (validator.passes()) {
      if (body.confirmPassword !== body.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      User.findOne({
        where: { email: body.email }
      })
        .then((user) => {
          if (user) {
            return res.status(404).json({ message: 'A user with those credentials already exist' });
          }
          User.create(body)
            .then((savedUser) => {
              const data = _.pick(savedUser, ['id', 'username']);
              const myToken = jwt.sign(data, secret, { expiresIn: 86400 });
              return res.status(201).json({ message: 'Registration Successful', user: data, token: myToken });
            })
            .catch(error => res.status(500).json(error));
        })
        .catch((error) => {
          return res.status(500).json('An error occured while trying to create a user ', error.message);
        });
    } else {
      return res.status(401).json({ 
        message: 'A validation error occured',
        error: validator.errors.all() });
    }
  },

  /**
   * Log in user and validate user request 
   * @param {reques} req 
   * @param {resoponse} res 
   * @returns {object} object
   */
  login(req, res) {
    const body = req.body;
    const validator = new Validator(body, User.loginRules());
    if (validator.fails()) {
      return res.status(400).json({ message: validator.errors.all() });
    }
    User.findOne({
      where: {
        email: body.email
      }
    })
      .then((user) => {
        if (!user) {
          return Promise.reject({ message: 'User not found, please register' });
        }
        if (!user.comparePassword(user, body.password)) {
          return res.status(400).json({ message: 'Invalid email/password' });
        }
        const data = _.pick(user, ['id', 'username']);
        const myToken = jwt.sign(data, secret);
        return res.status(201).send({ message: 'Log in successful', token: myToken, });
      })
      .catch(error => res.send(error));
  }
};

export default userController;
