---
title: "Radware confirms internal Cloud WAF API, exposed without authentication, leaked contacts and log export keys"
description: "Unauthorized access on 11/19 to an internal API with no authentication exposed customer contacts and, for some of them, log export credentials for S3, Azure Blob and SFTP."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/radware-discloses-breach-exposing-customer-cloud-access-keys/"
cover: "https://covers.duarte.top/covers/20261125-radware-api-cloud-waf-chaves-expostas-1708.jpg"
tipo: incidente
pais: global
tags: ["radware", "seguranca-em-nuvem", "risco-de-terceiros", "gestao-de-segredos"]
---

In one line: the most sensitive key in the Radware incident is the one the customer gave the vendor to write logs to its own bucket.

## What happened

According to a Radware root cause report obtained by BleepingComputer and published on November 24, 2026, on November 19 an unauthorized third party accessed an internal Cloud WAF management API that was reachable from the internet without requiring authentication. The company detected the access ten hours later, blocked the source IP and the API, and revoked the internal credentials. The information potentially accessed includes customer contact data and, for some of them, the credentials configured to export logs to their own storage (AWS S3, Azure Blob Storage or SFTP). Radware says traffic inspection, certificates, end-user data and DDoS services were not exposed, and recommended that AppSec customers (WAF and BOT) rotate their export credentials and review access to their storage since 11/19. Customers reported AWS alerts about an unknown IP trying to access their log buckets.

## Why it matters

Keys handed to a vendor to integrate services fall off the radar of whoever owns the storage. Logs often contain personal data and application details; a poorly scoped write key may allow reads. When the vendor is breached, the customer needs to know quickly what that key can reach.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| Internal API exposed without authentication | Radware root cause report | High |
| Customer storage credentials exposed | S3, Azure Blob and SFTP keys for some customers | High |
| Attempts to use the keys | AWS alerts reported by customers | High |

## What to do this week

1. Rotate the log export credentials given to Radware and to other security vendors (owner: cloud team).
2. Inventory the cloud storage keys held by third parties, with the scope of each one (owner: secrets management).
3. Review access logs on the destination buckets since 11/19 and restrict the keys to write-only (owner: SOC).
