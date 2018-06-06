var Charge = (function() {

    function connectCharge(type) {
        return type !== "Standard";
    }

    var Charge = function() {

    };

    Charge.prototype.connect = function(type) {
        return this.type !== "Standard";
    };


    function getPricing() {
        /* SCTs use pricing of connected account like normal */
        /* However, domestic vs.international logical choice depends on Platform */
        if (this.type === "SCT") {
            return this.platform.hasDomesticPricingFor(this.customer) ?
                this.account.pricingModel.domestic :
                this.account.pricingModel.international;
        } else {
            return this.account.pricingFor(this.customer);
        }
    }

    function settleFunds() {
        var that = this;

        if (currenciesAreDifferent()) {
            this.settlement = this.presentment.convertTo(this.account.currency);
            this.fxFee = this.settlement.times(this.account.pricingModel.fxMultiplier);
        } else {
            this.settlement = this.presentment;
            this.fxFee = new Money(0, this.settlement.currency);
        }
        this.final = this.settlement.minus(this.fxFee);
        this.final.fxPercent = this.account.pricingModel.fxPercent;
        this.stripeFee = new Fee.Stripe(this.final, this.pricing, this.account.country);

        this.meetsMinimumAmount = Money.meetsMinimumAmount(this.settlement.currency,
            this.settlement.amount);

        function currenciesAreDifferent() {
            return (that.presentment.currency !== that.account.currency);
        }
    }

    function initializeCharge(options) {
        this.options = options;
        this.customer = new Customer(options.customer.country, options.customer.currency);
        this.account = new Account(options.account.country, options.account.currency);

        if (connectCharge(this.type)) {
            this.platform = new Platform(options.platform.country, options.platform.currency, options.platform.percentFee);
        }
        this.pricing = getPricing.call(this, options.type);
        this.presentment = new Money(options.amount, options.currency);
        this.settlement = this.presentment.convertTo(options.account.currency);

        this.connect = function() {
            return this.type !== "Standard";
        };
    }

    Charge.Direct = function(options) {
        this.type = "Direct";
        this.processedOn = "Connected Account";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.amountAfterStripeFee = this.final.minus(this.stripeFee.final);
        this.applicationFee = new Fee.Application(this.platform, this, this.type);
        this.connectedPortion = this.amountAfterStripeFee.minus(this.applicationFee.settlement);
    };

    Charge.Destination = function(options) {
        this.type = "Destination";
        this.processedOn = "Platform";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.applicationFee = new Fee.Application(this.platform, this, this.type);

        var final = this.final.afterFxFee || this.final;
        //console.log("final: " + final);
        this.connectedPortion = final.minus(this.applicationFee.settlement);
        //console.log("this.connectedPortion" + this.connectedPortion);
    };



    Charge.SCT = function(options) {
        this.type = "SCT";
        this.processedOn = "Platform";
        initializeCharge.call(this, options);
        settleFunds.call(this);
        this.finalAfterStripeFee = this.final.minus(this.stripeFee.final);
        /* What happens left is up to user. Transfer() methods for some reason? */
    };

    Charge.Standard = function(options) {
        this.type = "Standard";
        this.processedOn = "Account";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.finalAfterStripeFee = this.final.minus(this.stripeFee.final);
    };

    return Charge;
})();