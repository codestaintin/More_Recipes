import config from './config';

export default {
  before: (browser) => {
    browser.waitForElementVisible('body', 5000);
  },
  'SIGNUP: Invalid sign up when user tries to submit an empty form': (browser) => {
    browser
      .url(`${config.baseUrl}`)
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipe')
      .assert.containsText('#signup', 'Sign Up')
      .click('#signup')
      .waitForElementVisible('#signUpModal', 2000)
      .waitForElementVisible('#submitSignUp', 2000)
      .pause(2000)
      .click('#submitSignUp')
      .pause(2000);
  },
  'SIGNUP: Valid inputs when user enters valid inputs': (browser) => {
    browser
      .setValue('input[name=firstName]', 'Ademola')
      .setValue('input[name=lastName]', 'Johnson')
      .setValue('input[name=username]', 'jaytee')
      .setValue('input#email', 'jay@gmail.com')
      .setValue('input#password', 'anotherone')
      .setValue('input[name=confirmPassword]', 'anotherone')
      .click('#submitSignUp')
      .pause(2000)
      .click('#navbarDropdown')
      .pause(2000)
      .click('.fa.fa-sign-out')
      .pause(2000);
  },
  'SIGNIN: Invalid sign up when user tries to submit an empty form': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipe')
      .assert.containsText('#signin', 'Sign In')
      .click('#signin')
      .waitForElementVisible('#signInModal', 2000)
      .click('#submitSignIn')
      .pause(2000);
  },
  'SIGNIN: Valid inputs when user enters valid inputs': (browser) => {
    browser
      .setValue('input[name=email]', 'jay@gmail.com')
      .setValue('input[name=password]', 'anotherone')
      .click('#submitSignIn')
      .pause(2000);
  },
  'PROFILE: User can see his/her profile': (browser) => {
    browser
      .click('#navbarDropdown')
      .pause(2000)
      .click('.fa.fa-user-circle')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/profile`);
  },
  'MY Recipes: User can see his/her recipe(s) if any exists': (browser) => {
    browser
      .click('#navbarDropdown')
      .pause(2000)
      .click('.fa.fa-list')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/user-recipes`);
  },
  'MY FAVORITES: User can see his/her favorite(s) if any exists': (browser) => {
    browser
      .click('#navbarDropdown')
      .pause(2000)
      .click('.fa.fa-star')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/my-favorite`);
  },
  'ADD RECIPE: Invalid inputs when user tries to create recipe': (browser) => {
    browser
      .click('#navbarDropdown')
      .pause(2000)
      .click('.fa.fa-plus')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/addRecipe`)
      .assert.containsText('.btn.btn-outline-success', 'Add Recipe')
      .pause(2000)
      .click('.btn.btn-outline-success')
      .pause(2000);
  },
  'ADD RECIPE: Valid inputs when user tries to create a recipe': (browser) => {
    browser
      .assert.urlEquals(`${config.baseUrl}/addRecipe`)
      .setValue('input[name=name]', 'Yam and Beef sauce')
      .setValue('textarea[name=description]', 'This is how to cook yam and sauce')
      .setValue('textarea[name=ingredient]', 'Yam, water, pepper, seasoning')
      .click('.btn.btn-outline-success')
      .pause(2000)
      .click('#navbarDropdown')
      .pause(2000)
      .click('.fa.fa-plus')
      .pause(2000)
      .setValue('input[name=name]', 'Meat Pie')
      .setValue('textarea[name=description]', 'This is how to meat Pie')
      .setValue('textarea[name=ingredient]', 'Meat, water, pepper, flour, seasoning')
      .click('.btn.btn-outline-success')
      .pause(2000)
      .click('#navbarDropdown')
      .pause(2000)
      .click('.fa.fa-plus')
      .pause(2000)
      .setValue('input[name=name]', 'Chicken Pie')
      .setValue('textarea[name=description]', 'This is how to chicken Pie')
      .setValue('textarea[name=ingredient]', 'Meat, water, pepper, flour, seasoning')
      .click('.btn.btn-outline-success')
      .pause(2000);
  },
  'VIEW RECIPE:': (browser) => {
    browser
      .click('#home')
      .assert.urlEquals(`${config.baseUrl}/`)
      .click('#navbarDropdown')
      .pause(2000)
      .click('.fa.fa-list')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/user-recipes`)
      .click('.recipe-name')
      .assert.urlEquals(`${config.baseUrl}/recipes/1/`)
      .pause(3000);
  },
  'EDIT RECIPE:': (browser) => {
    browser
      .click('.fa.fa-edit')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/recipes/1/edit`)
      .pause(2000)
      .clearValue('input[name=name]')
      .setValue('input[name=name]', 'Fish Pie')
      .pause(2000)
      .click('.btn.btn-outline-success')
      .pause(2000);
  },
  'POST RECIPE REVIEW': (browser) => {
    browser
      .click('#home')
      .pause(1000)
      .assert.urlEquals(`${config.baseUrl}/`)
      .click('.recipe-name')
      .assert.urlEquals(`${config.baseUrl}/recipes/1/`)
      .pause(2000)
      .click('#submitReview')
      .pause(2000)
      .setValue('textarea[name=content]', 'Awesome!!!')
      .pause(1000)
      .click('#submitReview')
      .pause(2000);
  },
  'UPVOTE/DOWNVOTE A RECIPE': (browser) => {
    browser
      .assert.urlEquals(`${config.baseUrl}/recipes/1/`)
      .click('.fa.fa-thumbs-o-up')
      .pause(1000)
      .click('.fa.fa-thumbs-o-down')
      .pause(1000);
  },
  'FAVORITE A RECIPE': (browser) => {
    browser
      .assert.urlEquals(`${config.baseUrl}/recipes/1/`)
      .click('.fa.fa-star-o')
      .pause(2000);
  },
  'DELETE RECIPE': (browser) => {
    browser
      .waitForElementVisible('.fa.fa-trash', 2000)
      .click('.fa.fa-trash')
      .pause(2000)
      .waitForElementVisible('.swal2-cancel.swal2-styled', 2000)
      .click('.swal2-cancel.swal2-styled')
      .pause(3000)
      .click('.fa.fa-trash')
      .waitForElementVisible('.swal2-confirm.swal2-styled', 2000)
      .click('.swal2-confirm.swal2-styled')
      .pause(2000);
  },
  after: browser => browser.end()
};