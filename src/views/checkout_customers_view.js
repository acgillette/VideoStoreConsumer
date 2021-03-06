import Backbone from 'backbone';
import Customers from '../collections/customers.js';
import $ from 'jquery';
import _ from 'underscore';

var CheckoutCustomersView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);
    // console.log(this.template);
  },
  render: function() {
    var compiledTemplate = this.template({customers: this.model});
    this.$el.html(compiledTemplate);
    return this;
  },
  selectedCustomer: function () {
    var customer = this.$('#customer-selector').val();
    return customer;
  }
});

export default CheckoutCustomersView;
