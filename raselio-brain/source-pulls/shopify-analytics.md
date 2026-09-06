---
brand: Raselio
source: Shopify Analytics (ShopifyQL)
pulled_on: 2026-09-06
tool: mcp__Shopify__run-analytics-query
claim_status: verified   # direct observation from the tool
window: SINCE -60d UNTIL today (2026-07-08 → 2026-09-06) for timeseries; SINCE -90d UNTIL today for grouped queries
notes: All 8 queries validated and returned rows; none failed. Empty string cells are returned by Shopify as "" (e.g. average_order_value / conversion_rate on days with no orders/sessions). conversion_rate and returning_customer_rate are returned as decimal fractions (PERCENT dataType), e.g. 0.0125 = 1.25%. Shop domain in every response: 8piiys-jj.myshopify.com. Money values in EUR.
---

# Q1. Sales timeseries (60d)

`FROM sales SHOW orders, gross_sales, discounts, sales_reversals, net_sales, total_sales, average_order_value TIMESERIES day SINCE -60d UNTIL today`

rowCount: 61 · summaryMetric gross_sales = 377.32

| day | orders | gross_sales | discounts | sales_reversals | net_sales | total_sales | average_order_value |
|---|---|---|---|---|---|---|---|
| 2026-07-08 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-09 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-10 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-11 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-12 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-13 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-14 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-15 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-16 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-17 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-18 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-19 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-20 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-21 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-22 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-23 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-24 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-25 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-26 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-27 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-28 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-29 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-30 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-07-31 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-01 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-02 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-03 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-04 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-05 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-06 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-07 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-08 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-09 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-10 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-11 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-12 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-13 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-14 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-15 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-16 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-17 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-18 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-19 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-20 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-21 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-22 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-23 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-24 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-25 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-26 | 2 | 62.41 | 0 | 0 | 62.41 | 74.89 | 31.205 |
| 2026-08-27 | 1 | 34.99 | 0 | 0 | 34.99 | 34.99 | 34.99 |
| 2026-08-28 | 1 | 34.99 | 0 | 0 | 34.99 | 34.99 | 34.99 |
| 2026-08-29 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-08-30 | 2 | 69.98 | 0 | 0 | 69.98 | 69.98 | 34.99 |
| 2026-08-31 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-09-01 | 1 | 34.99 | 0 | 0 | 34.99 | 34.99 | 34.99 |
| 2026-09-02 | 1 | 34.99 | 0 | 0 | 34.99 | 34.99 | 34.99 |
| 2026-09-03 | 1 | 34.99 | 0 | 0 | 34.99 | 34.99 | 34.99 |
| 2026-09-04 | 2 | 69.98 | 0 | 0 | 69.98 | 69.98 | 34.99 |
| 2026-09-05 | 0 | 0 | 0 | 0 | 0 | 0 | "" |
| 2026-09-06 | 0 | 0 | 0 | 0 | 0 | 0 | "" |

# Q2. Sessions & conversion funnel timeseries (60d)

`FROM sessions SHOW sessions, sessions_with_cart_additions, sessions_that_reached_checkout, sessions_that_completed_checkout, conversion_rate TIMESERIES day SINCE -60d UNTIL today`

rowCount: 61 · summaryMetric sessions = 2,431

| day | sessions | sessions_with_cart_additions | sessions_that_reached_checkout | sessions_that_completed_checkout | conversion_rate |
|---|---|---|---|---|---|
| 2026-07-08 | 0 | 0 | 0 | 0 | "" |
| 2026-07-09 | 0 | 0 | 0 | 0 | "" |
| 2026-07-10 | 0 | 0 | 0 | 0 | "" |
| 2026-07-11 | 0 | 0 | 0 | 0 | "" |
| 2026-07-12 | 0 | 0 | 0 | 0 | "" |
| 2026-07-13 | 0 | 0 | 0 | 0 | "" |
| 2026-07-14 | 0 | 0 | 0 | 0 | "" |
| 2026-07-15 | 0 | 0 | 0 | 0 | "" |
| 2026-07-16 | 0 | 0 | 0 | 0 | "" |
| 2026-07-17 | 0 | 0 | 0 | 0 | "" |
| 2026-07-18 | 0 | 0 | 0 | 0 | "" |
| 2026-07-19 | 0 | 0 | 0 | 0 | "" |
| 2026-07-20 | 0 | 0 | 0 | 0 | "" |
| 2026-07-21 | 0 | 0 | 0 | 0 | "" |
| 2026-07-22 | 0 | 0 | 0 | 0 | "" |
| 2026-07-23 | 54 | 0 | 0 | 0 | 0.0 |
| 2026-07-24 | 92 | 1 | 0 | 0 | 0.0 |
| 2026-07-25 | 139 | 1 | 1 | 0 | 0.0 |
| 2026-07-26 | 21 | 0 | 0 | 0 | 0.0 |
| 2026-07-27 | 52 | 0 | 0 | 0 | 0.0 |
| 2026-07-28 | 15 | 1 | 1 | 0 | 0.0 |
| 2026-07-29 | 40 | 0 | 0 | 0 | 0.0 |
| 2026-07-30 | 9 | 0 | 0 | 0 | 0.0 |
| 2026-07-31 | 6 | 0 | 0 | 0 | 0.0 |
| 2026-08-01 | 2 | 0 | 0 | 0 | 0.0 |
| 2026-08-02 | 2 | 0 | 0 | 0 | 0.0 |
| 2026-08-03 | 3 | 0 | 0 | 0 | 0.0 |
| 2026-08-04 | 7 | 0 | 0 | 0 | 0.0 |
| 2026-08-05 | 1 | 0 | 0 | 0 | 0.0 |
| 2026-08-06 | 7 | 0 | 0 | 0 | 0.0 |
| 2026-08-07 | 2 | 0 | 0 | 0 | 0.0 |
| 2026-08-08 | 3 | 0 | 0 | 0 | 0.0 |
| 2026-08-09 | 8 | 0 | 0 | 0 | 0.0 |
| 2026-08-10 | 69 | 0 | 0 | 0 | 0.0 |
| 2026-08-11 | 99 | 0 | 0 | 0 | 0.0 |
| 2026-08-12 | 127 | 0 | 0 | 0 | 0.0 |
| 2026-08-13 | 82 | 0 | 0 | 0 | 0.0 |
| 2026-08-14 | 23 | 0 | 0 | 0 | 0.0 |
| 2026-08-15 | 77 | 2 | 0 | 0 | 0.0 |
| 2026-08-16 | 40 | 0 | 0 | 0 | 0.0 |
| 2026-08-17 | 101 | 1 | 1 | 0 | 0.0 |
| 2026-08-18 | 2 | 1 | 1 | 0 | 0.0 |
| 2026-08-19 | 38 | 1 | 1 | 0 | 0.0 |
| 2026-08-20 | 3 | 0 | 0 | 0 | 0.0 |
| 2026-08-21 | 49 | 0 | 0 | 0 | 0.0 |
| 2026-08-22 | 11 | 0 | 0 | 0 | 0.0 |
| 2026-08-23 | 36 | 0 | 0 | 0 | 0.0 |
| 2026-08-24 | 39 | 0 | 0 | 0 | 0.0 |
| 2026-08-25 | 34 | 0 | 0 | 0 | 0.0 |
| 2026-08-26 | 80 | 3 | 2 | 1 | 0.0125 |
| 2026-08-27 | 89 | 3 | 0 | 0 | 0.0 |
| 2026-08-28 | 53 | 2 | 2 | 1 | 0.018867924528301886 |
| 2026-08-29 | 62 | 7 | 2 | 0 | 0.0 |
| 2026-08-30 | 113 | 2 | 1 | 1 | 0.008849557522123894 |
| 2026-08-31 | 54 | 2 | 1 | 0 | 0.0 |
| 2026-09-01 | 62 | 2 | 1 | 0 | 0.0 |
| 2026-09-02 | 131 | 2 | 0 | 0 | 0.0 |
| 2026-09-03 | 213 | 2 | 0 | 0 | 0.0 |
| 2026-09-04 | 167 | 5 | 2 | 0 | 0.0 |
| 2026-09-05 | 110 | 4 | 3 | 0 | 0.0 |
| 2026-09-06 | 4 | 0 | 0 | 0 | 0.0 |

# Q3. Sessions by referrer (90d)

`FROM sessions SHOW sessions, conversion_rate GROUP BY referrer_source, referrer_name SINCE -90d UNTIL today ORDER BY sessions DESC LIMIT 30`

rowCount: 7 · summaryMetric sessions = 2,431

| referrer_source | referrer_name | sessions | conversion_rate |
|---|---|---|---|
| direct | "" | 1300 | 0.0 |
| social | facebook | 923 | 0.0032502708559046588 |
| social | instagram | 181 | 0.0 |
| search | google | 24 | 0.0 |
| search | baidu | 1 | 0.0 |
| unknown | collider | 1 | 0.0 |
| search | bing | 1 | 0.0 |

# Q4. Sessions by device type and country (90d)

`FROM sessions SHOW sessions GROUP BY session_device_type, session_country SINCE -90d UNTIL today ORDER BY sessions DESC LIMIT 30`

rowCount: 30 (LIMIT reached) · summaryMetric sessions = 2,404

| session_device_type | session_country | sessions |
|---|---|---|
| desktop | United States | 989 |
| mobile | France | 791 |
| mobile | United States | 265 |
| desktop | France | 119 |
| tablet | France | 37 |
| mobile | Sweden | 37 |
| other | United States | 28 |
| mobile | Ireland | 23 |
| mobile | United Kingdom | 17 |
| other | Ireland | 11 |
| other | Sweden | 11 |
| mobile | Afghanistan | 7 |
| desktop | Indonesia | 6 |
| desktop | Germany | 6 |
| mobile | Canada | 6 |
| desktop | Canada | 6 |
| desktop | Hong Kong | 5 |
| desktop | Sweden | 5 |
| other | United Kingdom | 4 |
| desktop | Ireland | 4 |
| mobile | Netherlands | 4 |
| desktop | Philippines | 4 |
| mobile | United Arab Emirates | 3 |
| mobile | Italy | 3 |
| desktop | United Kingdom | 3 |
| mobile | Portugal | 2 |
| desktop | Netherlands | 2 |
| mobile | Tunisia | 2 |
| desktop | Russia | 2 |
| mobile | Morocco | 2 |

# Q5. Sessions by landing page path (90d)

`FROM sessions SHOW sessions GROUP BY landing_page_path SINCE -90d UNTIL today ORDER BY sessions DESC LIMIT 30`

Field `landing_page_path` validated on first try. rowCount: 30 (LIMIT reached) · summaryMetric sessions = 2,417

| landing_page_path | sessions |
|---|---|
| / | 1171 |
| /products/raselio-tondeuse-parties-intimes | 363 |
| /pages/7-raisons | 312 |
| /pages/pourquoi-pas-votre-tondeuse-a-barbe | 195 |
| /products/cutlab-essentials-bundle | 97 |
| /password | 92 |
| /en/products/raselio-tondeuse-parties-intimes | 33 |
| /en/pages/7-raisons | 29 |
| /en | 23 |
| /en/pages/pourquoi-pas-votre-tondeuse-a-barbe | 20 |
| /en/products/cutlab-essentials-bundle | 9 |
| /products/raselio-tondeuse-zones-intimes-corp | 7 |
| /pages/notre-histoire | 6 |
| /policies/contact-information | 6 |
| /pages/contact | 5 |
| /collections/all | 5 |
| /en/policies/refund-policy | 4 |
| /en/products/raselio-tondeuse-zones-intimes-corp | 4 |
| /en/policies/terms-of-sale | 3 |
| /en/policies/terms-of-service | 3 |
| /en/policies/contact-information | 3 |
| /cart | 3 |
| /en/policies/shipping-policy | 3 |
| /policies/terms-of-service | 3 |
| /en/policies/privacy-policy | 3 |
| /en/policies/legal-notice | 3 |
| /en/pages/notre-histoire | 3 |
| /en/collections/all | 3 |
| /en/pages/contact | 3 |
| /en/apps/trackingmore | 3 |

# Q6. Orders by order referrer (90d)

`FROM sales SHOW orders, total_sales GROUP BY order_referrer_source, order_referrer_name SINCE -90d UNTIL today`

rowCount: 3 · summaryMetric orders = 11

| order_referrer_source | order_referrer_name | orders | total_sales |
|---|---|---|---|
| social | facebook | 8 | 284.83 |
| social | instagram | 2 | 69.98 |
| "" | "" | 1 | 34.99 |

# Q7. New vs returning customers (90d)

`FROM sales SHOW new_customers, returning_customers, returning_customer_rate SINCE -90d UNTIL today`

rowCount: 1

| new_customers | returning_customers | returning_customer_rate |
|---|---|---|
| 11 | 0 | 0.0 |

# Q8. Orders by billing country (90d)

`FROM sales SHOW orders, gross_sales GROUP BY billing_country SINCE -90d UNTIL today`

Field `billing_country` validated. rowCount: 1

| billing_country | orders | gross_sales |
|---|---|---|
| France | 11 | 377.32 |
