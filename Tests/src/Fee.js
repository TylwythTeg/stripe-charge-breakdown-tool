/* Needs Money.js */

VAT
GST
Stripe
Conversion



var GST = function(stripeFee, account) {
    var stripePortionMultiplier = new Decimal(10).dividedBy(11);
    if (account.country === "AU") {
        // handling money math and rounding ourselves...
        var stripePortion = stripeFee.settlement.amount.times(stripePortionMultiplier);
        var roundedStripe = new Decimal(Math.round10(stripePortion, stripeFee.settlement.rounding));
        var flooredStripe = new Decimal(Math.floor10(stripePortion, stripeFee.settlement.rounding));

        var flooredTax = new Decimal(Math.floor10(flooredStripe.dividedBy(10), stripeFee.settlement.rounding));
        var roundedTax = new Decimal(Math.round10(roundedStripe.dividedBy(10), stripeFee.settlement.rounding));

        console.log("Rounded Stripe: " + roundedStripe);
        console.log("Floored Stripe: " + flooredStripe);
        console.log("Rounded Tax: " + roundedTax);
        console.log("Floored Tax: " + flooredTax);

        if (roundedTax.toString() === flooredTax.toString()) {
                
        
        
            return {
                stripePortion: new Money(roundedStripe, stripeFee.settlement.currency),
                GSTPortion: new Money(roundedTax, stripeFee.settlement.currency)
            }
        } else {
            var x = new Money(flooredStripe, stripeFee.settlement.currency);
            var stripePortion = x;
            var GSTPortion = new Money(flooredTax, stripeFee.settlement.currency);
            /* side effect, altering stripe fee obj */
            if ((stripePortion.plus(GSTPortion).amount < stripeFee.settlement.amount) && (roundedStripe.toString() !== flooredStripe.toString())) {
                console.log("was less");
                stripeFee.settlement = stripePortion.plus(GSTPortion);
            }
            return {
                stripePortion: x,
                GSTPortion: stripeFee.settlement.minus(x)
            }
        }

    } else /* No GST applicable */ {
        return {
            stripePortion: stripeFee.settlement,
            GSTPortion: new Money(0, stripeFee.settlement.currency)
        }
    }
};

console.log(GST);

var VAT = function(settledStripeFee, account) {
    var VAT_RATE = new Decimal(0.23);
    if (account.country === "IE") {
        return settledStripeFee.times(VAT_RATE);
    } else /* no Vat required */ {
        return new Money(0, settledStripeFee.currency);
    }
};


/* 

new stripeFee({
    amount: new Decimal(100),
    currency: "USD",
},
{
    fixed: {
        amount: new Decimal(0.30),
        currency: "USD",  
    },
    percent: new Decimal(2.9),
    percentMultiplier: new Decimal(0.029),
}, {
    country: "US", 
});


*/
var stripeFee = function(settlement,pricing, account) {
    this.pricing = charge.pricing;
    this.settledFixedFee = charge.pricing.fixed.convertTo(charge.settlement.currency);
    this.settlement = charge.final
        .times(charge.pricing.percentMultiplier)
        .plus(this.settledFixedFee);

    var gst = new GST(this, charge.account);
    var vat = new VAT(this.settlement, charge.account);
    this.vat = vat;

    if (charge.account.country === "AU" || charge.account.country != "IE") {
        this.final = this.settlement;
        this.GSTPortion = gst.GSTPortion;
    } else {
        this.final = this.settlement.plus(vat);
    }

};
