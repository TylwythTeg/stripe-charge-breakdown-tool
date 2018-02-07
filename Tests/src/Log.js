var Log = (function() {

    /* pick a function based on charge.type? */
    /* So we create a charge instance and go Log(charge.type) and we're done */
    function Log(charge) {

    }

    Log.Settlement = function (presentment, settlement, final) {
        var strings = [
            presentment + " charge created"
        ];
        console.log(presentment.toString() );
        console.log(settlement.toString());
        console.log(final);
        console.log(final.toString());
        if (!presentment.equals(settlement)) {
            strings.push(presentment + " converted to " + settlement);
            strings.push("After " + final.fxPercent + "% conversion fee, " +
                final.toString() + " is left");
        }
        return strings;
    };

    Log.directCharge = function(charge) {
        var strings = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var newStrings = [
            "Stripe Fee of " + charge.stripeFee.final + 
                " is taken, leaving " + charge.amountAfterStripeFee,
            "Application Fee of " + charge.applicationFee.settlement + 
                " is sent to platform, leaving " + charge.connectedPortion + " for Connected Account",
        ];

        if (charge.applicationFee.conversionNecessary) {
            newStrings.push(charge.applicationFee.settlement + "is converted to " +
                charge.applicationFee.final);
            newStrings.push("After " + charge.platform.pricingModel.fxFee + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee);
        }

        return strings.concat(newStrings);
    };

    Log.destinationCharge = function(charge) {
        var strings = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var newStrings = [
            charge.connectedPortion + " is sent to Connected Account, leaving " +
                charge.applicationFee.settlement + " for Platform",
            "Stripe Fee of " + charge.stripeFee.settlement +
                "is taken from Platform, leaving " + charge.applicationFee.afterStripeFee +
                " for Platform",
        ];

        if (charge.applicationFee.conversionNecessary) {
            newStrings.push(charge.applicationFee.settlement.afterStripeFee + "is converted to " +
                charge.applicationFee.final);
            newStrings.push("After " + charge.platform.pricingModel.fxFee + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee);
        }

        return strings.concat(newStrings);
    };

    Log.standardCharge = function(charge) {
        var strings = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var newStrings = [
            "Stripe Fee of " + charge.stripeFee.settlement +
                "is taken, leaving " + charge.finalAfterStripeFee,
        ];

        return strings.concat(newStrings);
    };




    return Log;
})();