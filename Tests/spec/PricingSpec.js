describe ("Pricing", function () {



  it("constructs pricing", function () {

    console.log(Pricing.Model);

    var usModel = new Pricing.Model("US", {
        domestic: "2.9 + 0.30",
        international: "3.9 + 0.30",
        fxPercent: 1,
        currency: "USD"
    });

    console.log(usModel);

    console.log(usModel.domestic.toString());
    console.log(usModel.international.toString());
    console.log(usModel.toString());

  });



});