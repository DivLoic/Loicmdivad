import DS from 'ember-data';

export default DS.Model.extend({

  firstName:   DS.attr('string'),
  lastName:    DS.attr('string'),
  alias:       DS.attr('string'),
  link:        DS.attr(),

  //projects:    DS.hasMany('project')

});
