describe ("Log", function () {

    describe("Platform, Account, Customer", function () {
        it("Describes the Accounts, Platforms, and Customers on a charge", function () {
            var account = new Account("US", "USD");
            var log = new Log.Account(account);
            expect(log.events[0]).toEqual("Account:");
            expect(log.events[1]).toEqual("- Country: US");
            expect(log.events[2]).toEqual("- Currency: USD");

            var platform = new Platform("US", "USD", 10);
            var log = new Log.Platform(account);
            expect(log.events[0]).toEqual("Platform:");
            expect(log.events[1]).toEqual("- Country: US");
            expect(log.events[2]).toEqual("- Currency: USD");

            var customer = new Customer("US");
            var log = new Log.Customer(account);
            expect(log.events[0]).toEqual("Customer:");
            expect(log.events[1]).toEqual("- Country: US");
        });
    });

    describe("Pricing", function () {
        it("Describes the pricing that was chosen for the transaction", function () {
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
            var log = new Log.Pricing(charge);
            expect(log.events[0]).toEqual("Pricing: 2.9% + 0.3 USD");
        });    
    });

    describe("Stripe Fee", function () {
        it("Describes the Stripe Fee as well as how that amount was derived", function () {
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
            var log = new Log.StripeFee(charge);
            expect(log.events[0]).toEqual("Stripe Fee: 3.2 USD (2.9% + 0.3 USD of 100 USD)");
        });

        it("If pricing currency doesn't match the account's default currency, we account for that", function () {
            var charge = new Charge.Standard({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "GBP"
                    }

            });
            var log = new Log.StripeFee(charge);
            expect(log.events[0]).toEqual("Stripe Fee: 4.05 GBP (2.9% + 0.38 GBP of 126.6 GBP)");
        });

        it("GST is expressed as a portion of the Stripe Fee if applicable", function () {
            var charge = new Charge.Standard({
                    amount: 100,
                    currency: "AUD",
                    customer: {
                        country: "AU",
                    },
                    account: {
                        country: "AU",
                        currency: "AUD"
                    }

            });
            var log = new Log.StripeFee(charge);
            expect(log.events[1]).toEqual("GST: 0.19 AUD of the 2.05 AUD Stripe Fee is included as GST");
        });

        it("VAT is expressed as an addition to the Stripe Fee if applicable", function () {
            var charge = new Charge.Standard({
                    amount: 100,
                    currency: "EUR",
                    customer: {
                        country: "IE",
                    },
                    account: {
                        country: "IE",
                        currency: "EUR"
                    }

            });
            var log = new Log.StripeFee(charge);
            expect(log.events[1]).toEqual("VAT: 0.38 EUR is added as VAT to Stripe Fee of " +
                "1.65 EUR, for a total fee of 2.03 EUR");
        });      
    });

    describe("Application Fee", function() {
        it("Describes Application Fee as the specified presented currency and the settled amount", function(){
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
            var log = new Log.ApplicationFee(charge);
            expect(log.events[0]).toEqual("Application Fee: 10 USD (10 USD)");

            var charge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "GB",
                        currency: "GBP"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });
            var log = new Log.ApplicationFee(charge);
            expect(log.events[0]).toEqual("Application Fee: 10 USD (12.79 GBP)");
        });
    });

    describe("Settlement", function () {
        it("Defines the charge that was was settled with an array of one string for the event", function() {
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
            var log = new Log.Settlement(charge);
            expect(log.events.length).toEqual(1);
            expect(log.events[0]).toEqual("1. 100 USD charge created on Account");

        });

        it("If conversion was necessary, adds two events to describe conversion and the conversion fee taken", function() { 
            var charge = new Charge.Standard({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "FR",
                        currency: "EUR"
                    }
            });
            var log = new Log.Settlement(charge);
            expect(log.events[1]).toEqual("2. 100 USD converted to 127.88 EUR");
            expect(log.events[2]).toEqual("2a. After 2% conversion fee, 125.32 EUR is left");

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
            var log = new Log.Settlement(charge);
            expect(log.events[1]).toEqual("2. 100 USD converted to 127.88 GBP");
            expect(log.events[2]).toEqual("2a. After 2% conversion fee, 125.32 GBP is left");
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
            expect(log.events[0]).toEqual("1. Stripe Fee of 3.83 GBP is taken, leaving 121.49 GBP");
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
            expect(log.events[0]).toEqual("1. Stripe Fee of 3.2 USD is taken, leaving 96.8 USD");
            expect(log.events[1]).toEqual("2. Application Fee of 10 USD is sent to Platform, leaving 86.8 USD for Connected Account");
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
            expect(log.events[1]).toEqual("2. Application Fee of 10 USD is sent to Platform, leaving 86.8 USD for Connected Account");
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
            expect(log.events[2]).toEqual("3. 10 USD is converted to 12.79 EUR");
            expect(log.events[3]).toEqual("3a. After 2% conversion fee, 12.53 EUR is left for Platform");
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
            expect(log.events[0]).toEqual("1. 90 USD is sent to Connected Account, leaving 10 USD for Platform");
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
            expect(log.events[1]).toEqual("2. Stripe Fee of 3.2 USD is taken from Platform, leaving 6.8 USD for Platform");
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
            expect(log.events[2]).toEqual("3. 6.8 USD is converted to 8.7 EUR");
            expect(log.events[3]).toEqual("3a. After 2% conversion fee, 8.53 EUR is left for Platform");
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
    var log = new Log.Charge(charge);
    console.log(log);

    var charge = new Charge.Destination({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "GB",
                    },
                    account: {
                        country: "FR",
                        currency: "EUR"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });
    var log = new Log.Charge(charge);
    console.log(log);

     var charge = new Charge.Standard({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "GB",
                    },
                    account: {
                        country: "FR",
                        currency: "EUR"
                    },
            });
    var log = new Log.Charge(charge);
    console.log(log);



    /* Staging something */
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
    var log = new Log.Charge(charge);
    console.log(log);

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
    var log = new Log.Charge(charge);
    console.log(log);

    var charge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "GB",
                    },
                    account: {
                        country: "FR",
                        currency: "EUR"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });
    var log = new Log.Charge(charge);
    console.log(log);
    
        /* Staging something */
    var charge = new Charge.SCT({
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

    var charge = new Charge.SCT({
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
    var log = new Log.Charge(charge);
    console.log(log);

    var charge = new Charge.SCT({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "GB",
                    },
                    account: {
                        country: "FR",
                        currency: "EUR"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });
    var log = new Log.Charge(charge);
    console.log(log);

    var charge = new Charge.Standard({
                    amount: 100,
                    currency: "AUD",
                    customer: {
                        country: "AU",
                    },
                    account: {
                        country: "AU",
                        currency: "AUD"
                    },
            });
    var log = new Log.Charge(charge);
    console.log(log);

    var charge = new Charge.Standard({
                    amount: 100,
                    currency: "EUR",
                    customer: {
                        country: "IE",
                    },
                    account: {
                        country: "IE",
                        currency: "EUR"
                    },
            });
    var log = new Log.Charge(charge);
    console.log(log);

    var charge = new Charge.Standard({
                    amount: 100,
                    currency: "AUD",
                    customer: {
                        country: "AU",
                    },
                    account: {
                        country: "AU",
                        currency: "AUD"
                    },
            });
    var log = new Log.Charge(charge);
    console.log(log);

    //etc

}); 