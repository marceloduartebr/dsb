---
title: "Banpará blocks Pix fraud on a Sefa account: about 600 transfers and R$ 8.5 million"
description: "A transit account of Pará's State Treasury Department at Banpará was used in a Pix fraud attempt on the night of Nov 23; the bank says it blocked access and recovered the funds."
pubDate: 2026-11-26T12:32:00-03:00
sourceName: "O Liberal"
sourceUrl: "https://www.oliberal.com/belem/fraude-no-banpara-desvia-r-8-5-milhoes-de-conta-do-governo-do-para-1.1197933"
cover: "https://covers.duarte.top/covers/20261125-banpara-fraude-pix-conta-sefa-1708.jpg"
tipo: incidente
pais: br
tags: ["banpara", "pix", "fraude", "setor-publico"]
---
In one line: about 600 Pix transfers left a Pará state government account before anyone linked the account to Sefa.

## What happened

On the night of November 23, 2026, a transit account linked to Pará's State Treasury Department (Sefa) at Banco do Estado do Pará (Banpará) was used in a fraud attempt through Pix transactions. According to testimony from the head of the bank's information security unit to the Civil Police, reported by O Liberal, the initial inquiry found about 600 transfers, totaling roughly R$ 8.5 million, sent to accounts at PicPay and Neon and scattered across 25 financial institutions. The transactions were blocked once it was identified that the account belonged to Sefa, and the bank filed disputes through Pix's special refund mechanism in the early hours of Nov 24. The testimony mentions suspected improper access to privileged information.

In an official statement published on November 24 by Agência Pará, Banpará said its security system identified the suspicious activity, blocked access and enabled the recovery of the funds, and that the case was reported to the Central Bank and the authorities. The bank's statement does not give the amount moved.

## Why it matters

The block only came after hundreds of transfers. The account moved public money, but that information was not available to the controls at the moment the transactions happened. Knowing which accounts, data and credentials are critical, and who can operate them, is what shortens the window between the first transaction and the response.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| Misuse of access to an institutional account | Testimony mentions suspected improper access to privileged information | High |
| Scattering via Pix | About 600 transfers to 25 institutions | High |
| Late detection of a critical account | Block after identifying the account belonged to Sefa | Medium |

## What to do this week

1. List the accounts and systems that move critical funds and tag each one with an owner and a criticality level (owner: CISO with the finance team).
2. Review who has operational access to those accounts and remove credentials with no recent use (owner: identity and access team).
3. Set volume limits and alerts per critical account, triggered within minutes rather than after hundreds of transactions (owner: fraud prevention team).
