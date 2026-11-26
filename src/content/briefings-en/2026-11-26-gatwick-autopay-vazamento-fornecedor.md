---
title: "Gatwick warns customers that a breach of the drop-off supplier's AutoPay exposed personal and payment data"
description: "The AutoPay system, run by ParkPark for Times24 UK, was breached and suspended; the airport does not say how many people were affected or what period the records cover."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "The Register"
sourceUrl: "https://www.theregister.com/security/2026/11/25/gatwick-drop-off-customers-personal-data-exposed-in-supplier-breach/5312060"
cover: "https://covers.duarte.top/covers/20261125-gatwick-autopay-vazamento-fornecedor-1708.jpg"
tipo: incidente
pais: eu
tags: ["gatwick", "risco-de-terceiros", "vazamento", "reino-unido"]
---

In one line: a supplier's supplier exposed Gatwick customer data, and the airport cannot say how many.

## What happened

On November 25, 2026, The Register reported that London Gatwick Airport notified customers of a breach of AutoPay, the service that automatically charges the drop-off zone fee. The system is operated by ParkPark and used by Times24 UK Limited, which manages the airport's drop-off. According to the notice, names, addresses, postcodes, contact details, AutoPay credentials (emails and bcrypt-hashed passwords), data on vehicles linked to accounts, license plates and entry and exit times at Times24 sites may have been exposed. In limited cases, payment records (amounts, card type and expiry, references and transaction IDs) and emails exchanged with customer service were also exposed. Times24 suspended AutoPay when it detected the breach, and the service remains off. Gatwick said it cannot say how many customers were affected or since when the records have been exposed; flights were not affected.

## Why it matters

The brand on the notice is not the company that ran the system. Third-party chains with access to customer data make it hard to answer the basic questions of an incident: what data, how many people, over what period. Without a per-supplier inventory, the answer to the data subject stays generic.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| Third-party system compromise | AutoPay operated by ParkPark for Times24 | High |
| Exposure of personal and location data | Addresses, plates and entry and exit times | High |
| Unknown scope | Gatwick does not disclose number affected or period | Medium |

## What to do this week

1. List the suppliers that store customer data on the company's behalf, including subcontractors (owner: third-party risk management).
2. Require each critical supplier to provide an inventory of the personal data it holds and the retention period (owner: DPO).
3. Prepare a notification template with fields for affected volume and period, so you do not depend on the supplier when an incident hits (owner: legal with security).
