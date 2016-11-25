import Ember from 'ember';

export default Ember.Component.extend({

  linesToType: [
    "I study Software Engineering^500",
    "work on data driven topics^1000",
    "and develop in Python and Scala",
  ],

  didInsertElement: function(){
    this._super(...arguments);
    Ember.$("#terminal").typed({
      strings: [this.linesToType.join('\n')],
      showCursor: false,
      typeSpeed: 0
    });
  }

});
