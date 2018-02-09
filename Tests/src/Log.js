var Log = (function() {

    function Log() {

    }

    Log.Account = function (account) {
        this.type = "Account";

        this.events = [
            "Account:",
            "- Country: " + account.country,
            "- Currency: " + account.currency,
        ];

    };

    Log.Platform = function (platform) {
        this.type = "Platform";

        this.events = [
            "Platform:",
            "- Country: " + platform.country,
            "- Currency: " + platform.currency,
        ];

    }; 

    Log.Customer = function (customer) {
        this.type = "Customer";

        this.events = [
            "Customer:",
            "- Country: " + customer.country,
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

        /* This is to account for the weirdnness in how gst vs vat affects stripe fee */
        var transactionFee = Fee.VAT.applicable(charge.account.country) ?
            charge.stripeFee.settlement :
            charge.stripeFee.final

        this.events = [
            "Stripe Fee: " + transactionFee + " (" +
            charge.pricing.percent + "% + " + charge.stripeFee.settledFixedFee + " of " + 
            charge.final + ")",
        ];

        if (Fee.GST.applicable(charge.account.country)) {
            this.events.push("GST: " + charge.stripeFee.GSTPortion + " of the " + charge.stripeFee.final + " Stripe Fee is included as GST");
        }

        if (Fee.VAT.applicable(charge.account.country)) {
            this.events.push("VAT: " + charge.stripeFee.vat + " is added as VAT to Stripe Fee of " + charge.stripeFee.settlement + ", for a total fee of " + charge.stripeFee.final);
        }

    };

    Log.ApplicationFee = function (charge) {
        this.type = "ApplicationFee";

        this.events = [
            "Application Fee: " + charge.applicationFee.presentment + " (" +
            charge.applicationFee.settlement + ")",
        ];

    };

    Log.Settlement = function (charge) {
        this.type = "Settlement";
        var location = 
        this.events = ["1. " + charge.presentment + " charge created on " + charge.processedOn];
        if (!charge.presentment.equals(charge.settlement)) {
            this.events.push("2. " + charge.presentment + " converted to " + charge.settlement);
            this.events.push("2a. After " + charge.final.fxPercent + "% conversion fee, " +
                charge.final + " is left");
        }
    };

    Log.flow = {};

    Log.flow.Standard = function(charge) {
        this.type = "Flow";
        this.events = [
            "1. Stripe Fee of " + charge.stripeFee.final +
                " is taken, leaving " + charge.finalAfterStripeFee,
        ];
    };

    Log.flow.Direct = function(charge) {
        this.type = "Flow";
        this.events = [
            "1. Stripe Fee of " + charge.stripeFee.final + 
                " is taken, leaving " + charge.amountAfterStripeFee,
            "2. Application Fee of " + charge.applicationFee.settlement + 
                " is sent to Platform, leaving " + charge.connectedPortion + " for Connected Account",
        ];

        if (charge.applicationFee.conversionNecessary) {
            this.events.push("3. " + charge.applicationFee.settlement + " is converted to " +
                charge.applicationFee.final);
            this.events.push("3a. After " + charge.platform.pricingModel.fxPercent + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee + " is left for Platform");
        }
    };

    Log.flow.Destination = function(charge) {
        this.type = "Flow";

        this.events = [
            "1. " + charge.connectedPortion + " is sent to Connected Account, leaving " +
                charge.applicationFee.settlement + " for Platform",  
                "2. Stripe Fee of " + charge.stripeFee.final +
                " is taken from Platform, leaving " + 
                charge.applicationFee.settlement.afterStripeFee +
                " for Platform",         
        ];

        if (charge.applicationFee.conversionNecessary) {
            this.events.push("3. " + charge.applicationFee.settlement.afterStripeFee + " is converted to " +
                charge.applicationFee.final);
            this.events.push("3a. After " + charge.platform.pricingModel.fxPercent + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee + " is left for Platform");
        }

    };

    Log.flow.SCT = function (charge) {
        return Log.flow.Standard(charge);
    };

    Log.charge = {};

    Log.Charge = function (charge) {
        this.events = [];

        if (charge.connect()) {
            this.platform = new Log.Platform(charge.platform);
            this.events.push(this.platform.events.join("\n") + "\n");
        }
        this.account = new Log.Account(charge.account);
        this.events.push(this.account.events.join("\n") + "\n");

        this.customer = new Log.Customer(charge.customer);
        this.events.push(this.customer.events.join("\n") + "\n");

        this.pricing = new Log.Pricing(charge);
        this.events.push(this.pricing.events);

        this.stripeFee = new Log.StripeFee(charge);
        this.events.push(this.stripeFee.events.join("\n"));

        if(charge.connect() && charge.type !== "SCT") {
            this.applicationFee = new Log.ApplicationFee(charge);
            this.events.push(this.applicationFee.events); 
        }

        

        this.settlement = new Log.Settlement(charge);
        this.events.push("\n" + this.settlement.events.join("\n") + "\n");

        this.paymentFlow = (charge.type === "SCT") ? new Log.flow.Standard(charge) :
            new Log.flow[charge.type](charge);

        this.events.push(this.paymentFlow.events.join("\n"));



     
        console.log(this.events.join("\n"));
    };

    return Log;
})();