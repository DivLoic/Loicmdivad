import Ember from 'ember';
//import Firebase from 'firebase';
//import config from '../config/environment';
import FirebaseAdapter from 'emberfire/adapters/firebase';

const { inject } = Ember;

export default FirebaseAdapter.extend({
  firebase: inject.service(),
  //firebase: new Firebase(config.firebase)
});
