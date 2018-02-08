import expect from 'expect';
import actionTypes from '../../../src/actions/actionTypes';
import recipeReducer from '../../../src/reducers/recipe/recipeReducer';
import { recipeResponseType } from '../../../src/utils/helpers';

describe('recipeReducer', () => {
  const initialState = {
    responseType: null,
    message: '',
    recipeId: null,
    isCreating: false,
    getUserRecipesSuccess: [],
    getUserRecipesFailure: '',
    recipe: { },
    recipes: [],
    reviews: [],
    favorites: []
  };
  it('should get response type of ADD_RECIPE_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.ADD_RECIPE_SUCCESS,
      responseType: recipeResponseType.ADD_RECIPE_SUCCESS
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.ADD_RECIPE_SUCCESS);
  });
  it('should get response type of ADD_RECIPE_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.ADD_RECIPE_FAILURE,
      responseType: recipeResponseType.ADD_RECIPE_FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of GET_USER_RECIPES_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.GET_USER_RECIPES_SUCCESS,
      responseType: recipeResponseType.GET_USER_RECIPES_SUCCESS,
      data: {
        userRecipes: ['Recipe one', 'Recipe two'],
        pagination: 1
      }
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.GET_USER_RECIPES_SUCCESS);
  });
  it('should get response type of GET_USER_FAVORITES_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.GET_USER_FAVORITES_SUCCESS,
      responseType: recipeResponseType.GET_USER_FAVORITE_SUCCESS,
      data: {
        userFavorites: ['Recipe one', 'Recipe two'],
        pagination: 1
      }
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.GET_USER_FAVORITE_SUCCESS);
  });
  it('should get response type of GET_USER_RECIPES_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.GET_USER_RECIPES_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of VIEW_RECIPE_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.VIEW_RECIPE_SUCCESS,
      responseType: recipeResponseType.VIEW_RECIPE_SUCCESS
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.VIEW_RECIPE_SUCCESS);
  });
  it('should get response type of VIEW_RECIPE_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.VIEW_RECIPE_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of EDIT_RECIPE_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.EDIT_RECIPE_SUCCESS,
      responseType: recipeResponseType.EDIT_RECIPE_SUCCESS
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.EDIT_RECIPE_SUCCESS);
  });
  it('should get response type of EDIT_RECIPE_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.EDIT_RECIPE_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of CLEAR_RECIPE_MESSAGE', () => {
    const recipeAction = {
      type: actionTypes.CLEAR_RECIPE_MESSAGE,
      responseType: recipeResponseType.CLEAR_RECIPE_MESSAGE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.CLEAR_RECIPE_MESSAGE);
  });
  it('should get response type of DELETE_RECIPE_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.DELETE_RECIPE_SUCCESS,
      responseType: recipeResponseType.DELETE_RECIPE_SUCCESS
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.DELETE_RECIPE_SUCCESS);
  });
  it('should get response type of DELETE_RECIPE_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.DELETE_RECIPE_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of POST_REVIEW_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.POST_REVIEW_SUCCESS,
      responseType: recipeResponseType.POST_REVIEW_SUCCESS
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.POST_REVIEW_SUCCESS);
  });
  it('should get response type of POST_REVIEW_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.POST_REVIEW_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of GET_REVIEW_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.GET_REVIEW_SUCCESS,
      responseType: recipeResponseType.GET_REVIEW_SUCCESS
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.GET_REVIEW_SUCCESS);
  });
  it('should get response type of GET_REVIEW_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.GET_REVIEW_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of GET_ALL_RECIPES_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.GET_ALL_RECIPES_SUCCESS,
      responseType: recipeResponseType.GET_ALL_RECIPES_SUCCESS,
      data: {
        allRecipes: ['Recipe one', 'Recipe two'],
        pagination: 1
      }
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.GET_ALL_RECIPES_SUCCESS);
  });
  it('should get response type of GET_ALL_RECIPES_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.GET_ALL_RECIPES_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of CREATE_USER_FAVORITE_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.CREATE_USER_FAVORITE_SUCCESS,
      responseType: recipeResponseType.CREATE_USER_FAVOURITE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.CREATE_USER_FAVOURITE);
  });
  it('should get response type of CREATE_USER_FAVORITE_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.CREATE_USER_FAVORITE_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of CREATE_UPVOTE_SUCCESSFUL', () => {
    const recipeAction = {
      type: actionTypes.CREATE_UPVOTE_SUCCESSFUL,
      responseType: recipeResponseType.CREATE_UPVOTE_SUCCESSFUL,
      data: {
        recipe: {
          upvotes: 1,
          downvotes: 0
        }
      }
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.CREATE_UPVOTE_SUCCESSFUL);
  });
  it('should get response type of CREATE_UPVOTE_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.CREATE_UPVOTE_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of CREATE_DOWNVOTE_SUCCESSFUL', () => {
    const recipeAction = {
      type: actionTypes.CREATE_DOWNVOTE_SUCCESSFUL,
      responseType: recipeResponseType.CREATE_DOWNVOTE_SUCCESSFUL,
      data: {
        recipe: {
          upvotes: 0,
          downvotes: 1
        }
      }
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.CREATE_DOWNVOTE_SUCCESSFUL);
  });
  it('should get response type of CREATE_DOWNVOTE_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.CREATE_DOWNVOTE_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of GET_ALL_FAVORITES_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.GET_ALL_FAVORITES_SUCCESS,
      responseType: recipeResponseType.GET_ALL_FAVORITES_SUCCESS,
      favorites: {
        favorites: ['Recipe one'],
        pagination: 1
      }
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.GET_ALL_FAVORITES_SUCCESS);
  });
  it('should get response type of GET_ALL_FAVORITES_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.GET_ALL_FAVORITES_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should get response type of SEARCH_RECIPE_SUCCESS', () => {
    const recipeAction = {
      type: actionTypes.SEARCH_RECIPE_SUCCESS,
      responseType: recipeResponseType.SEARCH_RECIPE_SUCCESS,
      recipes: {
        results: ['Recipe one'],
        pagination: 1
      }
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.SEARCH_RECIPE_SUCCESS);
  });
  it('should get response type of SEARCH_RECIPE_FAILURE', () => {
    const recipeAction = {
      type: actionTypes.SEARCH_RECIPE_FAILURE,
      responseType: recipeResponseType.FAILURE
    };
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState.responseType).toEqual(recipeResponseType.FAILURE);
  });
  it('should return the initial state when no actions is passed', () => {
    const recipeAction = {};
    const newState = recipeReducer(initialState, recipeAction);
    expect(newState).toEqual(initialState);
  });
});
