var Log = (function() {

    /* pick a function based on charge.type? */
    /* So we create a charge instance and go Log(charge.type) and we're done */
    function Log(charge) {

    }

    Log.settlement = function (presentment, settlement, final) {
        var entries = [presentment + " charge created"];

        if (!presentment.equals(settlement)) {
            entries.push(presentment + " converted to " + settlement);
            entries.push("After " + final.fxPercent + "% conversion fee, " +
                final.toString() + " is left");
        }
        return entries;
    };

    Log.directCharge = function(charge) {
        var settlementEntries = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var entries = [
            "Stripe Fee of " + charge.stripeFee.final + 
                " is taken, leaving " + charge.amountAfterStripeFee,
            "Application Fee of " + charge.applicationFee.settlement + 
                " is sent to platform, leaving " + charge.connectedPortion + " for Connected Account",
        ];

        if (charge.applicationFee.conversionNecessary) {
            entries.push(charge.applicationFee.settlement + "is converted to " +
                charge.applicationFee.final);
            entries.push("After " + charge.platform.pricingModel.fxFee + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee);
        }

        return settlementEntries.concat(entries);
    };

    Log.destinationCharge = function(charge) {
        var settlementEntries = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var entries = [
            charge.connectedPortion + " is sent to Connected Account, leaving " +
                charge.applicationFee.settlement + " for Platform",
            "Stripe Fee of " + charge.stripeFee.settlement +
                "is taken from Platform, leaving " + charge.applicationFee.afterStripeFee +
                " for Platform",
        ];

        if (charge.applicationFee.conversionNecessary) {
            entries.push(charge.applicationFee.settlement.afterStripeFee + "is converted to " +
                charge.applicationFee.final);
            entries.push("After " + charge.platform.pricingModel.fxFee + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee);
        }

        return settlementEntries.concat(entries);
    };

    Log.standardCharge = function(charge) {
        var settlementEntries = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var entries = [
            "Stripe Fee of " + charge.stripeFee.settlement +
                "is taken, leaving " + charge.finalAfterStripeFee,
        ];

        return settlementEntries.concat(entries);
    };




    return Log;
})();