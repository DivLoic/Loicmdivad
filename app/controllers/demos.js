import Ember from 'ember';

export default Ember.Controller.extend({
  title: "Demos",
  type: "type",
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
