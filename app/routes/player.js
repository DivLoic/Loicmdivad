import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('demo', params.id_demo);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }/*,
  actions:{
    didTransition: function() {
      var file = this.controller.get('model').get('source');

      // TODO: Chage this for smth more emberistic
      Ember.$.get('/asets/' + file, {}, function(data){
        var node = Ember.$( data );
        Ember.$('h4.htitle').after(node);
      });
      return true;
    }
  }*/
});
