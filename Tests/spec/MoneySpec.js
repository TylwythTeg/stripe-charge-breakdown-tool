

describe ("Money Object or Module", function () {

  it("converts itself to another currency, based on a given rate", function () {
    var money = new Money(100, "USD");
    expect(money.convertTo("GBP").amount.toString()).toEqual("127.88");
  });

  it("automatically rounds the amount passed in based on the currency", function () {
    var money = new Money(100.764, "USD");
    expect(money.amount.toString()).toEqual("100.76");
  });

  it("supports 0 decimal currencies", function () {
    money = new Money(100.764, "JPY");
    expect(money.amount.toString()).toEqual("101");
  });

  it("adds an interface for direct math using decimal.js (times, plus, minus)", function () {
    var money = new Money(22.33, "USD");
    var outcome = money.times(12.4347).amount.toString();
    expect(outcome).toEqual("277.67");
    outcome = money.minus(12.4347).amount.toString();
    expect(outcome).toEqual("9.9");
  });

});