---
title: "FIFA confirms cyberattack with access to personal and business information"
description: "The organization does not say how many people were affected; the group claiming it talks of 12 GB and identity documents."
pubDate: 2026-11-27T12:35:00-03:00
sourceName: "Metrópoles"
sourceUrl: "https://www.metropoles.com/esportes/fifa-e-alvo-de-ataque-cibernetico-e-confirma-vazamento-de-dados"
cover: "https://covers.duarte.top/covers/20261127-fifa-ciberataque-0805.jpg"
tipo: incidente
pais: global
tags: ["vazamento", "engenharia-social", "documentos-de-identidade", "esporte"]
---

**In one line:** an exposed identity document cannot be changed like a password; notifying people requires knowing where each one was.

## What happened
On 26 November 2026, FIFA confirmed a cyberattack that gave access to personal and business information, without detailing which data was exposed or how many people were affected. In a statement, it said it condemns "the illegal obtaining and disclosure of information, especially personal data". The Handsome Boy Hacking Club group claims the attack, says it accessed internal systems on 19 November and alleges it obtained 12 GB, including identity and immigration documents of executives and financial and legal records; FIFA has not confirmed these claims. According to The New York Times, the attackers impersonated FIFA employees to gain access.

## Why it matters
Identity and immigration documents are long-lived: they cannot be revoked like a credential. Impersonating employees bypasses technical controls and exposes whatever each account can open. Without an inventory of where those documents are, the organization cannot size the impact or notify people.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Social engineering | Attackers impersonated employees (NYT) | High |
| Personal data | FIFA confirms access to personal information | High |
| Identity documents | Claimed by the group, not confirmed by FIFA | High, if confirmed |

## What to do this week
1. Locate repositories, shared mailboxes and folders holding copies of identity documents and passports — owner: privacy/DPO.
2. Review the identity verification flow for access requests and credential resets — owner: service desk and IAM.
3. Sign that it worked: the team can list, per person, where their documents are and who can access them.
