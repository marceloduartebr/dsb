---
title: "Rackspace Spot: a leaked credential opened customers' Kubernetes Secrets for almost 22 hours"
description: "The attacker acted as a legitimate user and could read cluster Secrets; rotating the key does not reveal what was reached."
pubDate: 2026-11-22T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/rackspace-spot-breach-let-hackers-access-customer-kubernetes-secrets/"
cover: "https://covers.duarte.top/covers/20261122-rackspace-spot-vazamento-0810.jpg"
tipo: incidente
tags: ["kubernetes", "credenciais", "cloud", "eua"]
pais: us
---

**In one line:** whoever reads a Kubernetes Secret no longer needs the cluster; they already hold the key to the data.

## What happened
On November 17, 2026, between about 00:20 and 22:00 UTC, a third party used leaked credentials to access parts of Rackspace Spot, Rackspace's managed Kubernetes platform. According to a customer notification obtained by BleepingComputer, the attacker acted as a legitimate user in some organizations: created pods, listed nodes and volumes and could read any Kubernetes Secret of the affected users, as well as Spot API and refresh tokens. Rackspace learned of the access on November 18, from a customer's report, revoked tokens and sessions, removed the pods and rotated keys. The console was down for days; the service was fully restored on November 21. The company did not say how many customers were affected or whether data was stolen.

## Why it matters
Secrets hold database passwords, cloud tokens and API keys. The real impact lies in the systems those credentials reach, not in the platform where they were stored. Rackspace itself asked customers to review logs of databases, registries, Git repositories, storage and third-party services since November 17.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Leaked user credentials | Rackspace notification | High |
| Reading of Kubernetes Secrets | Rackspace notification | Critical |
| Later use of the credentials on databases and storage | Log review guidance | High (not confirmed) |

## What to do this week
1. Map each cluster Secret to the data it opens (database, bucket, SaaS) and to that data's classification — owner: platform + data security.
2. Rotate credentials for third-party-managed clusters and review access logs since 11/17 — owner: SRE.
3. Sign that it worked: for any Secret, the team can answer within hours which personal databases it reaches.
