---
title: "N-able confirms Mail Assure intrusion and fixes a critical SSRF (CVE-2026-134624)"
description: "A Mail Assure and SpamExperts Hosted Cloud server was accessed; N-able revoked customer tokens and fixed a CVSS 9.3 SSRF found during the investigation."
pubDate: 2026-11-25T08:45:00-03:00
sourceName: "N-able"
sourceUrl: "https://www.n-able.com/blog/mail-assure-incident-update"
cover: "https://covers.duarte.top/covers/20261124-n-able-mail-assure-invasao-0812.jpg"
tipo: incidente
pais: us
tags: ["n-able", "msp", "terceiros", "email"]
---

In one line: an email filtering provider for MSPs was breached and revoked all of its customers' API and OAuth tokens.

## What happened

N-able took the Mail Assure and SpamExperts Hosted Cloud dashboard and APIs offline on 11/16/2026, initially attributing the outage to platform configuration. On 11/18 it confirmed that an unauthorized third party had accessed a hosted server and likely credentials stored on it. The company took the server offline, rotated internal credentials, revoked customer API and OAuth tokens and reset local passwords. During the investigation it found CVE-2026-134624, an SSRF in the LDAP sync connection check (CVSS 4.0 of 9.3, according to the vendor advisory), fixed in build 20261121.1943. Access was restored on 11/21. N-able says it found no evidence that customer data was compromised, did not say whether the flaw was the entry vector and promised a root cause analysis within two weeks.

## Why it matters

Email filtering services sit in the path of many customers' messages at once. The mass token revocation shows the size of the dependency: every integration that breaks is an access someone needs to know about and justify.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| Unauthorized access to a Hosted Cloud server | N-able incident update | High |
| Credentials stored on the server possibly accessed | N-able statement to SecurityWeek | High |
| SSRF to internal hosts (CVE-2026-134624) | Vendor advisory and NVD | Critical |

## What to do this week

1. List the integrations and scripts that used Mail Assure/SpamExperts tokens and reissue only the ones needed, with minimal scope (owner: messaging team).
2. For Local Cloud, confirm build 20261121.1943 or later (owner: infrastructure).
3. Review every third party with token access to corporate email and what each one can read (owner: third-party risk management).
