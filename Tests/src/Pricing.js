
var Pricing = (function () {

    /* Object with domestic and international pricing objects*/
    /* In addition to fx percent and multiplier () */
    /* Will be used specifically for the countries */
    Pricing.Model = (function () {
        function PricingModel(country, pricing) {
            this.currency = pricing.currency;
            this.fxPercent = new Decimal(pricing.fxPercent);
            this.fxMultiplier = this.fxPercent.times(0.01);

            this.domestic = new Pricing(pricing.domestic, pricing.currency);
            this.international = new Pricing(pricing.international, pricing.currency);
        }
        PricingModel.prototype.toString = function() {
            return JSON.stringify(this);
        };
        return PricingModel;
    })();

    function Pricing (pricing, currency){
        var fees = pricing.split(" + ");
        this.currency = currency;
        this.percent = new Decimal(fees[0]);
        this.percentMultiplier = this.percent.times(0.01);
        this.fixed = new Money(fees[1], this.currency);
    }

    Pricing.prototype.toString = function() {
        return this.percent.toString() + " + "
            + this.fixed.toString(); 
    };

    return Pricing;
})();





