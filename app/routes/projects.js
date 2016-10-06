import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.findAll('project')
      .then(records => records.sortBy('date'))
      .then(records => records.reverse());
  }
});
