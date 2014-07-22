App.Router.map(function(){
  this.resource('user', { path: '/user/:user_id'});

});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
  	return this.store.find('user', params.user_id);
  }
});