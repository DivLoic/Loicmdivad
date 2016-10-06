import Ember from 'ember';

export default Ember.Controller.extend({
  title: "Demos",
  type: "type",

  legends: [
    {'t': 'graph', 'img': 'graphdemo', 'color': '6eafd4', 'msg': 'graph demos'},
    {'t': 'code', 'img': 'codedemo', 'color': '3683bb', 'msg': 'code demos'},
    {'t': 'ml', 'img': 'mldemo', 'color': 'e45621', 'msg': 'machine learning demos'},
    {'t': 'db', 'img': 'dbdemo', 'color': 'fb8d46', 'msg': 'database demos'}
  ],

  records: Ember.computed.oneWay('model'),

  actions: {
    typeFilter: function (demoType) {
      if (demoType === '_all') {
        Ember.run(function () {
          window.history.replaceState({}, 'demos/type/', 'demos');
        });
        this.set('records', this.get('model'));
        this.set('type', 'type');
        return false;
      }

      Ember.run(function () {
        window.history.replaceState({}, 'demos', 'demos/type/' + demoType);
      });
      this.set('type', demoType);
      this.set('records', this.get('model').filter(function (demo) {
        return demo.get('type') === demoType;
      }));
    }
  }
});
