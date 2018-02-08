var Log = (function() {

    /* pick a function based on charge.type? */
    /* So we create a charge instance and go Log(charge.type) and we're done */
    function Log(charge) {

    }

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
        this.type = "StandardFlow";
        this.events = [
            "Stripe Fee of " + charge.stripeFee.settlement +
                " is taken, leaving " + charge.finalAfterStripeFee,
        ];
    };

    Log.flow.Direct = function(charge) {
        this.type = "DirectFlow";
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

    Log.destinationCharge = function(charge) {
        var settlementEvents = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var events = [
            charge.connectedPortion + " is sent to Connected Account, leaving " +
                charge.applicationFee.settlement + " for Platform",
            "Stripe Fee of " + charge.stripeFee.settlement +
                "is taken from Platform, leaving " + charge.applicationFee.afterStripeFee +
                " for Platform",
        ];

        if (charge.applicationFee.conversionNecessary) {
            events.push(charge.applicationFee.settlement.afterStripeFee + "is converted to " +
                charge.applicationFee.final);
            events.push("After " + charge.platform.pricingModel.fxFee + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee);
        }

        return settlementEvents.concat(events);
    };

    




    return Log;
})();