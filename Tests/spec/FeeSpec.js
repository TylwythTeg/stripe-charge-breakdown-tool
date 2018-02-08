describe ("Fee", function () {
    

    describe("Stripe Fee", function () {
        it("Calculates stripe fee based on pricing model using percent and fixed", function () {
            var stripeFee = new Fee.Stripe(
                new Money(100, "USD"), 
                Pricing.Model.from("US").domestic,
                "US");

            expect(stripeFee.final.amount.toString()).toEqual("3.2");

            var stripeFee = new Fee.Stripe(
                new Money(17.77, "USD"), 
                Pricing.Model.from("US").international,
                "US");

            expect(stripeFee.final.amount.toString()).toEqual("0.99");

            var stripeFee = new Fee.Stripe(
                new Money(12500, "JPY"), 
                Pricing.Model.from("JP").domestic,
                "JP");

            expect(stripeFee.final.amount.toString()).toEqual("450");

            var stripeFee = new Fee.Stripe(
                new Money(13.37, "GBP"), 
                Pricing.Model.from("GB").domestic,
                "CH");

            expect(stripeFee.final.amount.toString()).toEqual("0.39");


        });

        it("Adds GST as a portion of the Stripe fee at a rate about 10% for charges settled in Australia", function () {
            var stripeFee = new Fee.Stripe(
                new Money(100, "AUD"), 
                Pricing.Model.from("AU").domestic,
                "AU");

            expect(stripeFee.final.amount.toString()).toEqual("2.05");
            expect(stripeFee.GSTPortion.amount.toString()).toEqual("0.19");
        });

        it("Adds VAT on top of Stripe fee at a rate of 23% for charges settled in Ireland", function () {
            var stripeFee = new Fee.Stripe(
                new Money(100, "EUR"), 
                Pricing.Model.from("IE").domestic,
                "IE");

            expect(stripeFee.settlement.amount.toString()).toEqual("1.65");
            expect(stripeFee.vat.amount.toString()).toEqual("0.38");
            expect(stripeFee.final.amount.toString()).toEqual("2.03");

            var stripeFee = new Fee.Stripe(
                new Money(100, "GBP"), 
                Pricing.Model.from("GB").domestic,
                "GB");

            expect(stripeFee.settlement.amount.toString()).toEqual("1.6");
            expect(stripeFee.vat.amount.toString()).toEqual("0");
            expect(stripeFee.final.amount.toString()).toEqual("1.6");


        });

        it("Is assessed using account's pricing model currency but translated to the settlement currency if necessary", function () {
            var stripeFee = new Fee.Stripe(
                new Money(100, "EUR"), 
                Pricing.Model.from("AU").domestic,
                "AU");

            expect(stripeFee.final.amount.toString()).toEqual("2.13");
            expect(stripeFee.GSTPortion.amount.toString()).toEqual("0.19");
        });

        

    });

    describe("GST", function () {
        it("Calculates GST as a portion of Stripe's Fee, keeping the GST amount minimal", function () {
            var myCharge = new Charge.Standard({
                    amount: 100,
                    currency: "AUD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "AU",
                        currency: "AUD"
                    }
            });
            var stripeFee = myCharge.stripeFee;
            expect(stripeFee.GSTPortion.amount.toString()).toEqual("0.29");
            expect(stripeFee.final.minus(stripeFee.GSTPortion).amount.toString()).toEqual("2.91");
            expect(stripeFee.final.toString()).toEqual("3.2 AUD");

            /* rounded and floored GST portions aren't the same */
            /* floored portions used */
            /* an adjustment is made to the gst portion (increased from $0.55 to $0.56)*/
            var myCharge = new Charge.Standard({
                    amount: 201.19,
                    currency: "AUD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "AU",
                        currency: "AUD"
                    }
            });

            var stripeFee = myCharge.stripeFee;
            expect(stripeFee.GSTPortion.amount.toString()).toEqual("0.56");
            expect(stripeFee.final.minus(stripeFee.GSTPortion).amount.toString()).toEqual("5.57");
            expect(stripeFee.final.toString()).toEqual("6.13 AUD");

            /* duplicate of above */
            var myCharge = new Charge.Standard({
                    amount: 60.5,
                    currency: "AUD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "AU",
                        currency: "AUD"
                    }
            });

            var stripeFee = myCharge.stripeFee;
            expect(stripeFee.GSTPortion.amount.toString()).toEqual("0.19");
            expect(stripeFee.final.minus(stripeFee.GSTPortion).amount.toString()).toEqual("1.86");
            expect(stripeFee.final.toString()).toEqual("2.05 AUD");

            /* rounded and floored GST portions aren't the same */
            /* floored portions used */
            /* an adjustment is made to the stripe fee total*/
            /*  (rounded stripe and floored stripe are not the same) */
            var myCharge = new Charge.Standard({
                    amount: 6.7,
                    currency: "AUD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "AU",
                        currency: "AUD"
                    }
            });

            var stripeFee = myCharge.stripeFee;
            expect(stripeFee.GSTPortion.amount.toString()).toEqual("0.04");
            expect(stripeFee.final.minus(stripeFee.GSTPortion).amount.toString()).toEqual("0.44");
            expect(stripeFee.final.toString()).toEqual("0.48 AUD");
        });
    });

    describe("Application Fee", function () {
        it("The platform's application fee is found based on the platform's percentage", function () {
            var platform = new Platform("US", "USD", 10);

            var appFee = new Fee.Application(platform, {
                presentment: new Money(100, "USD"),
                settlement: new Money(100, "USD"),
                stripeFee: new Money (3.2, "'USD'"),
            });
            expect(appFee.final.amount.toString()).toEqual("10");

        });
    });

}); 