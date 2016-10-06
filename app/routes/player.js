import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params){
    return this.store.find('demo', params.id_demo);
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }

});
