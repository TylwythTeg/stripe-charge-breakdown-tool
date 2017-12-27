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

# Fees

## Stripe Fee

The Stripe Fee is always taken using the pricing of the account's country depending on the domestic or international relationship between the account and the country the customer's card was issued. Generally a percentage of the charge amount on top of a small fixed fee.

## GST

Applies to charges settled in Australia and covered in the sticker price. (10/11) multiplied by stripe fee to find the rounded and floored stripe portion of the fee. These are divided by 10 to find their respective rounded and floored GST portions. If the GST portion that was rounded and the GST portion that was floored is the same, we will use both rounded fees and the total stripe fee is unchanged. However, if they are not the same, we use the floored version of both fees. In this case, if the two fees (the GST and Stripe portion) are lower in sum than the sticker pricing, this lower amount is taken in total.

## VAT

Applies to charges settled in Ireland and is a flat fee of 23% added on top of the sticker price.

# Conversion Fee

Conversion fees can be seen anytime real funds go through the conversion process. When a charge is initially settled in an account's country and their default currency differs from the currency presented and accepted at the time of charge, (assuming no other bank accounts to send to) it is converted to the account's default currency with a conversion fee using the account country's rate. Most countries are 2%, US is 1%.

For Connect charges, there may be an additional conversion fee as the platform receives or maintains its portion.

Direct and Destination:
- Platform's portion is automatically converted to its default currency if no correspdonding bank account is found. This isn't automatic with Destination charges, but since this would take place inevitably when the platform creates or receives an automatic payout for themselves, it's included it in the breakdown.

SCT:
- Charge is created as is and there is no transfer or conversion until future instruction


# Dependencies

- Uses OpenExchangeRates (with Money.js http://openexchangerates.github.io/money.js/) for currency conversion rates https://openexchangerates.org/
- Uses Decimal.js for high accuracy decimal calculations https://github.com/MikeMcl/decimal.js/

# Use Here

https://jsfiddle.net/0gczse8p/122/show/
