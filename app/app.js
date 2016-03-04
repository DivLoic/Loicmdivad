import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
//import DS from 'ember-data';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver/*: Resolver,
  ApplicationAdapter: DS.RESTAdapter.extend({
    host: 'http://localhost:3000',
    namespace: '',
    shouldReloadAll: function(){return true;}
  })*/
});

loadInitializers(App, config.modulePrefix);

export default App;
