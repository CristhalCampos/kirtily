const product_id = "PROD-XXXXXX";
const currency = "USD";
const plans = [
  {
    name: "Premium Monthly Plan",
    description: "7-day free trial, then $5/month. Renew manually.",
    billing_cycles: [
      {
        frequency: {
          interval_unit: "DAY",
          interval_count: 1,
        },
        tenure_type: "TRIAL",
        sequence: 1,
        total_cycles: 7,
        pricing_scheme: {
          fixed_price: {
            value: "0",
            currency_code: currency,
          },
        },
      },
      {
        frequency: {
          interval_unit: "MONTH",
          interval_count: 1,
        },
        tenure_type: "REGULAR",
        sequence: 2,
        total_cycles: 1,
        pricing_scheme: {
          fixed_price: {
            value: "5",
            currency_code: currency,
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: false,
    },
    product_id,
  },
  {
    name: "Premium Yearly Plan",
    description: "7-day free trial, then $48/year. Renew manually.",
    billing_cycles: [
      {
        frequency: {
          interval_unit: "DAY",
          interval_count: 1,
        },
        tenure_type: "TRIAL",
        sequence: 1,
        total_cycles: 7,
        pricing_scheme: {
          fixed_price: {
            value: "0",
            currency_code: currency,
          },
        },
      },
      {
        frequency: {
          interval_unit: "YEAR",
          interval_count: 1,
        },
        tenure_type: "REGULAR",
        sequence: 2,
        total_cycles: 1,
        pricing_scheme: {
          fixed_price: {
            value: "48",
            currency_code: currency,
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: false,
    },
    product_id,
  },
];

export { plans }