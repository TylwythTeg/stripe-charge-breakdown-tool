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

    describe("Application Fee", function () {
        it("The platform's application fee is found based on the platform's percentage", function () {
            var platform = new Platform("US", "USD", 10);

            var appFee = new Fee.Application(platform, {
                presentment: new Money(100, "USD"),
                settlement: new Money(100, "USD"),
                stripeFee: new Money (3.2, "'USD'"),
            });

            expect(appFee.finalAfterFxFee.amount.toString()).toEqual("10");


        });
    });

        

}); 