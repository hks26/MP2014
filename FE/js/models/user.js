App.User = DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  phone_number: DS.attr('string'),
  primary_email: DS.attr('string'),
  secondary_email: DS.attr('string'),
  job_title: DS.attr('string'),
  organization: DS.attr('string'),
  address: DS.attr('string'),
  fullname: function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }.property('first_name', 'last_name'),
image: DS.attr('string')

});

App.User.FIXTURES = [
  {
  	id: 1,
  	first_name: "Frank",
  	last_name: "Xie",
    phone_number: "609234654",
  	primary_email: "frankyx@gmail.com",
    secondary_email: "frankxie@spcapitaliq.com",
    job_title: "Caffeine Baron",
    organization: "The Franky Boys",
    address: "Brooklyn"

  },
  {
  	id: 2,
  	first_name: "Francesco",
  	last_name: "Agosti",
    phone_number: "2434324233",
  	primary_email: "francesco@gmail.com",
    secondary_email: "francesco@spcapitaliq.com",
    job_title: "Architecture Intern",
    organization: "CAPIQ",
    address: "Corso Venezia 42",
image: "http://i1.squidoocdn.com/resize_square/squidoo_images/70/lm6356d9693075a49fcec2810e1b47b947_screenactors_headshot.jpg"

  }

]


<img {{bind-attr src=image}}>