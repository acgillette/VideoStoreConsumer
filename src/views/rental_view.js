import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Movie from '../models/rental.js';
import Customers from '../collections/customers.js';
import RentMovieView from './rent_movie_view.js';
import RentCustomersView from './rent_customers_view.js';

var RentalView = Backbone.View.extend({
  initialize: function(params) {
    this.movie = params.movie;
    this.template = params.template;
  },
  render: function() {
    // console.log("inside render in Rentalview");
    var compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    
    var rentMovieView = new RentMovieView({
      model: this.movie,
      template: _.template($("#rent-movie-template").html())
    });

    var customerDropdownList = new Customers();
    customerDropdownList.fetch();
    // pass in a hash with key success then that goes to a funciton.
    // can make the view rerender from that function.
    console.log(customerDropdownList);
    var rentCustomersView = new RentCustomersView({
      model: customerDropdownList,
      template: _.template($("#rent-customer-template").html())
    });

    this.$('#movie-customer-area').append(rentMovieView.render().el);
    this.$('#movie-customer-area').append(rentCustomersView.render().el);
    return this;
  }
});

export default RentalView;
