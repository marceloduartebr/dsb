---
title: "Cleverbridge confirms a third party copied payment card data on its platform"
description: "The processor detected the access on November 4 and began notifying those affected on November 20; the public notice does not say how many were hit."
pubDate: 2026-11-23T08:45:00-03:00
sourceName: "Cleverbridge"
sourceUrl: "https://grow.cleverbridge.com/incident-update"
cover: "https://covers.duarte.top/covers/20261123-cleverbridge-cartoes-0813.jpg"
tipo: incidente
tags: ["pagamento", "cartao", "vazamento", "europa"]
pais: eu
---

**In one line:** a software payment processor had card data copied; the CVV, if it was stored, should not have been there after authorization.

## What happened
On November 4, 2026, Cleverbridge, a Germany-based e-commerce processor, detected unauthorized activity on its platform, took systems offline to contain the incident and brought them back the same day. The subsequent investigation concluded that a third party copied payment card data stored on the platform. The company says it was not ransomware and that no systems were encrypted. It began notifying affected individuals on November 20. The official page does not list which card fields were copied or how many people were affected. A customer notification, cited by BleepingComputer, lists card number, expiration date and security code (CVV/CVC), and states that name, contact and billing details were not copied. Cleverbridge says it has informed data protection authorities, police, card brands and payment partners, and is offering credit monitoring through TransUnion/Cyberscout. It has not disclosed the entry point or how long the attacker remained in the environment.

## Why it matters
The CVV is sensitive authentication data. Payment standards require that it not be retained after the transaction is authorized. If the customer notice includes that code, the problem is not just the intrusion: it is the data still kept by a processor that handles purchases for many software vendors.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Unauthorized activity on the platform on 11/4 | Cleverbridge official page | High |
| Copying of payment card data | Cleverbridge official page | Critical |
| Number, expiration date and CVV included | Customer notification cited by BleepingComputer | Critical |

## What to do this week
1. Identify which of the company's products, subscriptions and stores go through Cleverbridge and which customers were or may have been notified — owner: finance + privacy.
2. Advise those affected to check their statements, contact their card issuer and be wary of messages asking for a new CVV or card details — owner: customer service.
3. Sign that it worked: the company knows which transactions used this processor and can match the vendor's notice against its customer base in hours, not weeks.
