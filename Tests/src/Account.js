var Account = (function() {


    function Account (country, currency) {
        this.country = country;
        this.currency = currency;
        this.pricingModel = Pricing.Model.from(country);  
    }
    

    Account.prototype.hasDomesticPricingFor = function(customer) {
        return ((this.country === customer.country) || (this.pricingModel.european && customer.european));
    };

    Account.prototype.pricingFor = function(customer) {
        if (this.hasDomesticPricingFor(customer)) {
            return this.pricingModel.domestic;
        } else {
            return this.pricingModel.international;
        }
    };

    return Account;
})();



