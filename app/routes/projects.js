import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('project', '1');
  }/*,
  setupController: function(controller, model) {
    controller.set('model', model);
  }*/
});
