import db from '../../models';

const Voting = db.Voting;

const votingSeed = {
  emptyReviewTable(done) {
    Voting.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(voting, recipeId, userId) {
    return {
      voting,
      recipeId,
      userId
    };
  },
  upvote(done) {
    Voting.create({
      voting: 1
    })
      .then(() => done())
      .catch(err => done(err));
  },
  downvote(done) {
    Voting.create({
      voting: 0
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default votingSeed;