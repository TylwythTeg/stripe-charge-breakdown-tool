var Customer = (function() {

    function Customer(country) {
        this.country = country;
        this.european = europeanCustomers.includes(country);
    }

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

    return Customer;
})();