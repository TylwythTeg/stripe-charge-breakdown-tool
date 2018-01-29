var Charge = (function() {

    function connectCharge(type) {
        return type !== "Standard";
    }

    function getPricing() {
        /* SCTs use pricing of connected account like normal */
        /* However, domestic vs.international logical choice depends on Platform */
        if (this.type === "SCT") {
            if (this.platform.hasDomesticPricingFor(this.customer)) {
                return this.account.pricingModel.domestic;
            } else {
                return this.account.pricingModel.international;
            }
        } else {
            console.log(this);
            return this.account.pricingFor(this.customer);
        }
    }

    function settleFunds() {
        if (this.presentment.currency !== this.account.currency) {
            this.settlement = this.presentment.convertTo(this.account.currency);
            this.fxFee = this.settlement.times(this.account.pricingModel.fxMultiplier);
        } else {
            this.settlement = this.presentment;
            this.fxFee = new Money(0, this.settlement.currency);
        }
        this.final = this.settlement.minus(this.fxFee);
        this.stripeFee = new Fee.Stripe(this.final, this.pricing, this.account.country);
    }

    function initializeCharge(options) {
        console.log("sdfsdfsdfsdf");
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

    this.Direct = function(options) {
        this.type = "Direct";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.amountAfterStripeFee = this.final.minus(this.stripeFee.final);
        this.platform.applicationFee = new Fee.Application(this.platform, this, this.type);
        this.connectedPortion = this.amountAfterStripeFee.minus(this.platform.applicationFee.settlement);
    };

    this.Destination = function(options) {
        this.type = "Destination";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.platform.applicationFee = new Fee.Application(this.platform, this, this.type);
        this.connectedPortion = this.final.minus(this.platform.applicationFee.settlement);
    };

    this.SCT = function(options) {
        this.type = "SCT";
        initializeCharge.call(this, options);
        settleFunds.call(this);
        /* What happens left is up to user. Transfer() methods for some reason? */
    };

    this.Standard = function(options) {
        this.type = "Standard";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.finalAfterStripeFee = this.final.minus(this.stripeFee.final);
    };

    return this;
})();