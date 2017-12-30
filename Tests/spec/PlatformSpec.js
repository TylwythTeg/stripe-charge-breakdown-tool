describe ("Platform", function () {
    it("Inherits from Account, so can check if it has domestic pricing for customer (Useful for SCTs)", function () {
        var platform = new Platform("US", "USD", 10);
        var customer = new Customer("US");
        expect(platform.hasDomesticPricingFor(customer)).toEqual(true);

        platform = new Platform("GB", "GBP", 10);
        expect(platform.hasDomesticPricingFor(customer)).toEqual(false);

        customer = new Customer("DK");
        expect(platform.hasDomesticPricingFor(customer)).toEqual(true);
    });
}); 