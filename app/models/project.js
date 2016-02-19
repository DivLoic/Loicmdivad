import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  description: DS.attr('string'),
  date: DS.attr('string'),
  link: DS.attr('string'),
  readme: DS.attr('string'),
  icon: DS.attr('string'),
  team: DS.attr('string'),
  technologies: DS.attr(),

  coworkers:  DS.hasMany('coworker', {async: true})

});
