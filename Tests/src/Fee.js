/* Do I want to add a TransactionalFee that contains a Stripe fee?  */
/* Would that make the stripe fee adjustment in GST situations make more sense?  */

var Fee = (function() {

    function StripeFee(finalChargeAmount, pricing, accountCountry) {
        this.pricing = pricing;
        this.settledFixedFee = pricing.fixed.convertTo(finalChargeAmount.currency);
        this.settlement = finalChargeAmount
            .times(pricing.percentMultiplier)
            .plus(this.settledFixedFee);

        var gst = new GST(this.settlement, accountCountry);
        console.log(gst);
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

        return (country === "IE") ?
            stripeFeeSettlement.times(VAT_RATE) :
            new Money(0,stripeFeeSettlement.currency);
    }

    var GST = (function () {

        function GST(stripeFeeSettlement, accountCountry) {
            if (!applicable(accountCountry)) {
                return noGST(stripeFeeSettlement);
            }

            var stripePortionMultiplier = new Decimal(10).dividedBy(11);
            var flooredStripe = stripeFeeSettlement.times(stripePortionMultiplier, "floor");
            var roundedStripe = stripeFeeSettlement.times(stripePortionMultiplier);
            var roundedTax = roundedStripe.dividedBy(10);
            var flooredTax = flooredStripe.dividedBy(10, "floor");

            var gstPortionsAreTheSame = (roundedTax.toString() === flooredTax.toString());

            return gstPortionsAreTheSame ?
                roundedPortions(roundedStripe, roundedTax, stripeFeeSettlement) :
                flooredPortions(flooredStripe, roundedStripe, flooredTax, stripeFeeSettlement);
        }


        function applicable(country) {
            return (country === "AU");
        }

        function noGST(stripeFeeSettlement) {
            return {
                stripePortion: stripeFeeSettlement,
                GSTPortion: new Money(0, stripeFeeSettlement.currency),
                stripeFeeTotal: stripeFeeSettlement
            };
        }

        function roundedPortions(roundedStripe, roundedTax, stripeFeeSettlement) {
            return {
                stripePortion: roundedStripe,
                GSTPortion: roundedTax,
                stripeFeeTotal: stripeFeeSettlement
            };
        }

        function flooredPortions(flooredStripe, roundedStripe, flooredTax, stripeFeeSettlement) {
            /* send back an amount indicating total stripe fee amount must change */
            if (roundedStripe.toString() !== flooredStripe.toString()) {
                return {
                    stripePortion: flooredStripe,
                    GSTPortion: flooredTax,
                    stripeFeeTotal: flooredStripe.plus(flooredTax)
                };
            } else {
                /* Otherwise use floored Stripe portion but find the GST part on remainder */
                var GSTPortion = stripeFeeSettlement.minus(flooredStripe);
                return {
                 stripePortion: flooredStripe,
                 GSTPortion: stripeFeeSettlement.minus(flooredStripe),
                 stripeFeeTotal: stripeFeeSettlement
                };
            }
        }

        return GST;
    })();

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
            this.fxFee = this.final.times(platform.pricingModel.fxMultiplier);
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