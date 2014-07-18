App.User = DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  email: DS.attr('string')
});

App.User.FIXTURES = [
  {
  	id: 1,
  	first_name: "Frank",
  	last_name: "Xie",
  	email: "frankyx@gmail.com"

  },
  {
  	id: 2,
  	first_name: "Francesco",
  	last_name: "Agosti",
  	email: "francesco@gmail.com"
  }

]