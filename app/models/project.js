import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  name: DS.attr('string'),
  date: DS.attr('date'),
  link: DS.attr('string'),
  icon: DS.attr('string'),
  team: DS.attr('string'),
  technologies: DS.attr(),
  readme: DS.attr('string'),
  description: DS.attr('string'),

  coworkers:  DS.hasMany('coworker', {async: true}),

  stack: Ember.computed('technologies', function(){
    return `${this.get('technologies').join(", ")}`;
  })

});
