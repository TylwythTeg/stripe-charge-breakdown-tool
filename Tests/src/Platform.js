var Platform = (function() {

    function Platform (country, currency, feePercent) {
        Account.call(this, country, currency);
        this.feePercent = new Decimal(feePercent);
        this.feeMultiplier = this.feePercent.times(0.01);
    }

    Platform.prototype = Object.create(Account.prototype);

    return Platform;

})();