import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: '/'
});

Router.map(function() {
  this.route('me', {path: '/me'});
  this.route('home', {path: '/'});
  this.route('projects', {path: '/projects'});
  this.route('player', {path: 'player/:id_demo'});
  this.resource('demos', {path: '/demos'}, function(){
    this.route('demostypes', {path: '/type/:type'});
  });
  this.route('demos');
  this.route('posts');
  //TODO: add PDF.js to display the resume
  //this.route('resume');
});

export default Router;
