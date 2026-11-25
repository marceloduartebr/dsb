---
title: "KEPCO confirms breach that exposed data of 1.5 million customers, suppliers and employees"
description: "The South Korean state power company only learned of the theft from the attacker's own email, and its billing database held card and bank account data."
pubDate: 2026-11-25T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/south-koreas-power-giant-kepco-confirms-data-breach-impacting-15-million/"
cover: "https://covers.duarte.top/covers/20261124-kepco-vazamento-0812.jpg"
tipo: incidente
pais: global
tags: ["vazamento", "infraestrutura-critica", "coreia-do-sul", "dados-de-pagamento"]
---

**In one line:** KEPCO broke down the damage by group in three days, but it was the attacker who told the company.

## What happened
Korea Electric Power Corporation (KEPCO) confirmed that an attacker got into its internal network and accessed the KEPCO ON billing platform and the electronic procurement system (SRM). On November 19, 2026, the company received an email from a hacker claiming to have stolen the data, according to the country's data protection authority (PIPC). An actor using the handle "Noiem" announced the attack on a forum, but authorship has not been confirmed. KEPCO confirmed the access on November 20, blocked external IPs, suspended the affected services and, on November 22, released the numbers:

- 650,487 KEPCO ON customers: name, identification data, phone, address, bank and account number, account holder, card issuer and number, and billing data.
- 426,827 company representatives: name, identification data, email and business address.
- 442,934 employees: name, department, employee number, phones and email.

The company attributed the attack to "advanced technologies such as AI" and did not describe how the attacker got in.

## Why it matters
A critical infrastructure operator kept card and bank account data in the same billing system as its customer records. The alert did not come from the company's monitoring but from the attacker. Breaking down the data by group is the minimum needed to notify each data subject, but it does not say how long the data had been leaving.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Access to the internal network and two business systems | KEPCO confirmation on 11/20 | High |
| Card and bank account data in billing | Data list released on 11/22 | High |
| Detection through the attacker's email | PIPC note on the 11/19 email | High |
| Use of AI in the attack | KEPCO statement, no technical details | Medium |

## What to do this week
1. List the billing and procurement systems that store payment data and check whether they need to store it — owner: data architecture.
2. Map which databases mix customers, suppliers and employees and who accesses each one — owner: information security with the DPO.
3. Sign that it worked: in a tabletop exercise, the team can say within hours which records and data subjects are in each system, without waiting for a third party to tell them.
