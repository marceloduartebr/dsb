---
title: "CISA adds ten exploited flaws in Mitel MiCollab, Juniper Session Smart, Danfoss and Vates Xen Orchestra to KEV"
description: "On 25 November 2026 CISA added ten CVEs to the KEV catalog based on evidence of active exploitation; five of them affect Mitel MiCollab."
pubDate: 2026-11-26T17:05:00-03:00
sourceName: "CISA"
sourceUrl: "https://cisa.gov/news-events/alerts/2026/11/25/cisa-adds-10-known-exploited-vulnerabilities-catalog"
cover: "https://covers.duarte.top/covers/20261126-cisa-kev-mitel-juniper-danfoss-xen-1307.jpg"
tipo: vulnerabilidades
pais: global
tags: ["cisa", "kev", "mitel", "juniper"]
---

In one line: ten actively exploited flaws enter KEV on the same day, and five of them are in the same collaboration product.

## What happened

On 25 November 2026, CISA added ten vulnerabilities to the KEV catalog based on evidence of active exploitation: CVE-2026-133275, CVE-2026-133303, CVE-2026-133311, CVE-2026-133323 and CVE-2026-133324 (Mitel MiCollab); CVE-2026-103406 (HPE Juniper Session Smart Conductor and Session Smart Router); CVE-2026-133469 (Vates Xen Orchestra); and CVE-2023-25914, CVE-2023-25915 and CVE-2025-41450 (Danfoss AK-SM 800A). In advisory MISA-2026-0012, updated on 24 November, Mitel describes the five flaws in the audio, web and video conferencing (AWV) component of versions 10.3 (10.3.0.18) and earlier; two of them, XML injection and command injection, are rated critical and exploitable without authentication. The vendor says chaining them can widen the impact and points to the fix in article KB000129195 or an upgrade to a later version.

## Why it matters

The KEV catalog confirms exploitation in the wild, not just that the flaw exists. Collaboration systems, routers, virtual machine orchestrators and refrigeration controllers often sit outside the data inventory, yet they are a way into the network and into what it holds.

## Risk reading

Vector | Public evidence | Severity
--- | --- | ---
Active exploitation in a collaboration product | Five MiCollab AWV CVEs in KEV; Mitel rates two as critical and unauthenticated | High
Command injection in Session Smart router | CVE-2026-103406 in the CISA alert | High
Flaws in Xen Orchestra and Danfoss controllers | Three Danfoss CVEs and one Vates CVE in the same KEV batch | High

## What to do this week

1. Check the network for Mitel MiCollab 10.3.0.18 or earlier, Session Smart, Xen Orchestra and Danfoss AK-SM 800A, and their internet exposure (owner: information security / infrastructure).
2. Apply the vendors' published fixes and record the date applied (owner: infrastructure / asset owner).
3. Where the system was exposed, look for signs of compromise before just applying the patch (owner: incident response).
