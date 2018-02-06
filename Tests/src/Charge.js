var Charge = (function() {

    function connectCharge(type) {
        return type !== "Standard";
    }

    var Charge = {};

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
        this.stripeFee = new Fee.Stripe(this.final, this.pricing, this.account.country);

        
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
    }

    Charge.Direct = function(options) {
        this.type = "Direct";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.amountAfterStripeFee = this.final.minus(this.stripeFee.final);
        this.platform.applicationFee = new Fee.Application(this.platform, this, this.type);
        this.connectedPortion = this.amountAfterStripeFee.minus(this.platform.applicationFee.settlement);
    };

    Charge.Destination = function(options) {
        this.type = "Destination";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.platform.applicationFee = new Fee.Application(this.platform, this, this.type);
        this.connectedPortion = this.final.minus(this.platform.applicationFee.settlement);
    };

    Charge.SCT = function(options) {
        this.type = "SCT";
        initializeCharge.call(this, options);
        settleFunds.call(this);
        /* What happens left is up to user. Transfer() methods for some reason? */
    };

    Charge.Standard = function(options) {
        this.type = "Standard";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.finalAfterStripeFee = this.final.minus(this.stripeFee.final);
    };

    return Charge;
})();