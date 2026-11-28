---
title: "Boston Scientific notifies 117,800 people almost six months after vishing opened access to its cloud"
description: "The access was detected on May 12, but only on November 5 did the company confirm that SSNs, ID documents and medical data were exposed."
pubDate: 2026-11-28T08:32:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/new-boston-scientific-data-breach-exposes-personal-medical-info/"
cover: "https://covers.duarte.top/covers/20261127-boston-scientific-vazamento-2001.jpg"
tipo: incidente
pais: us
tags: ["vazamento", "saude", "engenharia-social", "nuvem", "estados-unidos"]
---

**In one line:** Boston Scientific contained a vishing intrusion in May, but needed almost six months to learn that personal and health data of 117,789 people had been exposed.

## What happened
US medical device maker Boston Scientific has started notifying people affected by a cyberattack on its cloud infrastructure. According to the notification template filed with US authorities, the attacker used vishing (social engineering over the phone) to gain access. The company identified the unauthorized access on May 12, 2026, and the investigation concluded on November 5 that data had been exposed. The Texas attorney general's breach portal lists 117,789 affected people across several states.

The exposed data includes name, address, Social Security number (SSN), government ID number (passport or state ID), medical information, health plan data and date of birth. The company says patient records and data from remote monitoring, connected devices and clinical apps were not exposed, that it contained the incident with outside experts and that it notified the authorities. The notice does not offer free credit monitoring.

It is the company's second incident in 2026. A spokesperson said it is unrelated to the August attack that disrupted part of its global operations.

## Why it matters
The vector was a phone call, not a technical flaw: the control that failed was identity. And the gap between detection (May) and knowing the scope (November) shows the cost of not having a map of which personal data lives in each cloud application. A government ID and health data cannot be changed after a breach.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Vishing against staff to reach the cloud | Notification template filed with authorities | High |
| Exposure of SSNs, ID documents and health data | 117,789 people on the Texas attorney general's portal | High |
| Almost six months between detection and confirmed scope | May 12 and November 5 dates in the notification | Medium |

## What to do this week
1. Review the service desk's password and MFA reset flow for phone requests — owner: IAM.
2. List the cloud applications that store ID documents, health data or national identifiers and who has access to them — owner: privacy and data security.
3. Sign it worked: given a compromised account, the team can say within hours which personal records it could reach.
