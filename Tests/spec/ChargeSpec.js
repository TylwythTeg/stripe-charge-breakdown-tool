describe ("Charge", function () {

    describe ("Standard", function () {
          it("Creates a Standard Charge with Stripe fee", function () {

            var myCharge = new Charge.Standard({
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
            expect(myCharge.final.amount.toString()).toEqual("100");


          });

          it("Settles the charge, converting to account's default currency if necessary,"
            + " taking a conversion fee based on country (2% in most)", function () {

            var myCharge = new Charge.Standard({
                    amount: 100,
                    currency: "EUR",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    }
            });
            expect(myCharge.settlement.amount.toString()).toEqual("127.88");
            expect(myCharge.final.amount.toString()).toEqual("126.6");


          });
    });

    describe ("Direct", function () {
          it("Creates a Direct Charge", function () {

            var myCharge = new Charge.Direct({
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
            //expect(myCharge.final.amount.toString()).toEqual("100");
            expect(myCharge.final.amount.toString()).toEqual("100");

            var myCharge = new Charge.Direct({
                    amount: 100,
                    currency: "EUR",
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
            //expect(myCharge.final.amount.toString()).toEqual("100");
            expect(myCharge.settlement.amount.toString()).toEqual("127.88");



          });

          it("Takes the application fee after the Stripe fee is taken out and sends to the platform, converting if necessary", function () {

            var myCharge = new Charge.Direct({
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
            expect(myCharge.platform.applicationFee.finalAfterFxFee.amount.toString()).toEqual("10");

            var myCharge = new Charge.Direct({
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
            expect(myCharge.platform.applicationFee.final.amount.toString()).toEqual("12.79");
            expect(myCharge.platform.applicationFee.finalAfterFxFee.amount.toString()).toEqual("12.53");



          });

          /* Should add spec for appfee retaining what is left. */
          /* i.e. if 50% app fee on $0.50 charge, where stripe fee is $0.31 */
          /* app fee would be  $0.25, but all that is left is $0.19 */
          /* And is that what the platform would retain? */

    });
});