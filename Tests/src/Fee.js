

var Fee = (function () {


    function StripeFee(finalChargeAmount, pricing, accountCountry ) {
        this.pricing = pricing;
        this.settledFixedFee = pricing.fixed.convertTo(finalChargeAmount.currency);
        this.settlement = finalChargeAmount
            .times(pricing.percentMultiplier)
            .plus(this.settledFixedFee);

        //var gst = new GST(this, charge.account);
        var vat = new VAT(this.settlement, accountCountry);
        this.vat = vat;

        if (accountCountry === "AU" || accountCountry != "IE") {
            //this.final = this.settlement;
            //this.GSTPortion = gst.GSTPortion;
        } else {
            this.final = this.settlement.plus(vat);
        }

        this.final = this.settlement.plus(vat);


    }

    function VAT(stripeFeeSettlement, country) {
        var VAT_RATE = new Decimal(0.23);
        if (country === "IE") {
            return stripeFeeSettlement.times(VAT_RATE);
        } else /* no Vat required */ {
            return new Money(0, stripeFeeSettlement.currency);
        }
    }

    /* 
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
                    
            
            
                return {
                    stripePortion: new Money(roundedStripe, stripeFeeSettlement.currency),
                    GSTPortion: new Money(roundedTax, stripeFeeSettlement.currency)
                }
            } else {
                var x = new Money(flooredStripe, stripeFeeSettlement.currency);
                var stripePortion = x;
                var GSTPortion = new Money(flooredTax, stripeFeeSettlement.currency);
                // side effect, altering stripe fee obj
                if ((stripePortion.plus(GSTPortion).amount < stripeFeeSettlement.amount) && (roundedStripe.toString() !== flooredStripe.toString())) {
                    console.log("was less");
                    stripeFeeSettlement = stripePortion.plus(GSTPortion);
                }
                return {
                    stripePortion: x,
                    GSTPortion: stripeFeeSettlement.minus(x)
                }
            }

        } else // No GST applicable  {
            return {
                stripePortion: stripeFeeSettlement,
                GSTPortion: new Money(0, stripeFeeSettlement.currency)
            }
        }
    }*/



    return {
        Stripe: StripeFee,
        //GST: GST,
        VAT: VAT
    };

})();