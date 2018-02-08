describe ("Log", function () {

    describe("Settlement", function () {
        it("Defines the charge that was was settled with an array of one string for the event", function() {
            var log = new Log.Settlement(
                new Money(100, "USD"),
                new Money(100, "USD"),
                new Money(100, "USD"),        
            );
            expect(log.events.length).toEqual(1);
            expect(log.events[0]).toEqual("100 USD charge created");

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
            expect(log.events.length).toEqual(1);
            expect(log.events[0]).toEqual("100 USD charge created");

        });

        it("If conversion was necessary, adds two events to describe conversion and the conversion fee taken", function() {
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
            expect(log.events[1]).toEqual("100 USD converted to 122 EUR");
            expect(log.events[2]).toEqual("After 2% conversion fee, 98 EUR is left");

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
            expect(log.events[1]).toEqual("100 USD converted to 127.88 GBP");
            expect(log.events[2]).toEqual("After 2% conversion fee, 125.32 GBP is left");
        });
    });

    describe("Standard Flow", function() {
        it("Marks the removal of the Stripe Fee from the account", function(){
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
            var log = new Log.flow.Standard(charge);
            expect(log.events[0]).toEqual("Stripe Fee of 3.83 GBP is taken, leaving 121.49 GBP");
        });
    });
    


    


    

    
    

    //etc

}); 