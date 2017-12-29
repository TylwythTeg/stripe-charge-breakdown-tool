var Customer = (function() {
    var europeanCustomers = [
        "AD",
        "AT",
        "BE",
        "BG",
        "HR",
        "CY",
        "CZ",
        "DK",
        "EE",
        "FO",
        "FI",
        "FR",
        "DE",
        "GI",
        "GR",
        "GL",
        "GG",
        "VA",
        "HU",
        "IS",
        "IE",
        "IM",
        "IL",
        "IT",
        "JE",
        "LV",
        "LI",
        "LT",
        "LU",
        "MT",
        "MC",
        "ME",
        "NL",
        "NO",
        "PL",
        "RO",
        "PM",
        "SM",
        "RS",
        "SK",
        "SI",
        "ES",
        "SJ",
        "SE",
        "CH",
        "TR",
        "GB",
        "MK",
        "PT",
    ];
    constructor.prototype.european = function () {
        return europeanCustomers.includes(this.country);
    } 

    function constructor(country) {
        this.country = country;
    }

    return constructor;
})();