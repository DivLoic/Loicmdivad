import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    $("#flipcard").flip();
    $("nav p").css('padding-top', '190px');
  }
});
