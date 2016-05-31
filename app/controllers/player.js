import Ember from 'ember';

export default Ember.Controller.extend({
  title: "Demo",
  asTools: function() {
    var tools = this.get('model').get('tools');
    return tools ==  null ? false : true;
  }.property('model'),
  asCredits: function(){
    var credits = this.get('model').get('credits');
    return credits == null ? false : true;
  }.property('model'),
  asSeeAlso: function(){
    var seeAlso = this.get('model').get('seeAlso');
    return seeAlso == null ? false : true;
  }.property('model')
});
