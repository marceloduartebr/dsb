---
title: "Peninsula Energy halts ASX trading after a cyber incident at the Lance uranium mine in the US"
description: "The incident on the night of Nov 20 breached the operating system of the Lance Project in Wyoming; the company says operations will be temporarily affected and is still assessing the impact."
pubDate: 2026-11-26T12:32:00-03:00
sourceName: "SecurityWeek"
sourceUrl: "https://www.securityweek.com/peninsula-energy-halts-trading-after-cyber-incident-hits-us-uranium-mine/"
cover: "https://covers.duarte.top/covers/20261125-peninsula-energy-incidente-mina-uranio-lance-1708.jpg"
tipo: incidente
pais: us
tags: ["mineracao", "tecnologia-operacional", "infraestrutura-critica", "incidente"]
---
In one line: days after an intrusion into a uranium mine's operating system, the company still cannot say how far it reached.

## What happened

Peninsula Energy, an Australian miner listed on the ASX, requested a trading halt on its shares after a cyber incident at the Lance Project, a uranium mine it owns in Crook County, Wyoming (US). According to the exchange announcement reported by SecurityWeek, the incident occurred on the night of Friday, November 20, 2026, and resulted in a breach of the company's "operating system". The company said it is conducting a preliminary investigation and an assessment of the timing and impact of the incident, which will temporarily affect its operations. Administrative systems in the US and Australia were not affected, according to the company, which did not specify which technical systems were compromised or whether uranium production was interrupted.

## Why it matters

Industrial environments usually separate the administrative network and the operational network by design, but rarely keep an inventory of what crosses that boundary: data, credentials and remote access. Without that map, the company is slow to state the scope, and the uncertainty reaches the market as a trading halt.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| Operating system compromise | ASX announcement cites a breach of the "operating system" | High |
| Impact on operations | Company says operations will be temporarily affected | High |
| Unknown scope | Company did not specify the affected systems | Medium |

## What to do this week

1. Map the connections between the corporate network and the operational network, including third-party remote access (owner: OT security lead).
2. Inventory the credentials and data that move between those networks and remove those with no owner (owner: identity and access team).
3. Rehearse the response to an OT incident with the question "what was within reach?" answered in hours (owner: CISO with operations).
