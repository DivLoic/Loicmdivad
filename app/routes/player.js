import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return [];
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
