describe ("Money", function () {

  it("Converts itself to another currency, based on a given rate", function () {
    var money = new Money(100, "USD");
    expect(money.convertTo("GBP").amount.toString()).toEqual("127.88");
  });

  it("Automatically rounds the amount passed in based on the currency", function () {
    var money = new Money(100.764, "USD");
    expect(money.amount.toString()).toEqual("100.76");
  });

  it("Supports 0 decimal currencies", function () {
    money = new Money(100.764, "JPY");
    expect(money.amount.toString()).toEqual("101");
  });

  it("Adds an interface for direct math using decimal.js (times, plus, minus)", function () {
    var money = new Money(22.33, "USD");
    var outcome = money.times(12.4347).amount.toString();
    expect(outcome).toEqual("277.67");

    outcome = money.minus(12.4347).amount.toString();
    expect(outcome).toEqual("9.9");
  });

  it("Identifies its exact equivalency (currency, amount) with another money object", function () {
    var money = new Money(22.33, "USD");
    var other = new Money(22.33, "USD");
    expect(money.equals(other)).toEqual(true);

    var money = new Money(22.33, "USD");
    var other = new Money(22.31, "USD");
    expect(money.equals(other)).toEqual(false);

    var money = new Money(22.31, "USD");
    var other = new Money(22.31, "EUR");
    expect(money.equals(other)).toEqual(false);
  });

  it("Finds the minimum charge amount for each supported settlement currency", function () {
    expect(Money.getMinimumAmount("USD")).toEqual(0.5);
    expect(Money.getMinimumAmount("DKK")).toEqual(2.5);
    expect(Money.getMinimumAmount("ZZZ")).toEqual("No record of minimum amount for currency found");
  });

  it("Lets you know if the minimum amount is met for base or converted currency", function () {
    expect(Money.meetsMinimumAmount("USD", 100)).toEqual(true);
    expect(Money.meetsMinimumAmount("USD", 0.1)).toEqual(false);
    expect(Money.meetsMinimumAmount("EGP", 0.1, "USD")).toEqual(false);
  });

  it("Gives you the smallest currency unit for a currency", function () {
    expect(Money.smallestCurrencyUnit("USD")).toEqual(new Money(0.01, "USD"));
    expect(Money.smallestCurrencyUnit("JPY")).toEqual(new Money(1, "JPY"));
  });

});