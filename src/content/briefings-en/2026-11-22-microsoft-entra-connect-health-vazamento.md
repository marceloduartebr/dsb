---
title: "Microsoft confirms exploitation of an Entra Connect Health flaw that exposed administrator emails and tenant data"
description: "The access was read-only, but it handed over the map of whom to target with spear phishing."
pubDate: 2026-11-22T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/microsoft-entra-connect-health-flaw-exploited-to-steal-tenant-data/"
cover: "https://covers.duarte.top/covers/20261122-microsoft-entra-connect-health-vazamento-0810.jpg"
tipo: incidente
tags: ["microsoft", "identidade", "phishing", "cloud"]
pais: global
---

**In one line:** tenant metadata looks harmless until it becomes the target list for a spear-phishing campaign.

## What happened
Microsoft notified administrators that a flaw in the Entra Connect Health API, introduced on July 23, 2026 and discovered on November 9, was exploited. Third parties gained read access to the emails of technical contacts and administrator accounts, tenant IDs and names, initial domains, country codes, Entra license tier, directory sync status and an expired certificate. The server-side fix was applied on November 19; the investigation ended on November 20, when notifications began via Azure Service Health. The company says no passwords, hashes, tokens or valid keys were exposed and no configuration was changed, and it did not say how many tenants were affected.

## Why it matters
Microsoft itself recommends warning teams about phishing and social engineering aimed at the exposed emails. An administrator account compromised this way inherits all the data access it already had.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Exposure of administrator emails | Microsoft notification | High |
| Spear phishing against privileged accounts | Microsoft recommendation | High |
| Data access via administrator account | Not confirmed | Medium |

## What to do this week
1. Check in Azure Service Health whether the tenant was notified and review Entra audit and sign-in logs — owner: identity team.
2. Require phishing-resistant MFA on every privileged account and map which sensitive databases each one reaches — owner: security + data.
3. Sign that it worked: an up-to-date list of administrators with the data each one accesses.
