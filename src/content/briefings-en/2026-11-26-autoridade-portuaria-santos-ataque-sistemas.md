---
title: "Port of Santos: APS restores portal and intranet 18 days after the attack without disclosing the scope of the intrusion"
description: "APS had its systems knocked out on 6 November, says there was no leak, but admits it has not determined the scope of the attack."
pubDate: 2026-11-26T17:05:00-03:00
sourceName: "Portos e Navios"
sourceUrl: "https://portosenavios.com.br/noticias/portos-e-logistica/apos-ataque-cibernetico-aps-recupera-sistema-de-protocolo-digital-e-intranet"
cover: "https://covers.duarte.top/covers/20261125-autoridade-portuaria-santos-ataque-sistemas-1220.jpg"
tipo: incidente
pais: br
tags: ["infraestrutura-critica", "portos", "resposta-a-incidentes", "lgpd"]
---

In one line: claiming there was no leak without knowing the scope of the attack is a hope, not a conclusion.

## What happened

The Santos Port Authority (APS), which runs Brazil's largest port, had its systems knocked out by a cyberattack on 6 November 2026. According to g1, on 18 November more than 30 systems were still running on workarounds, the Federal Police was investigating and the company said it had not been possible to determine the scope of the attack, while stating there was no data leak. On 17 November, APS met with about 60 terminal representatives to present the incident timeline.

On 23 November the Supervia Eletrônica came back, the first external system restored. On 24 November, according to Portos e Navios, the Customer and Supplier Portal and the intranet returned. APS says the priority now is to restore the systems still under maintenance and update the data since the incident. Cargo operations, according to the company, were not halted.

## Why it matters

The Port of Santos handles about 30% of Brazil's foreign trade and has 53 terminals. An incident that keeps systems down for nearly three weeks shows the operational cost, but the regulatory side depends on another answer: which personal data of customers, suppliers and employees sat in the affected systems and whether it was accessed. Without determining the scope, there is no way to back the claim that nothing leaked.

## Risk reading

| Vector | Public evidence | Severity |
| --- | --- | --- |
| Prolonged unavailability | Systems down since 6/11, gradual return through 24/11 | High |
| Unknown scope | APS says it has not determined the scope of the attack | High |
| Data integrity | Stated priority is updating the data since the incident | Medium |

## What to do this week

1. Map which systems hold personal data of customers, suppliers and employees and who accesses each one (owner: DPO with the data team).
2. Test whether, in an incident, you can list within hours which data existed in each affected system (owner: CISO).
3. Review the continuity plan for customer- and supplier-facing systems, with defined recovery times (owner: IT manager).
