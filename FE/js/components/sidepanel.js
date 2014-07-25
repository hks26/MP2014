App.SidePanelComponent = Em.Component.extend({
 	isOpen: false,
 	actions: {
 		toggleSidepanel: function() {
 			this.toggleProperty('isOpen');
 		}
 	}
});