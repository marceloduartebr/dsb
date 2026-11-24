---
title: "Azure API Management Classic flaw was exploited to steal customer secrets"
description: "NSM and Microsoft confirm exploitation of a vulnerability in APIM Classic; Equinor and Skagerak Energi are among those affected, and the fix does not invalidate credentials already exposed."
pubDate: 2026-11-24T08:50:00-03:00
sourceName: "NSM (Nasjonal sikkerhetsmyndighet)"
sourceUrl: "https://nsm.no/aktuelt/nsm-deler-tiltak-mot-sarbarhet-i-azure-api-management"
cover: "https://covers.duarte.top/covers/20261124-microsoft-azure-api-management-segredos-0812.jpg"
tipo: vulnerabilidades
tags: ["microsoft", "azure", "segredos", "nuvem"]
pais: global
---

In one line: Microsoft closed the access on 11/19, but secrets stored in APIM Classic before then must be changed by the customer.

## What happened

NSM, Norway's national security authority, said an unknown actor actively exploited a vulnerability in Azure API Management Classic to obtain tokens, secrets and named values, hitting several Norwegian organizations, including Equinor and Skagerak Energi. In a Service Health notice sent to customers (reported by BleepingComputer and The Record on 11/23/2026), Microsoft said it identified the problem on 11/18 and blocked the unauthorized access path to the management plane on 11/19. Exposed items may include secrets in Named Values, identity provider and OpenID Connect client secrets, subscription keys and management API tokens. The APIM v2 tiers were not affected. Microsoft warns that the fix does not invalidate credentials accessed before it.

## Why it matters

API gateways concentrate keys that open backends and databases. The exposure does not end with the patch: every leaked secret keeps opening what it opened until it is rotated, and only those who know what each one reaches can prioritize.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| Unauthorized access to the APIM Classic management plane | Microsoft notice and NSM statement | Critical |
| Theft of secrets, subscription keys and tokens | Microsoft notice and Equinor/Skagerak cases | Critical |
| Later access to backends with stolen credentials | Microsoft warning on credentials not invalidated | High |

## What to do this week

1. Inventory APIM Classic instances and rotate all secrets, subscription keys and client secrets stored in them (owner: cloud platform team).
2. Map which backends and databases each gateway secret reaches and review access logs since early November (owner: SOC).
3. Move secrets stored directly in APIM to a dedicated vault and evaluate migrating to the v2 tiers (owner: cloud architecture).
