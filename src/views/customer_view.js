import Backbone from 'backbone';
import Customer from '../models/customer.js';
import Rental from '../models/rental.js';
import Rentals from '../collections/rentals.js';
import RentalsView from './rentals_view.js';
import $ from 'jquery';
import _ from 'underscore';

var CustomerView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    var compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    this.delegateEvents();
    return this;
  },
  events: {
    "click h4.customer": "showRentals",
    "click h5.button.check-in": "checkinMovie",
    "click a#hide-customer-rentals" : "hideRentals"
  },
  showRentals: function(event) {
    var name = this.model.get('name').split(' ')[0];
    var info = this.model.get('current_rentals');
    var rentals = info[0];
    var movies = info[1];
    $('#' + name).empty();
    this.$("a#hide-customer-rentals").removeClass('hide');
    rentals.forEach(function(rental)  {
      var rental_movie_id = rental.movie_id;
      movies.forEach(function(movie) {
        if (movie.id == rental_movie_id) {
          rental.title = movie.title;
        }
      });
    });
    if (rentals.length === 0) {
      $('#' + name).append("No Checked Out Movies.");
    } else {
      var customerRentals = new Rentals(rentals);
      var customerRentalsView = new RentalsView({
        name: name,
        model: customerRentals,
        template: _.template($("#rental-template").html())
      });
      customerRentalsView.render();
    }
  },
  hideRentals: function (){
    var name = this.model.get('name').split(' ')[0];
    this.$('#' + name).empty();
    this.$("a#hide-customer-rentals").addClass('hide');
  }
});

export default CustomerView;
