# Stripe Charge Breakdown Tool

A tool that is based on Stripe Documentation and API behavior, breaking down the following charges to illustrate their flow of funds:

- Standard (non-Connect)
- Direct
- Destination
- Separate Charges and Transfers
 

## Standard Charge

A charge is created and settled on the Stripe account. If the presentment currency and the default currency of the connected account do not match, the currency is converted and a conversion fee is taken at the account's country's conversion percentage fee. Stripe's transaction fee is then taken.


# Connect Charges

Charges are settled in the Connected Account's country in their default currency. Stripe's fee is assessed based on the relationship between the connected account's country and the country of the customer's card. If they are the same (or the connected account has European pricing and the customer is in a European country), the domestic pricing of the Connected Account is used. Otherwise, its international pricing is applied.

## Direct

The Stripe fee is taken on the final settled charge amount after any conversion fees are taken. The application fee amount is sent to the platform in the currency of the charge's settlement. If the platform's default currency differs, conversion will take place with the platform's country's conversion percentage fee.

## Destination

The final charge amount, minus the application fee, is sent to the Connected account. The Stripe fee is taken from the platform's portion. Actual Stripe behavior means that the platform's portion is unconverted, but conversion will most likely need to take place invevitably, so for the purposes of the tool, included is what this conversion would look like if it took place immediately.

## SCT

Essentially a Standard charge that, like Destination charges, won't be converted for the platform until bank payout time. Using `on_behalf_of` settles the charge using the currency of the connected account and uses the connected account's pricing just as in Direct and Destination charges. However, whether domestic or international pricing is used depends on the relationship between the customer's country and the platform's country, not the customer's and the connected account's.

Since the disbursement of separate charges and transfers is variable and relies on future action from the platform, this pricing quirk is largely what earns its place in the breakdown tool.


# Dependencies

- Uses OpenExchangeRates (with Money.js http://openexchangerates.github.io/money.js/) for currency conversion rates https://openexchangerates.org/
- Uses Decimal.js for high accuracy decimal calculations https://github.com/MikeMcl/decimal.js/

# Use Here

https://jsfiddle.net/0gczse8p/58/show
