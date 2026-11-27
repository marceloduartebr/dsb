---
title: "Bithumb widens internal groupware breach: intruder stayed about 15 days and took even copies of ID documents"
description: "The South Korean exchange's 25 Nov update confirms access to Daou Office from 12 to 27 October and adds data subjects and fields such as resident registration, passport and document copies."
pubDate: 2026-11-27T08:35:00-03:00
sourceName: "Bithumb"
sourceUrl: "https://feed.bithumb.com/notice/1655458"
cover: "https://covers.duarte.top/covers/20261126-bithumb-vazamento-groupware-daou-office-1709.jpg"
tipo: incidente
pais: global
tags: ["coreia-do-sul", "cripto", "vazamento", "shadow-data"]
---

In one line: Bithumb treated its groupware as an internal system, but it held customers' documents and ID numbers.

## What happened

In a notice updated on 25 November 2026, Bithumb said the analysis of the breach in its internal mobile groupware Daou Office, disclosed on 29 October, found more data subjects and more types of data. According to the company, an unauthorized third party accessed the system from 12 October (13:49) to 27 October (15:22) and took personal data and files. Customers, vendor staff and current and former employees were affected; the fields include member number, name, phone, email, date of birth, resident registration number, passport, driver's license, bank account, address, ID document copy, transaction history and wallet address, varying by person. Yonhap reports that the initial notice mentioned about 7,100 customers and employees. Bithumb says the trading platform and the customer database were not directly breached and it has stepped up withdrawal monitoring.

## Why it matters

The case shows sensitive customer data outside production systems, in a collaboration tool. ID numbers and document copies cannot be changed like a password. And widening the scope weeks after the first notice shows the cost of not having a data map by data subject.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| Prolonged access to the groupware | 12 Oct to 27 Oct, confirmed by Bithumb | High |
| Sensitive data outside production | Document copies and ID numbers in the groupware | High |
| Late widening of scope | New data subjects and fields in the 25 Nov update | Medium |

## What to do this week

1. Scan groupware, chat and email for customers' documents and ID numbers (owner: data governance team).
2. Define and enforce a retention policy for attachments with personal data in collaboration tools (owner: DPO).
3. Review anomalous-access alerts on internal SaaS tools, aiming for detection in hours, not weeks (owner: SOC).
