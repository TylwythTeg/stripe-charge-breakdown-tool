var Log = (function() {

    /* pick a function based on charge.type? */
    /* So we create a charge instance and go Log(charge.type) and we're done */
    function Log(charge) {

    }

    Log.Account = function (account) {
        this.type = "Account";

        this.events = [
            "Account:",
            " - Country: " + account.country,
            " - Currency: " + account.currency,
        ];

    };

    Log.Platform = function (platform) {
        this.type = "Platform";

        this.events = [
            "Platform:",
            " - Country: " + platform.country,
            " - Currency: " + platform.currency,
        ];

    }; 

    Log.Customer = function (customer) {
        this.type = "Customer";

        this.events = [
            "Customer:",
            " - Country: " + customer.country,
        ];

    }; 

    Log.Pricing = function (charge) {
        this.type = "Pricing";

        this.events = [
            "Pricing: " + charge.pricing.percent + "% + " + charge.pricing.fixed,
        ];

    };

    Log.StripeFee = function (charge) {
        this.type = "StripeFee";

        this.events = [
            "Stripe Fee: " + charge.stripeFee.settlement + " (" +
            charge.pricing.percent + "% + " + charge.stripeFee.settledFixedFee + " of " + 
            charge.final + ")",
        ];

    };

    Log.Settlement = function (presentment, settlement, final) {
        this.type = "Settlement";
        this.events = [presentment + " charge created"];
        if (!presentment.equals(settlement)) {
            this.events.push(presentment + " converted to " + settlement);
            this.events.push("After " + final.fxPercent + "% conversion fee, " +
                final + " is left");
        }
    };

    Log.flow = {};

    Log.flow.Standard = function(charge) {
        this.type = "Flow";
        this.events = [
            "Stripe Fee of " + charge.stripeFee.settlement +
                " is taken, leaving " + charge.finalAfterStripeFee,
        ];
    };

    Log.flow.Direct = function(charge) {
        this.type = "Flow";
        this.events = [
            "Stripe Fee of " + charge.stripeFee.final + 
                " is taken, leaving " + charge.amountAfterStripeFee,
            "Application Fee of " + charge.applicationFee.settlement + 
                " is sent to Platform, leaving " + charge.connectedPortion + " for Connected Account",
        ];

        if (charge.applicationFee.conversionNecessary) {
            this.events.push(charge.applicationFee.settlement + " is converted to " +
                charge.applicationFee.final);
            this.events.push("After " + charge.platform.pricingModel.fxPercent + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee + " is left for Platform");
        }
    };

    Log.flow.Destination = function(charge) {
        this.type = "Flow";

        this.events = [
            charge.connectedPortion + " is sent to Connected Account, leaving " +
                charge.applicationFee.settlement + " for Platform",  
                "Stripe Fee of " + charge.stripeFee.settlement +
                " is taken from Platform, leaving " + 
                (charge.applicationFee.final.afterFxFee || charge.applicationFee.final) +
                " for Platform",         
        ];

        if (charge.applicationFee.conversionNecessary) {
            this.events.push(charge.applicationFee.settlement.afterStripeFee + " is converted to " +
                charge.applicationFee.final);
            this.events.push("After " + charge.platform.pricingModel.fxPercent + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee + " is left for Platform");
        }

    };

    Log.flow.SCT = function (charge) {
        return Log.flow.Standard(charge);
    };

    Log.charge = {};

    Log.Charge = function (charge) {
        this.events = [];

        this.pricing = new Log.Pricing(charge);
        this.events.push(this.pricing.events);

        this.stripeFee = new Log.StripeFee(charge);
        this.events.push(this.stripeFee.events);

        if (charge.connect()) {
            this.platform = new Log.Platform(charge.platform);
            this.events.push(this.platform.events.join("\n"));
        }
        this.account = new Log.Account(charge.account);
        this.events.push(this.account.events.join("\n"));

        this.customer = new Log.Customer(charge.customer);
        this.events.push(this.customer.events.join("\n"));

        this.settlement = new Log.Settlement(charge.presentment, charge.settlement, charge.final);
        this.events.push(this.settlement.events);
        this.paymentFlow = new Log.flow[charge.type](charge);
        this.events.push(this.paymentFlow.events);



     
        console.log(this.events.join("\n"));
    };

    return Log;
})();