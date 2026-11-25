---
title: "KFC Chile investigates fraud: a former supervisor's still-active credential diverted 51.9 million pesos in severance pay for 73 workers"
description: "A former supervisor's still-active credential let someone swap two payroll files on BCI Empresas and divert the severance pay of 73 workers."
pubDate: 2026-11-25T17:05:00-03:00
sourceName: "BioBioChile"
sourceUrl: "https://www.biobiochile.cl/noticias/economia/negocios-y-empresas/2026/11/23/kfc-se-querella-por-fraude-informatico-desviaron-51-millones-destinados-a-finiquitos-de-trabajadores.shtml"
cover: "https://covers.duarte.top/covers/20261125-kfc-chile-fraude-finiquitos-0813.jpg"
tipo: incidente
pais: cl
tags: ["chile", "fraude", "gestao-de-acessos", "folha-de-pagamento"]
---

In one line: an access that should have been revoked was enough to swap payroll files and divert 51,921,166 pesos.

## What happened
KFC Chile filed a criminal complaint for computer fraud, which the 4th Guarantee Court of Santiago declared admissible. On 28 October 2026, the company uploaded two legitimate payroll files, totaling 51,921,166 pesos, to the BCI Empresas platform to pay the severance of 73 workers. Minutes later, the files were deleted and replaced with fraudulent ones that kept the original names. The operation used the username and password of a former payroll supervisor whose access had not been revoked. The authorized signatories approved the transfers and, the next day, the team noticed the payments had not arrived. KFC paid the severance anyway and asked for the funds still available to be frozen.

## Why it matters
The vector was not a sophisticated technical flaw but a valid credential that survived the employee's departure. Payroll and payment systems concentrate employees' personal and banking data, and human approval does not catch a file swap that preserves the names.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Former employee's credential still active | The former supervisor's username and password used on BCI Empresas | High |
| Payment file swap | Original payroll files deleted and replaced minutes later | High |
| Approval without independent verification | Signatories approved the fraudulent transfers | Medium |

## What to do this week
1. Cross-check the list of people who left in the last 12 months against active users in banking, payroll and HR systems (owner: IAM).
2. Require verification of recipients and amounts through a separate channel before approving payroll (owner: Treasury).
3. Map which personal and banking data each payroll access profile can reach (owner: Data Security).
