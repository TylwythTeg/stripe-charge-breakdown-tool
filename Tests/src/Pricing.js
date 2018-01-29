
var Pricing = (function () {

    function Pricing (pricing, currency){
        var fees = pricing.split(" + ");
        this.currency = currency;
        this.percent = new Decimal(fees[0]);
        this.percentMultiplier = this.percent.times(0.01);
        this.fixed = new Money(fees[1], this.currency);
    }

    Pricing.prototype.toString = function() {
        return this.percent.toString() + " + "
            + this.fixed.toString(); 
    };

    /* Domestic/International pricing model for each country */
    Pricing.Model = (function () {

        function PricingModel(country, pricing) {
            this.currency = pricing.currency;
            this.fxPercent = new Decimal(pricing.fxPercent);
            this.fxMultiplier = this.fxPercent.times(0.01);

            this.domestic = new Pricing(pricing.domestic, pricing.currency);
            this.international = new Pricing(pricing.international, pricing.currency);

            this.european = europeanPricedAccounts.includes(country);
        }

        PricingModel.prototype.toString = function() {
            return JSON.stringify(this);
        };

        PricingModel.from = function(code) {
            return countries[code];
        };

        var europeanPricedAccounts = [
            "AT",
            "BE",
            "DE",
            "DK",
            "FI",
            "FR",
            "IE",
            "LU",
            "NL",
            "ES",
            "SE",
            "GB",
            "IT",
            "PT",
        ];

        var countries = {
            "US": new PricingModel("US",{
                domestic: "2.9 + 0.30",
                international: "3.9 + 0.30",
                fxPercent: 1,
                currency: "USD"
            }),
            "AU": new PricingModel("AU",{
                domestic: "1.75 + 0.30",
                international: "2.9 + 0.30",
                fxPercent: 2,
                currency: "AUD"
            }),
            "AT": new PricingModel("AT", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "BE": new PricingModel("BE", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "BR": new PricingModel("BR", {
                domestic: "3.99 + 0.50",
                international: "3.99 + 0.50",
                fxPercent: 2,
                currency: "BRL"
            }),
            "CA": new PricingModel("CA", {
                domestic: "2.9 + 0.30",
                international: "3.5 + 0.30",
                fxPercent: 2,
                currency: "CAD"
            }),
            "DK": new PricingModel("DK", {
                domestic: "1.4 + 1.80",
                international: "2.9 + 1.80",
                fxPercent: 2,
                currency: "DKK"
            }),
            "FI": new PricingModel("FI", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "FR": new PricingModel("FR", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "DE": new PricingModel("DE", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "HK": new PricingModel("HK", {
                domestic: "3.4 + 2.35",
                international: "3.4 + 2.35",
                fxPercent: 2,
                currency: "HKD"
            }),
            "IE": new PricingModel("IE", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "JP": new PricingModel("JP", {
                domestic: "3.6 + 0",
                international: "3.6 + 0",
                fxPercent: 2,
                currency: "JPY"
            }),
            "LU": new PricingModel("LU", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "NL": new PricingModel("NL", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "NZ": new PricingModel("NZ", {
                domestic: "2.9 + 0.3",
                international: "2.9 + 0.3",
                fxPercent: 2,
                currency: "NZD"
            }),
            "NO": new PricingModel("NO", {
                domestic: "2.4 + 2",
                international: "2.9 + 2",
                fxPercent: 2,
                currency: "NOK"
            }),
            "MX": new PricingModel("MX", {
                domestic: "3.6 + 3",
                international: "3.6 + 3",
                fxPercent: 2,
                currency: "MXN"
            }),
            "SG": new PricingModel("SG", {
                domestic: "3.4 + 0.5",
                international: "3.4 + 0.5",
                fxPercent: 2,
                currency: "SGD"
            }),
            "ES": new PricingModel("ES", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "SE": new PricingModel("SE", {
                domestic: "1.4 + 1.8",
                international: "2.9 + 1.8",
                fxPercent: 2,
                currency: "SEK"
            }),
            "CH": new PricingModel("CH", {
                domestic: "2.9 + 0.30",
                international: "2.9 + 0.30",
                fxPercent: 2,
                currency: "CHF"
            }),
            "GB": new PricingModel("GB", {
                domestic: "1.4 + 0.20",
                international: "2.9 + 0.20",
                fxPercent: 2,
                currency: "GBP"
            }),
            "IT": new PricingModel("IT", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),
            "PT": new PricingModel("PT", {
                domestic: "1.4 + 0.25",
                international: "2.9 + 0.25",
                fxPercent: 2,
                currency: "EUR"
            }),

        };

        return PricingModel;
    })();

    return Pricing;
})();





