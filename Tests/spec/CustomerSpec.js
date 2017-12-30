describe ("Customer", function () {
  it("Determines whether a customer in this country would be considered european (pricing wise)", function () {

    var customer = new Customer("US");
    expect(customer.european).toEqual(false);


    customer = new Customer("DK");
    expect(customer.european).toEqual(true);

    customer = new Customer("GB");
    expect(customer.european).toEqual(true);

    customer = new Customer("SE");
    expect(customer.european).toEqual(true);

  });
});