import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  name: DS.attr('string'),
  description: DS.attr('string'),
  date: DS.attr('date'),
  link: DS.attr('string'),
  readme: DS.attr('string'),
  icon: DS.attr('string'),
  team: DS.attr('string'),
  technologies: DS.attr(),

  coworkers:  DS.hasMany('coworker', {async: true}),

  stack: Ember.computed('technologies', function(){
    return `${this.get('technologies').join(", ")}`;
  })
/*
  teamwork: Ember.computed('', function(){
    var allCoworkers = `${this.get('coworkers').map(function(c){return c.alias;})}`;
    return allCoworkers.join(", ");
  })
*/
});
