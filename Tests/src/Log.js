var Log = (function() {

    /* pick a function based on charge.type? */
    /* So we create a charge instance and go Log(charge.type) and we're done */
    function Log(charge) {

    }

    Log.settlement = function (presentment, settlement, final) {
        var events = [presentment + " charge created"];
        if (!presentment.equals(settlement)) {
            events.push(presentment + " converted to " + settlement);
            events.push("After " + final.fxPercent + "% conversion fee, " +
                final + " is left");
        }
        return events;
    };

    /* Log.directFlow, Log.destinationFlow, Log.standardFlow ?*/
    Log.directCharge = function(charge) {
        var settlementEvents = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var events = [
            "Stripe Fee of " + charge.stripeFee.final + 
                " is taken, leaving " + charge.amountAfterStripeFee,
            "Application Fee of " + charge.applicationFee.settlement + 
                " is sent to platform, leaving " + charge.connectedPortion + " for Connected Account",
        ];

        if (charge.applicationFee.conversionNecessary) {
            events.push(charge.applicationFee.settlement + "is converted to " +
                charge.applicationFee.final);
            events.push("After " + charge.platform.pricingModel.fxFee + "% conversion fee, " + 
                charge.applicationFee.final.afterFxFee);
        }

        return settlementEvents.concat(events);
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

    Log.standardCharge = function(charge) {
        var settlementEvents = Log.Settlement(charge.presentment, charge.settlement, charge.final);

        var events = [
            "Stripe Fee of " + charge.stripeFee.settlement +
                "is taken, leaving " + charge.finalAfterStripeFee,
        ];

        return settlementEntries.concat(events);
    };




    return Log;
})();