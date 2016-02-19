import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: '/'
});

Router.map(function() {
  this.route('home', {path: '/home'});
  this.route('projects', {path: '/projects'});
  this.route('me', {path: '/me'});
  this.route('player', {path: 'player/:id_demo'});
  this.resource('demos', {path: '/demos'}, function(){
    this.route('demostypes', {path: '/type/:type'});
  });
  this.route('demos');
  this.route('posts');
});

export default Router;
