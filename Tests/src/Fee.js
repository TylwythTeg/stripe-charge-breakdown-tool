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
            new Money(0, stripeFeeSettlement.currency);
    }

    VAT.applicable = function(country) {
        return (country === "IE");
    };

    var GST = (function() {

        function GST(stripeFeeSettlement, accountCountry) {
            if (!applicable(accountCountry)) {
                return noGST(stripeFeeSettlement);
            }

            var stripePortionMultiplier = new Decimal(10).dividedBy(11);
            var flooredStripe = stripeFeeSettlement.times(stripePortionMultiplier, "floor");
            var roundedStripe = stripeFeeSettlement.times(stripePortionMultiplier);
            var roundedTax = roundedStripe.dividedBy(10);
            var flooredTax = flooredStripe.dividedBy(10, "floor");

            return roundedTax.equals(flooredTax) ?
                roundedPortions(roundedStripe, roundedTax, stripeFeeSettlement) :
                flooredPortions(flooredStripe, roundedStripe, flooredTax, stripeFeeSettlement);
        }

        GST.applicable = function(country) {
            return (country === "AU");
        };


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
            if (roundedStripe.equals(flooredStripe)) {
                /* Use floored Stripe portion and find the GST part on remainder */
                /* (GSTPortion plus 1 cent) */
                return {
                    stripePortion: flooredStripe,
                    GSTPortion: stripeFeeSettlement.minus(flooredStripe),
                    stripeFeeTotal: stripeFeeSettlement
                };
            }

            /* Otherwise use both floored portions and adjust the stripe fee total */
            /* (stripeFeeTotal minus 1 cent) */
            return {
                stripePortion: flooredStripe,
                GSTPortion: flooredTax,
                stripeFeeTotal: flooredStripe.plus(flooredTax)
            };
        }

        return GST;
    })();

    function Application(platform, charge, type) {
        this.conversionNecessary = (platform.currency !== charge.settlement.currency);

        /* what is specified at the time of charge creation */
        this.presentment = charge.presentment.times(platform.feeMultiplier);

        /* No fx fee here because we're just converting a value */
        this.settlement = this.presentment.convertTo(charge.settlement.currency);

        if (type === "Destination") {
            // Since there's no 100% app fee on Destination charges, need to ensure connected account gets at least
            // the smallest currency unit from the final charge amount
            if (charge.final.minus(this.settlement).amount <= 0) {
                this.settlement = charge.final.minus(Money.smallestCurrencyUnit(this.settlement.currency));
            }
            this.settlement.afterStripeFee = this.settlement.minus(charge.stripeFee.final);
            this.final = this.settlement.afterStripeFee.convertTo(platform.currency);
        } else {
            // if the specified percentage is greater than what's left after the stripe fee is taken
            // just give them what's left
            if (charge.amountAfterStripeFee.amount.comparedTo(this.settlement.amount) == -1) {
                this.settlement = charge.amountAfterStripeFee;
            }
            this.final = this.settlement.convertTo(platform.currency);
        }


        if (this.conversionNecessary) {
            this.final.fxFee = this.final.times(platform.pricingModel.fxMultiplier);
            this.final.afterFxFee = this.final.minus(this.final.fxFee);
        }
    }


    return {
        Stripe: StripeFee,
        GST: GST,
        VAT: VAT,
        Application: Application
    };

})();