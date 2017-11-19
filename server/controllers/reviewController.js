import Validator from 'validatorjs';
import db from '../models';

const Review = db.Review;
const Recipe = db.Recipe;

const reviewController = {

  /**
   * Create a Recipe Review
   *
   * @param { req } HTTP request
   * @param { res } HTTP response
   */
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, Review.createRules());
    if (validator.passes()) {
      Recipe.findById(req.params.recipeId)
        .then((foundRecipe) => {
          if (!foundRecipe) {
            return res.status(404).json({
              message: 'This Recipe Does not exit'
            });
          }
          return Review.create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.decoded.id
          })
            .then((recipe) => {
              return res.status(201).json({
                message: 'Review Posted ',
                recipe });
            })
            .catch(error => res.status(404).json(error));
        })
        .catch(error => res.status(400).json(error));
    }
  },

  /**
   * Delete a Recipe Review
   *
   * @param { req } HTTP request
   * @param { res } HTTP response
   * @returns { object } obj
   */
  destroy(req, res) {
    return Review
      .find({
        where: {
          recipeId: req.params.recipeId
        },
      })
      .then((foundReview) => {
        if (!foundReview) {
          return res.status(404).json({
            message: 'No reviews found'
          });
        }
        return foundReview
          .destroy()
          .then(() => res.status(200).json({
            message: 'Review deleted'
          }))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  },

  /**
   * List all Reviews
   *
   * @param { object } HTTP request
   * @param { object } HTTP response
   * @returns { object } obj
   */
  list(req, res) {
    return Review
      .all()
      .then(review => res.status(200).json(review))
      .catch(error => res.status(400).json(error));
  },
};

export default reviewController;
