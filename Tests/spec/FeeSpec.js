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
            var myCharge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });

            //var platform = new Platform("US", "USD", 10);
            /*
            var appFee = new Fee.Application(platform, {
                presentment: new Money(100, "USD"),
                settlement: new Money(100, "USD"),
                stripeFee: new Money (3.2, "'USD'"),
            });*/
            var appFee = myCharge.applicationFee;
            expect(appFee.final.amount.toString()).toEqual("10");

        });

        it("A 100% platform fee on a Destination charge is really (100% - smallestCurrencyUnit)", function () {

            // non-case
            var myCharge = new Charge.Destination({
                amount: 100,
                currency: "USD",
                customer: {
                    country: "US",
                },
                account: {
                    country: "US",
                    currency: "USD"
                },
                platform: {
                    country: "US",
                    currency: "USD",
                    percentFee: 10
                }
            });

            expect(myCharge.applicationFee.settlement.amount.toString()).toEqual("10");

            // case
            var myCharge = new Charge.Destination({
                amount: 100,
                currency: "USD",
                customer: {
                    country: "US",
                },
                account: {
                    country: "US",
                    currency: "USD"
                },
                platform: {
                    country: "US",
                    currency: "USD",
                    percentFee: 100
                }
            });
            //console.log(new Log.Charge(myCharge).output);
            expect(myCharge.applicationFee.settlement.amount.toString()).toEqual("99.99");

            // case
            // 99% of 0.5 rounds up to 0.5 and we catch these situations too
            // and still find (100% - smallestCurrencyUnit)
            var myCharge = new Charge.Destination({
                amount: 0.5,
                currency: "USD",
                customer: {
                    country: "US",
                },
                account: {
                    country: "US",
                    currency: "USD"
                },
                platform: {
                    country: "US",
                    currency: "USD",
                    percentFee: 99
                }
            });
            //console.log(new Log.Charge(myCharge).output);
            expect(myCharge.applicationFee.settlement.amount.toString()).toEqual("0.49");

            // conversion case
            var myCharge = new Charge.Destination({
                amount: 100,
                currency: "USD",
                customer: {
                    country: "US",
                },
                account: {
                    country: "GB",
                    currency: "GBP"
                },
                platform: {
                    country: "US",
                    currency: "USD",
                    percentFee: 100
                }
            });
            // settlement: 127.88
            // final: 125.32
            // sFee: 3.83
            // app fee is 125.31
            // app fee minus sFee: 121.48
            // ap fee coverted: 155.35
            // app fee after fx: 153.8
            expect(myCharge.applicationFee.final.afterFxFee.amount.toString()).toEqual("153.8");

            // conversion case (but not back)
            var myCharge = new Charge.Destination({
                amount: 100,
                currency: "USD",
                customer: {
                    country: "US",
                },
                account: {
                    country: "GB",
                    currency: "GBP"
                },
                platform: {
                    country: "GB",
                    currency: "GBP",
                    percentFee: 100
                }
            });
            // settlement: 127.88
            // final: 125.32
            // sFee: 3.83
            // app fee is 125.31
            // app fee minus sFee: 121.48
            //console.log(new Log.Charge(myCharge).output);
            expect(myCharge.applicationFee.final.amount.toString()).toEqual("121.48");

        });

        it("A % platform fee on a Direct charge is really (100% - stripe fee) if % > that amount", function () {
            // non-case
            var myCharge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 10
                    }
            });
            var appFee = myCharge.applicationFee;
            expect(appFee.final.amount.toString()).toEqual("10");

            // case
            var myCharge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 100
                    }
            });


            var appFee = myCharge.applicationFee;
            expect(appFee.final.amount.toString()).toEqual("96.8");

            // case
            var myCharge = new Charge.Direct({
                    amount: 0.5,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "US",
                        currency: "USD"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 99
                    }
            });
            var appFee = myCharge.applicationFee;
            //console.log(new Log.Charge(myCharge).output);
            expect(appFee.final.amount.toString()).toEqual("0.19");

            // conversion case #1
            var myCharge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "GB",
                        currency: "GBP"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 100
                    }
            });
            // charge settlement: 127.88
            // charge final: 125.32
            // stripe fee: 3.83
            // app fee settlement: 121.49
            // app fee settlemented converted: 155.36
            // app fee final: 153.81

            var appFee = myCharge.applicationFee;
            //console.log(new Log.Charge(myCharge).output);
            expect(appFee.final.afterFxFee.amount.toString()).toEqual("153.81");

            // conversion case #1 (but not back)
            var myCharge = new Charge.Direct({
                    amount: 100,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "GB",
                        currency: "GBP"
                    },
                    platform: {
                        country: "GB",
                        currency: "GBP",
                        percentFee: 100
                    }
            });
            // charge settlement: 127.88
            // charge final: 125.32
            // stripe fee: 3.83

            var appFee = myCharge.applicationFee;
            console.log(new Log.Charge(myCharge).output);
            expect(appFee.final.amount.toString()).toEqual("121.49");

            // conversion case #2
            var myCharge = new Charge.Direct({
                    amount: 0.5,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "GB",
                        currency: "GBP"
                    },
                    platform: {
                        country: "US",
                        currency: "USD",
                        percentFee: 99
                    }
            });
            // charge settlement: 0.64
            // charge final: 0.63
            // stripe fee: 0.22
            // app fee settlement: 0.41
            // app fee settlemented converted: 0.52
            // app fee final: 0.51

            var appFee = myCharge.applicationFee;
            //console.log(new Log.Charge(myCharge).output);
            expect(appFee.final.afterFxFee.amount.toString()).toEqual("0.51");

            // conversion case #2 (but not back)
            var myCharge = new Charge.Direct({
                    amount: 0.5,
                    currency: "USD",
                    customer: {
                        country: "US",
                    },
                    account: {
                        country: "GB",
                        currency: "GBP"
                    },
                    platform: {
                        country: "GB",
                        currency: "GBP",
                        percentFee: 99
                    }
            });
            // charge settlement: 0.64
            // charge final: 0.63
            // stripe fee: 0.22

            var appFee = myCharge.applicationFee;
            console.log(new Log.Charge(myCharge).output);
            expect(appFee.final.amount.toString()).toEqual("0.41");

        });
    });

});