---
title: "Argentina's Chamber of Deputies closes systems to the internet and says attacks were contained"
description: "Passwords changed, MFA mandatory and portals on the internal network only, but not a word on which data was exposed."
pubDate: 2026-11-27T12:35:00-03:00
sourceName: "Perfil"
sourceUrl: "https://www.perfil.com/politica/menem-anuncio-el-cierre-preventivo-de-sistemas-de-diputados-ante-el-riesgo-de-ciberataques-con-inteligencia-artificial-a8q177v0yxIG"
cover: "https://covers.duarte.top/covers/20261127-camara-diputados-argentina-ciberataque-0805.jpg"
tipo: incidente
pais: ar
tags: ["ciberataque", "setor-publico", "argentina", "mfa"]
---

**In one line:** when an agency changes every password and closes portals to the internet, "contained" describes the door, not the data.

## What happened
On 26 November 2026, at the opening of the 2027 Budget session, the president of Argentina's Chamber of Deputies, Martín Menem, read the statement "Measures adopted on the Chamber's systems and their grounds". He cited a global escalation of AI-assisted attacks and said the Chamber suffers recurring attempts, especially during sessions of high public interest, which "so far have been contained". Previously public services became accessible only from the internal network, passwords were changed, the second authentication factor became mandatory, with a limit on attempts and automatic lockout, and access monitoring was reinforced. The Chamber's website had been under maintenance since mid-November. Deputy Marcela Pagano filed a criminal complaint against Menem for allegedly concealing an attack; claims of data deletion and of a ransom demand have not been confirmed. The statement does not say whether data was accessed.

## Why it matters
Broad containment measures (a general password change, closing portals) usually indicate that the agency cannot say with confidence what was or was not accessed. Without an inventory of the data behind each exposed system, it is not possible to answer citizens, public employees or the data protection authority.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Internet-exposed systems | Portals taken off the internet and restricted to the internal network | High |
| Credentials | General password change and mandatory MFA | High |
| Personal data | Not disclosed whether there was access | Unknown |

## What to do this week
1. List every internet-exposed system and the personal data stores it reaches — owner: architecture/security.
2. Define the criteria for saying "no data was accessed" (logs, retention, coverage) before you need to say it — owner: privacy/DPO.
3. Sign that it worked: for any portal, the team can answer within an hour which personal data sits behind it.
