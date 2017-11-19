import db from '../../models';

const Review = db.Review;

const reviewSeed = {
  emptyReviewTable(done) {
    Review.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(content, userId) {
    return {
      content,
      userId,
    };
  },
  addRecipe(done) {
    Review.create({
      content: 'A very tasty meal',
      userId: 1,
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default reviewSeed;
