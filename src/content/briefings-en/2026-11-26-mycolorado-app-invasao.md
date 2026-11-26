---
title: "myColorado: a week later, Colorado still doesn't know whether it was 50,000 or 150,000"
description: "The intrusion took the state's digital ID app offline, and the estimate of those affected still varies by a factor of three."
pubDate: 2026-11-26T17:05:00-03:00
sourceName: "The Record"
sourceUrl: "https://therecord.media/mycolorado-app-down-data-breach"
cover: "https://covers.duarte.top/covers/20261125-mycolorado-app-invasao-0813.jpg"
tipo: incidente
pais: us
tags: ["vazamento", "governo", "identidade-digital", "estados-unidos"]
---

**In one line:** when the estimate of those affected ranges from 50,000 to 150,000, the gap is not about the attacker, it is about the inventory.

## What happened
The Colorado Governor's Office of Information Technology (OIT) detected, on the night of 18 November 2026, unauthorized access to the platform of myColorado, the state's app for digital ID, mobile driver's license and access to public services, with about 2.1 million users. The app was shut down and, on 24 November, was still offline with no return date. The state estimates that data of 50,000 to 150,000 people may have been affected, has not said which types of data were accessed and says it will notify those affected at the end of the investigation. Residents were told to carry physical documents when traveling over the holiday and to use state agency websites.

## Why it matters
Digital ID apps concentrate data that cannot be changed after a leak, such as document and driver's license numbers. And the delay in saying who was affected postpones notification, just when social engineering scams feed on the news.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Unauthorized access to the app platform | Confirmed by OIT on 18/11 | High |
| Unknown data scope | Range of 50,000 to 150,000 people, types not disclosed | High |
| Unavailability of an identity service | App offline for almost a week | Medium |

## What to do this week
1. Map which repositories linked to customer apps store identity documents and who accesses each one — owner: data and privacy team.
2. Test whether you can list, within 72 hours, the data subjects and fields reachable by a compromised service credential — owner: security and legal.
3. Sign that it worked: the estimate of those affected in an exercise comes out as a number, not a range.
