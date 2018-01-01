 /* Do I want to add a TransactionalFee contains a Stripe fee?  */
/* Would it make the stripe fee adjustment make more sense?  */
var Fee = (function() {


    function StripeFee(finalChargeAmount, pricing, accountCountry) {
        this.pricing = pricing;
        this.settledFixedFee = pricing.fixed.convertTo(finalChargeAmount.currency);
        this.settlement = finalChargeAmount
            .times(pricing.percentMultiplier)
            .plus(this.settledFixedFee);

        console.log(this.settlement.toString());
        var gst = new GST(this.settlement, accountCountry);
        var vat = new VAT(this.settlement, accountCountry);
        this.vat = vat;

        if (accountCountry === "AU") {
            this.final = gst.stripeFeeTotal;
            this.GSTPortion = gst.GSTPortion;
        } else if (accountCountry === "IE") {
            this.final = this.settlement.plus(vat);
        } else {
            this.final = this.settlement;
        }
    }

    function VAT(stripeFeeSettlement, country) {
        var VAT_RATE = new Decimal(0.23);
        if (country === "IE") {
            return stripeFeeSettlement.times(VAT_RATE);
        } else /* no Vat required */ {
            return new Money(0, stripeFeeSettlement.currency);
        }
    }

    /* Calcs a GST and Stripe portion for StripeFee w/ StripeFeeTotal to indicate if the total changed in process */
    function GST(stripeFeeSettlement, accountCountry) {
        var stripePortionMultiplier = new Decimal(10).dividedBy(11);
        if (accountCountry === "AU") {
            // handling money math and rounding ourselves...
            var stripePortion = stripeFeeSettlement.amount.times(stripePortionMultiplier);
            var roundedStripe = new Decimal(Math.round10(stripePortion, stripeFeeSettlement.rounding));
            var flooredStripe = new Decimal(Math.floor10(stripePortion, stripeFeeSettlement.rounding));
            var flooredTax = new Decimal(Math.floor10(flooredStripe.dividedBy(10), stripeFeeSettlement.rounding));
            var roundedTax = new Decimal(Math.round10(roundedStripe.dividedBy(10), stripeFeeSettlement.rounding));
            console.log("Rounded Stripe: " + roundedStripe);
            console.log("Floored Stripe: " + flooredStripe);
            console.log("Rounded Tax: " + roundedTax);
            console.log("Floored Tax: " + flooredTax);
            if (roundedTax.toString() === flooredTax.toString()) {
                /* use rounded portions */
                return {
                    stripePortion: new Money(roundedStripe, stripeFeeSettlement.currency),
                    GSTPortion: new Money(roundedTax, stripeFeeSettlement.currency),
                    stripeFeeTotal: stripeFeeSettlement
                };
            } else {
                /* Use floored portions */
                var stripePortion = new Money(flooredStripe, stripeFeeSettlement.currency);
                var GSTPortion = new Money(flooredTax, stripeFeeSettlement.currency);
                /* if portions don't add up, something needs adjustment */
                if ((stripePortion.plus(GSTPortion).amount < stripeFeeSettlement.amount)) {
                    if (roundedStripe.toString() !== flooredStripe.toString()) {
                        /* send back an amount indicating total stripe fee amount must change */
                        stripeFeeSettlement = stripePortion.plus(GSTPortion);
                    } else {
                        /* use rounded Stripe portion but find the GST fee on remainder */
                        GSTPortion = stripeFeeSettlement.minus(stripePortion);
                    }
                }
                return {
                    stripePortion: stripePortion,
                    GSTPortion: GSTPortion,
                    stripeFeeTotal: stripeFeeSettlement,
                };
            }
        } else /* No GST applicable */ {
            return {
                stripePortion: stripeFeeSettlement,
                GSTPortion: new Money(0, stripeFeeSettlement.currency)
            };
        }
    }

    function Application(platform, charge, type) {
        /* what is specified at the time of charge creation */
        this.presentment = charge.presentment.times(platform.feeMultiplier);

        /* No fx fee here because we're just converting a value */
        this.settlement = this.presentment.convertTo(charge.settlement.currency);

        /*  if destination, need to deduct stripe fee. If Direct, just set as settlement. */
        if (type === "Destination") {
            this.afterStripeFee = this.settlement.minus(charge.stripeFee.final);
        } else {
            this.afterStripeFee = this.settlement;
        }

        this.final = this.afterStripeFee.convertTo(platform.currency);

        if (platform.currency !== charge.settlement.currency) {
            this.fxFee = this.final.times(platform.pricing.fxMultiplier);
            this.finalAfterFxFee = this.final.minus(this.fxFee);
        } else {
            this.fxFee = new Money(0, platform.currency);
            this.finalAfterFxFee = this.final.minus(this.fxFee);
        }
    }


    return {
        Stripe: StripeFee,
        GST: GST,
        VAT: VAT,
        Application: Application
    };

})();