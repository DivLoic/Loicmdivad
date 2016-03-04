import DS from 'ember-data';

export default DS.Model.extend({
  place: DS.attr('string'),
  img: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  alt: DS.attr('string'),
  text: DS.attr('string')
});
