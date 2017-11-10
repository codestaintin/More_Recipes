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
        .then((recipe) => {
          if (!recipe) {
            return res.status(404).json({ message: 'This Recipe Does not exit' });
          }
          return Review.create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.decoded.id
          })
            .then((newrecipe) => {
              return res.status(201).json({ message: 'Review Posted ', data: newrecipe });
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
      .then((review) => {
        if (!review) {
          res.status(404).json({ message: 'No reviews found' });
        }
        return review
          .destroy()
          .then(() => res.status(200).json({ message: 'Review deleted' }))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  },

  /**
   * List all Reviews
   *
   * @param { req } HTTP request
   * @param { res } HTTP response
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
