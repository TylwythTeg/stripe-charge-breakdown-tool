describe ("Account", function () {
    it("Has a pricing model for its country", function () {
        var account = new Account("US","USD");
        var model = Pricing.Model.from("US");
        expect(account.pricingModel).toEqual(model);
    });

    it("Reveals whether it has domestic (which includes european) pricing for a customer", function () {
        var account = new Account("US","USD");
        var customer = new Customer("US");
        expect(account.hasDomesticPricingFor(customer)).toEqual(true);

        account = new Account("US","USD");
        customer = new Customer("GB");
        expect(account.hasDomesticPricingFor(customer)).toEqual(false);

        account = new Account("GB","GBP");
        customer = new Customer("GB");
        expect(account.hasDomesticPricingFor(customer)).toEqual(true);

        account = new Account("GB","GBP");
        customer = new Customer("FR");
        expect(account.hasDomesticPricingFor(customer)).toEqual(true);

        account = new Account("GB","GBP");
        customer = new Customer("US");
        expect(account.hasDomesticPricingFor(customer)).toEqual(false);

        /* nest 'it's? */
    });
});