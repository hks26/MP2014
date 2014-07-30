App.SearchBarComponent = Em.Component.extend({
	users: [{id: 1, fullname: "frank"}, {id: 2, fullname: "francesco"}],
	results: this.users,
	text_val: "A",
	actions: {
		updateResults: function() {
			console.log(this.text_val);
			var value = $("#navbar-search2").val()
			console.log(this.$());
			console.log("i am writing");
		}
	}

});