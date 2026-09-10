---
brand: Raselio
source: Shopify Admin (orders, customers)
pulled_on: 2026-09-06
tool: mcp__Shopify__list-orders, mcp__Shopify__list-customers
claim_status: verified   # direct observation from the tool
window: all-time as of 2026-09-06 (store's first order 2026-08-26; requested first 50, store has 11 orders and 14 customer records)
notes: Personal data minimised — first name + last initial only, email domain only. Order email domains are taken by matching the order's customer to the customers list (same first/last name). `list-orders` reported totalCount 11 / requestedCount 50, so all orders are included. All 11 orders are 1 line item, financialStatus PAID, currency EUR. Two customer records have null first/last name.
---

# 1. Orders (`list-orders`, first 50)

totalCount: 11 · requestedCount: 50

| order | createdAt (UTC) | totalPrice | currency | financialStatus | fulfillmentStatus | lineItemCount | customer | email domain |
|---|---|---|---|---|---|---|---|---|
| #1011 | 2026-09-04T14:11:47Z | 34.99 | EUR | PAID | UNFULFILLED | 1 | Philippe M. | gmail.com |
| #1010 | 2026-09-04T05:53:13Z | 34.99 | EUR | PAID | UNFULFILLED | 1 | Denis C. | bbox.fr |
| #1009 | 2026-09-03T08:58:58Z | 34.99 | EUR | PAID | FULFILLED | 1 | Jamin M. | yahoo.com |
| #1008 | 2026-09-02T20:48:40Z | 34.99 | EUR | PAID | FULFILLED | 1 | Michel M. | hotmail.com |
| #1007 | 2026-09-01T09:07:42Z | 34.99 | EUR | PAID | FULFILLED | 1 | Hervé F. | live.fr |
| #1006 | 2026-08-30T11:29:00Z | 34.99 | EUR | PAID | FULFILLED | 1 | Jean Luc V. | gmail.com |
| #1005 | 2026-08-30T07:20:50Z | 34.99 | EUR | PAID | FULFILLED | 1 | De Oliveira A. | dstp-france.com |
| #1004 | 2026-08-28T05:23:35Z | 34.99 | EUR | PAID | FULFILLED | 1 | W B. | orange.fr |
| #1003 | 2026-08-27T19:33:55Z | 34.99 | EUR | PAID | FULFILLED | 1 | Olivier D. | live.fr |
| #1002 | 2026-08-26T19:33:26Z | 34.99 | EUR | PAID | FULFILLED | 1 | Yannick V. | gmail.com |
| #1001 | 2026-08-26T10:59:55Z | 39.9 | EUR | PAID | FULFILLED | 1 | Daniel G. | gmail.com |

Order GIDs (for reference): #1011 gid://shopify/Order/13163896602955 · #1010 13162256793931 · #1009 13158574195019 · #1008 13156124426571 · #1007 13148199190859 · #1006 13141971042635 · #1005 13141152137547 · #1004 13130430185803 · #1003 13129825386827 · #1002 13126454935883 · #1001 13123532620107

# 2. Customers (`list-customers`, first 50, no query)

14 records returned.

| customer | email domain | phone | createdAt (UTC) | ordersCount | totalSpent | currency |
|---|---|---|---|---|---|---|
| Philippe M. | gmail.com | null | 2026-09-04T14:11:45Z | 1 | 34.99 | EUR |
| Jean François V. | gmail.com | null | 2026-09-04T06:55:33Z | 0 | 0.0 | EUR |
| Denis C. | bbox.fr | null | 2026-09-04T05:53:12Z | 1 | 34.99 | EUR |
| Jamin M. | yahoo.com | null | 2026-09-03T08:58:56Z | 1 | 34.99 | EUR |
| Michel M. | hotmail.com | null | 2026-09-02T20:48:39Z | 1 | 34.99 | EUR |
| Hervé F. | live.fr | null | 2026-09-01T09:07:41Z | 1 | 34.99 | EUR |
| Jean Luc V. | gmail.com | null | 2026-08-30T11:28:59Z | 1 | 34.99 | EUR |
| De Oliveira A. | dstp-france.com | null | 2026-08-30T07:20:48Z | 1 | 34.99 | EUR |
| (firstName null, lastName null) | sfr.fr | null | 2026-08-28T11:55:34Z | 0 | 0.0 | EUR |
| W B. | orange.fr | null | 2026-08-28T05:19:27Z | 1 | 34.99 | EUR |
| Olivier D. | live.fr | null | 2026-08-27T19:33:55Z | 1 | 34.99 | EUR |
| Yannick V. | gmail.com | null | 2026-08-26T19:33:26Z | 1 | 34.99 | EUR |
| Daniel G. | gmail.com | null | 2026-08-26T10:59:54Z | 1 | 39.9 | EUR |
| (firstName null, lastName null) — store owner's business address | gmail.com | null | 2026-07-23T02:32:20Z | 0 | 0.0 | EUR |

Customer GIDs (same order as table): 26691558768971, 26689432715595, 26689194197323, 26682140721483, 26676889420107, 26661776261451, 26641544675659, 26639480652107, 26620244558155, 26617985696075, 26615049453899, 26601638723915, 26597207015755, 26420208107851.
