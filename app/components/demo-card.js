import Ember from 'ember';

export default Ember.Component.extend({

  demo: null,

  didInsertElement: function(){
    this._super(...arguments);
    var sourceName = Ember.$("#source").attr('data-source');
    Ember.$.get('/sources/' + sourceName, {}, function(data){
      var node = Ember.$( data );
      Ember.$('#source').append(node);
      Ember.$(document).ready(function() {
        Ember.$('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      });
    });
  }

});
