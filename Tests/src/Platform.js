var Platform = (function () {

    function(country, currency, feePercent) {
        this.country = country;
        this.currency = currency;
        this.feePercent = new Decimal(feePercent);
        this.feeMultiplier = this.feePercent.times(0.01);
        this.pricing = countries[country].pricing;

        this.hasDomesticPricingFor = function(customer) {
            return ((that.country === customer.country) || (that.pricing.european && customer.european));
        };
    };  
})();






