import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from '../__mocks__/mockData';
import localStorage from '../__mocks__/localStorageMock';
import actionType from '../../src/actions/actionTypes';
import {
  getUserRecipes,
  getRecipe,
  deleteRecipe,
  postReview,
  getReview,
  getAllRecipes,
  createFavourite,
  getUserFavorites,
  upvoteRecipe,
  downvoteRecipe,
  getAllFavorites,
  searchRecipe,
  addRecipeAction,
  clearToast,
  editRecipe,
} from '../../src/actions/recipe/recipeActions';

const {
  GET_USER_RECIPES_SUCCESS,
  GET_USER_RECIPES_FAILURE,
  VIEW_RECIPE_SUCCESS,
  VIEW_RECIPE_FAILURE,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAILURE,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAILURE,
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_FAILURE,
  CREATE_USER_FAVORITE_SUCCESS,
  CREATE_USER_FAVORITE_FAILURE,
  GET_USER_FAVORITES_SUCCESS,
  GET_USER_FAVORITES_FAILURE,
  CREATE_UPVOTE_SUCCESSFUL,
  CREATE_UPVOTE_FAILURE,
  CREATE_DOWNVOTE_SUCCESSFUL,
  CREATE_DOWNVOTE_FAILURE,
  GET_ALL_FAVORITES_SUCCESS,
  GET_ALL_FAVORITES_FAILURE,
  SEARCH_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE
} = actionType;

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// noinspection JSAnnotator
window.localStorage = localStorage;

describe('Recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_USER_RECIPES_SUCCESS', (done) => {
    const { userRecipeResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userRecipeResponse
      });
    });
    const expectedActions = [{
      type: GET_USER_RECIPES_SUCCESS,
      data: {
        userRecipes: userRecipeResponse.recipes,
        pagination: userRecipeResponse.paginationMeta
      }
    }];
    const store = mockStore({});
    store.dispatch(getUserRecipes(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_USER_RECIPES_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: GET_USER_RECIPES_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(getUserRecipes(100, 100))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch VIEW_RECIPE_SUCCESS', (done) => {
    const { viewRecipeResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: viewRecipeResponse
      });
    });
    const expectedActions = [{
      type: VIEW_RECIPE_SUCCESS,
      data: viewRecipeResponse.recipe
    }];
    const store = mockStore({});
    store.dispatch(getRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch VIEW_RECIPE_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedAction = [{
      type: VIEW_RECIPE_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(getRecipe(100))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });
  it('should dispatch DELETE_RECIPE_SUCCESS', (done) => {
    const { deleteRecipeResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: deleteRecipeResponse
      });
    });
    const expectedActions = [{
      type: DELETE_RECIPE_SUCCESS,
      message: deleteRecipeResponse.message
    }];
    const store = mockStore({});
    store.dispatch(deleteRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch DELETE_RECIPE_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: DELETE_RECIPE_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(deleteRecipe(100))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch POST_REVIEW_SUCCESS', (done) => {
    const { postReviewResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postReviewResponse
      });
    });
    const expectedActions = [{
      type: POST_REVIEW_SUCCESS,
      message: postReviewResponse.message
    }];
    const store = mockStore({});
    store.dispatch(postReview(1, 'sweeeeet!!!'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch POST_REVIEW_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: POST_REVIEW_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(postReview())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_REVIEW_SUCCESS', (done) => {
    const { getReviewResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getReviewResponse
      });
    });
    const expectedActions = [{
      type: GET_REVIEW_SUCCESS,
      review: getReviewResponse
    }];
    const store = mockStore({});
    store.dispatch(getReview(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_REVIEW_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: GET_REVIEW_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(getReview(100))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_ALL_RECIPES_SUCCESS', (done) => {
    const { allRecipeResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: allRecipeResponse
      });
    });
    const expectedActions = [{
      type: GET_ALL_RECIPES_SUCCESS,
      data: {
        allRecipes: allRecipeResponse.recipes,
        pagination: allRecipeResponse.paginationMeta
      }
    }];
    const store = mockStore({});
    store.dispatch(getAllRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_ALL_RECIPES_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: GET_ALL_RECIPES_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(getAllRecipes(1000))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch CREATE_USER_FAVORITE_SUCCESS', (done) => {
    const { favoriteResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: favoriteResponse
      });
    });
    const expectedActions = [{
      type: CREATE_USER_FAVORITE_SUCCESS,
      message: favoriteResponse.message
    }];
    const store = mockStore({});
    store.dispatch(createFavourite(4))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch CREATE_USER_FAVORITE_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: CREATE_USER_FAVORITE_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(createFavourite(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_USER_FAVORITES_SUCCESS', (done) => {
    const { userFavorites } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userFavorites
      });
    });
    const expectedActions = [{
      type: GET_USER_FAVORITES_SUCCESS,
      data: {
        userFavorites: userFavorites.recipes,
        pagination: userFavorites.paginationMeta
      }
    }];
    const store = mockStore({});
    store.dispatch(getUserFavorites(4, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_USER_FAVORITES_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: GET_USER_FAVORITES_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(getUserFavorites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch CREATE_UPVOTE_SUCCESSFUL', (done) => {
    const { upvoteResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: upvoteResponse
      });
    });
    const expectedActions = [{
      type: CREATE_UPVOTE_SUCCESSFUL,
      data: upvoteResponse
    }];
    const store = mockStore({});
    store.dispatch(upvoteRecipe(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch CREATE_UPVOTE_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: CREATE_UPVOTE_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(upvoteRecipe())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch CREATE_DOWNVOTE_SUCCESSFUL', (done) => {
    const { downvoteResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: downvoteResponse
      });
    });
    const expectedActions = [{
      type: CREATE_DOWNVOTE_SUCCESSFUL,
      data: downvoteResponse
    }];
    const store = mockStore({});
    store.dispatch(downvoteRecipe(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch CREATE_DOWNVOTE_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: CREATE_DOWNVOTE_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(downvoteRecipe())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_ALL_FAVORITES_SUCCESS', (done) => {
    const { allFavoritesResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: allFavoritesResponse
      });
    });
    const expectedActions = [{
      type: GET_ALL_FAVORITES_SUCCESS,
      favorites: {
        favorites: allFavoritesResponse.favorites,
        pagination: allFavoritesResponse.paginationMeta
      }
    }];
    const store = mockStore({});
    store.dispatch(getAllFavorites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch GET_ALL_FAVORITES_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: GET_ALL_FAVORITES_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(getAllFavorites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch SEARCH_RECIPE_SUCCESS', (done) => {
    const { searchResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: searchResponse
      });
    });
    const expectedActions = [{
      type: SEARCH_RECIPE_SUCCESS,
      recipes: {
        results: searchResponse.recipeFound,
        pagination: searchResponse.paginationMeta
      }
    }];
    const store = mockStore({});
    store.dispatch(searchRecipe('chi'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch SEARCH_RECIPE_FAILURE', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'An error occurred during this operation'
      });
    });
    const expectedActions = [{
      type: SEARCH_RECIPE_FAILURE,
      error: 'An error occurred during this operation'
    }];
    const store = mockStore({});
    store.dispatch(searchRecipe(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch ', (done) => {
    const response = {
      message: 'Recipe added successfully',
      recipe: { id: 23 },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response,
      });
    });
    const expectedActions = [
      {
        type: 'ADD_RECIPE_SUCCESS',
        message: 'Recipe added successfully',
        recipeId: 23
      },
      { type: 'IS_RECIPE_CREATING', bool: false }
    ];
    const store = mockStore({});
    const recipeDetails = {};
    const cloudImageUrl = '';
    store.dispatch(addRecipeAction(recipeDetails, cloudImageUrl)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('should dispatch ', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {},
      });
    });
    const expectedActions = [
      {
        type: 'ADD_RECIPE_FAILURE',
        error: 'An error occurred during this operation, please try again'
      },
      { type: 'IS_RECIPE_CREATING', bool: false },
    ];
    const store = mockStore({});
    const recipeDetails = {};
    const cloudImageUrl = '';
    store.dispatch(addRecipeAction(recipeDetails, cloudImageUrl)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('should dispatch ', (done) => {
    const expectedActions = [
      { type: 'CLEAR_RECIPE_MESSAGE' },
    ];
    const store = mockStore({});
    store.dispatch(clearToast());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
  it('should dispatch ', (done) => {
    const { updateRecipeResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: { ...updateRecipeResponse },
      });
    });
    const expectedActions = [
      {
        type: 'EDIT_RECIPE_SUCCESS',
        message: 'Recipe successfully updated'
      },
      { type: 'IS_RECIPE_CREATING', bool: false }
    ];
    const store = mockStore({});
    const recipeId = 34;
    const recipeDetails = {};
    const cloudImageUrl = '';
    store.dispatch(editRecipe(recipeId, recipeDetails, cloudImageUrl)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch ', (done) => {
    const { updateRecipeResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {},
      });
    });
    const expectedActions = [{ type: 'EDIT_RECIPE_FAILURE', error: {} }];
    const store = mockStore({});
    const recipeId = 34;
    const recipeDetails = {};
    const cloudImageUrl = '';
    store.dispatch(editRecipe(recipeId, recipeDetails, cloudImageUrl)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
