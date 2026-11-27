---
title: "Uruguay's state casinos close the Florida and Carmelo halls after a cyberattack from abroad"
description: "The Dirección General de Casinos detected the attack on 21 Nov, isolated the network of every hall and halted part of its administrative operations; it did not say whether data was accessed."
pubDate: 2026-11-27T08:35:00-03:00
sourceName: "El Observador"
sourceUrl: "https://www.elobservador.com.uy/nacional/ciberataque-casinos-del-estado-obligo-cerrar-las-salas-florida-y-carmelo-n6065257"
cover: "https://covers.duarte.top/covers/20261126-casinos-del-estado-uruguai-ciberataque-1709.jpg"
tipo: incidente
pais: uy
tags: ["uruguai", "ciberataque", "setor-publico", "resposta-a-incidentes"]
---

In one line: Uruguay contained an external attack by isolating the state casinos' network, but has not yet said whether personal data was accessed.

## What happened

In a statement released on 26 November 2026, the Dirección General de Casinos (DGC) said that on the afternoon of Saturday 21 November its technical teams detected an alert at the Florida and Carmelo halls, attributed to a cyberattack from abroad. The DGC triggered a preventive protocol that isolated network access at every hall, preventively closed the two affected halls and halted part of its administrative operations. The other halls kept operating autonomously, with minor restrictions. According to the agency, gaming and revenue collection were not affected, and recovery is under way with support from specialist bodies.

## Why it matters

Gaming agencies concentrate data on customers, employees and financial transactions. The statement covers availability only: it does not say which administrative systems were hit or whether personal data was accessed or extracted. Without that map, the impact assessment and any notification remain open.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| External attack on the halls' network | Alert at Florida and Carmelo on 21 Nov, confirmed by the DGC | High |
| Administrative systems halted | DGC halted part of its administrative operations | Medium |
| Exposure of personal data | Not stated in the announcement | To be confirmed |

## What to do this week

1. Map which personal data lives in each administrative system and remote unit (owner: data governance team).
2. Test the per-unit network isolation protocol, measuring time to containment (owner: infrastructure team and SOC).
3. Prepare a scoping playbook that answers "which records were in the affected systems" within 72 hours (owner: DPO).
