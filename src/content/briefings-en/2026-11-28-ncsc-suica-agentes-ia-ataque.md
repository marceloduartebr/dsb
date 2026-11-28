---
title: "Switzerland confirms its first AI-agent attacks: four of five intrusions succeeded"
description: "The Swiss NCSC reports attacks run by AI agents against critical infrastructure and businesses, and asks for fixes within 24 hours."
pubDate: 2026-11-28T17:05:00-03:00
sourceName: "NCSC Suíça (BACS)"
sourceUrl: "https://bacs.admin.ch/en/26-ki-agenten-1-en"
cover: "https://covers.duarte.top/covers/20261128-ncsc-suica-agentes-ia-ataque-0803.jpg"
tipo: incidente
pais: eu
tags: ["inteligencia-artificial", "infraestrutura-critica", "suica", "agentes-de-ia"]
---

**In one line:** AI agents shrink the path from an exposed system to an intrusion to hours, and the impact comes down to what was on that system.

## What happened
On November 24, Switzerland's National Cyber Security Centre (NCSC, now BACS) published alert 26-KI-Agenten-1 on the first AI-agent-assisted attacks reported in the country, with critical infrastructure operators in at least two sectors among the victims. In an interview with broadcaster SRF on November 26, director Florian Schütz reported five confirmed cases, four with compromised systems. Three involved critical infrastructure operators, and two of them were breached, with no major disruptions reported. Small and medium-sized businesses are also among the victims. The alert cites ARTEX and CyberStrikeAI as examples of offensive agents available online, without stating they were the tools used, and says the number of such tools has almost doubled since October 2026.

## Why it matters
It is official confirmation, from a European national CERT, that AI agents are already carrying out real intrusions. In the same period, CSIRT Italia and the UK's NCSC issued alerts on similar campaigns. The vector is still the basics (known flaws in exposed systems), but the speed changes the patch deadline and the time available to detect.

## Risk reading
| Vector | Public evidence | Severity |
| --- | --- | --- |
| Automated exploitation of known flaws in exposed systems | NCSC alert and director's interview | High |
| Attack on critical infrastructure | Two operators breached, according to the NCSC | High |
| Access to systems without MFA | Explicit recommendation of MFA or passkeys on webmail and VPN | Medium |
| Anomalous data volume | NCSC recommends monitoring data volumes | Medium |

## What to do this week
1. Inventory internet-facing systems and the sensitive data each one holds or can reach — IT and security.
2. Set a 24-hour deadline for critical fixes on those systems and require MFA on all remote access — CISO.
3. Sign it worked: for each exposed system, the team can name the owner, the patch level and which personal data it accesses.
