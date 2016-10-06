import Ember from 'ember';

export default Ember.Component.extend({

  demo: null,

  didInsertElement: function(){
    this._super(...arguments);
    var sourceName = Ember.$("#source").attr('data-source');

    // query the demo's source code
    Ember.$.get('/sources/' + sourceName, {}, function(data){

      // append it to the page
      var node = Ember.$( data );
      Ember.$('#source').append(node);

      // add color to the code
      Ember.$(document).ready(function() {
        Ember.$('pre code').each(function(i, block) {
          // hljs from highlight.js
          // @see https://highlightjs.org/usage/
          hljs.highlightBlock(block);
        });

      });

    });
  }

});
