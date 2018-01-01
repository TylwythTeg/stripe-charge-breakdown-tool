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
            expect(myCharge.final.amount.toString()).toEqual("126.6");


          });
    });

    describe ("Direct", function () {
          it("Creates a Direct Charge", function () {

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
            //expect(myCharge.final.amount.toString()).toEqual("100");


          });

    });
});