import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  title: DS.attr('string'),
  description: DS.attr('string'),
  type: DS.attr('string'),
  date: DS.attr('date'),
  date_str: Ember.computed('date', function() {
    let d = this.get('date');
    return d.toISOString().substr(0,10);
  }),
  source: DS.attr('string'),
  tools: DS.attr(),
  seeAlso: DS.attr(),
  credits: DS.attr()

});
