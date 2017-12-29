var PricingModel = function(pricing, country) {


        this.currency = pricing.currency;
        this.fxPercent = new Decimal(pricing.fxPercent);
        this.fxMultiplier = this.fxPercent.times(0.01);

        this.domestic = new Pricing(pricing.domestic);
        this.international = new Pricing(pricing.international);
};




var Pricing = (function () {

    constructor.Model = function (pricing, country) {
        this.currency = pricing.currency;
        this.fxPercent = new Decimal(pricing.fxPercent);
        this.fxMultiplier = this.fxPercent.times(0.01);

        this.domestic = new transactionalFee(pricing.domestic);
        this.international = new transactionalFee(pricing.international);
    };

    function constructor (pricing){
        var fees = pricing.split(" + ");
        this.percent = new Decimal(fees[0]);
        this.percentMultiplier = fee.percent.times(0.01);
        this.fixed = new Money(fees[1], that.curreny);
        return fee;
    }
    return constructor;
})();








