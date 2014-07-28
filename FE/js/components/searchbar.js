App.SearchBarComponent = Em.Component.extend({
	users: [{id: 1, fullname: "frank"}, {id: 2, fullname: "francesco"}],
	results: this.users,
	value: "",
	actions: {
		updateResults: function() {
			console.log(this.value);
			console.log(this.get('value'));
			console.log(this);
			console.log(this.getProperty('value'));
			var value = $("#navbar-search2").val()
			console.log(this.$());
			console.log("i am writing");
		}
	}

});