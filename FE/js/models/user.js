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
    address: "Brooklyn",
image: "http://www.thestudioagency.co.uk/wpcf7_uploads/2013/04/Callum-Male-Model-The-Studio-Agency-Headshot.jpg"

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
image: "http://austinama.org/wp-content/110125a-4309web-150x150.jpg"

  }

]

