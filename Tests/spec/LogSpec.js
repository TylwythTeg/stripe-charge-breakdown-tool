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

    describe("Direct Flow", function() {
        it("The Stripe fee is taken first from charge's funds", function(){
            var charge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });

            var log = new Log.flow.Direct(charge);
            expect(log.events[0]).toEqual("Stripe Fee of 3.2 USD is taken, leaving 96.8 USD");
            expect(log.events[1]).toEqual("Application Fee of 10 USD is sent to Platform, leaving 86.8 USD for Connected Account");
        });

        it("The application Fee is sent to the platform", function(){
            var charge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });

            var log = new Log.flow.Direct(charge);
            expect(log.events[1]).toEqual("Application Fee of 10 USD is sent to Platform, leaving 86.8 USD for Connected Account");
        });

        it("If conversion to platform's currency is necessary, add two events for conversion and fees", function(){
            var charge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "FR",
                        currency: "EUR",
                        percentFee: 10
                    }
            });
            var log = new Log.flow.Direct(charge);
            expect(log.events[2]).toEqual("10 USD is converted to 12.79 EUR");
            expect(log.events[3]).toEqual("After 2% conversion fee, 12.53 EUR is left for Platform");
        });
    });
    
    describe("Destination Flow", function() {
        it("The Connected Account receives its portion of the funds", function(){
            var charge = new Charge.Destination({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });

            var log = new Log.flow.Destination(charge);
            expect(log.events[0]).toEqual("90 USD is sent to Connected Account, leaving 10 USD for Platform");
        });

         it("The Stripe Fee is taken from the platform's portion", function(){
            var charge = new Charge.Destination({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });

            var log = new Log.flow.Destination(charge);
            expect(log.events[1]).toEqual("Stripe Fee of 3.2 USD is taken from Platform, leaving 6.8 USD for Platform");
        });


        it("If conversion to platform's currency is necessary, add two events for conversion and fees", function(){
            var charge = new Charge.Destination({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "FR",
                        currency: "EUR",
                        percentFee: 10
                    }
            });
            var log = new Log.flow.Destination(charge);
            expect(log.events[2]).toEqual("6.8 USD is converted to 8.7 EUR");
            expect(log.events[3]).toEqual("After 2% conversion fee, 8.53 EUR is left for Platform");
        });

    });

    
/* Staging something */
    var charge = new Charge.Destination({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "FR",
                        currency: "EUR",
                        percentFee: 10
                    }
            });
    var log = new Log.Charge(charge);
    console.log(log);


    
    

    //etc

}); 