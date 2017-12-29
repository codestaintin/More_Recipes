/** Import all dependencies */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import Validator from 'validatorjs';
import db from '../models';

dotenv.config();

const User = db.User;
const secret = process.env.SECRET_TOKEN;

const userController = {

  /**
   * Create Auth and validate request
   * @param { req } req
   * @param { res } res
   *
   * @returns { object } object
   */
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, User.createRules());
    if (validator.passes()) {
      if (body.confirmPassword !== body.password) {
        return res.status(422).json({ message: 'Invalid credentials' });
      }
      User.findOne({
        where: { email: body.email }
      })
        .then((foundUser) => {
          if (foundUser) {
            return res.status(409).json({
              message: 'A user with those credentials already exist'
            });
          }
          User.create(body)
            .then((savedUser) => {
              const user = lodash.pick(savedUser, ['id', 'username']);
              const token = jwt.sign(user, secret, { expiresIn: 86400 });
              return res.status(201).json({
                message: 'Registration Successful',
                user,
                token
              });
            })
            .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json({
          message: 'An error occurred while trying to create a user',
          error: error.message }));
    } else {
      return res.status(422).json({ message: validator.errors.all() });
    }
  },

  /**
   * Log in user and validate user request
   * @param { req } req
   * @param { res } res
   *
   * @returns { object } object
   */
  login(req, res) {
    const body = req.body;
    const validator = new Validator(body, User.loginRules());
    if (validator.fails()) {
      return res.status(400).json({
        message: validator.errors.all() });
    }
    User.findOne({
      where: {
        email: body.email
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          return Promise.reject({
            message: 'User not found, please register'
          });
        }
        if (!foundUser.comparePassword(foundUser, body.password)) {
          return res.status(400).json({
            message: 'Invalid email/password'
          });
        }
        const user = lodash.pick(foundUser, ['id', 'username']);
        const token = jwt.sign(user, secret);
        return res.status(200).json({
          message: 'Log in successful',
          token,
          user
        });
      })
      .catch(error => res.status(500).json(error));
  }
};

export default userController;
