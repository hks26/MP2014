App.ApplicationController = Ember.Controller.extend({
 	isOpen: false,
 	actions: {
 		toggleSidepanel: function() {
 			this.toggleProperty('isOpen');
 		}
 	}
});