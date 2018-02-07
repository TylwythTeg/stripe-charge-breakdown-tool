describe ("Log", function () {
    


    /* has 1 element defining the charge created if no conversion was necessary */
    var log = new Log.Settlement(
        new Money(100, "USD"),
        new Money(100, "USD"),
        new Money(100, "USD"),        
    );
    console.log(log);

    var charge = new Charge.Standard({
            amount: 100,
            currency: "USD",
            customer: {
                country: "US",
            },
            account: {
                country: "US",
                currency: "USD"
            }
    });
    var log = new Log.Settlement(charge.presentment, charge.settlement, charge.final);
    console.log(log);

    /* If conversion was necessary, add 2 elements for the conversion and conversion fee process */
    var log = new Log.Settlement(
        new Money(100, "USD"),
        new Money(122, "EUR"),
        {
            amount: 98,
            currency: "EUR",
            fxPercent: 2,
            toString: function () {return "98 EUR";},
        },
    );
    console.log(log);

    var charge = new Charge.Standard({
            amount: 100,
            currency: "USD",
            customer: {
                country: "US",
            },
            account: {
                country: "GB",
                currency: "GBP"
            }
    });
    var log = new Log.Settlement(charge.presentment, charge.settlement, charge.final);
    console.log(log);
    

    //etc

}); 