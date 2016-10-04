/**
 * Created by LoicMDIVAD on 19/02/2016.
 */
import Ember from 'ember';

export default Ember.Component.extend({

  logoURL: "img/lmd.svg",
  pictureURL: "img/portrait.jpg",

  actions: {

  },

  didInsertElement: function(){
    this._super(...arguments);
    Ember.$("#flipcard").flip();
    Ember.$("nav p").css('padding-top', '190px');
  }

});
