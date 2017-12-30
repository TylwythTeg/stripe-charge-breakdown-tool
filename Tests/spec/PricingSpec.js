describe ("Pricing", function () {


    it("Pricing object accepts string 'percent + fixed' and has a percent and fixed attribute (Decimal, Money)", function () {
        var domesticPricing = new Pricing("2.9 + 0.30", "USD");
        var pricing = domesticPricing;

        expect(pricing.percent.toString()).toEqual("2.9");
        expect(pricing.percentMultiplier.toString()).toEqual("0.029");
        expect(pricing.fixed.amount.toString()).toEqual("0.3");
        expect(pricing.currency).toEqual("USD");
    });

    describe ("Pricing Model", function () {
        it("constructs pricing model for a country with domestic, international, converison pricing", function () {

        var usModel = new Pricing.Model("US", {
            domestic: "2.9 + 0.30",
            international: "3.9 + 0.30",
            fxPercent: 1,
            currency: "USD"
        });

        expect(usModel.domestic.toString()).toEqual("2.9 + 0.3 USD");
        expect(usModel.international.toString()).toEqual("3.9 + 0.3 USD");

        expect(usModel.fxPercent.toString()).toEqual("1");
        expect(usModel.fxMultiplier.toString()).toEqual("0.01");

        });


        it("sets a dictionary of each pricing model for each Stripe Country and can retrieve entry by country code", function () {

            var pricingModel = Pricing.Model.fromCountry("US");

            expect(pricingModel.domestic.toString()).toEqual("2.9 + 0.3 USD");
            expect(pricingModel.international.toString()).toEqual("3.9 + 0.3 USD");

            expect(pricingModel.fxPercent.toString()).toEqual("1");
            expect(pricingModel.fxMultiplier.toString()).toEqual("0.01");

        });
    });




});