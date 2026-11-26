---
title: "Guadeloupe University Hospital goes back to paper after suspected ransomware encrypted databases and halted radiotherapy"
description: "ANSSI is investigating whether the attack on Guadeloupe's largest hospital came in through an IT supplier compromised months earlier."
pubDate: 2026-11-26T12:32:00-03:00
sourceName: "The Record"
sourceUrl: "https://therecord.media/guadeloupe-ransomware-hospital-cyber"
cover: "https://covers.duarte.top/covers/20261125-chu-guadalupe-ransomware-hospital-1220.jpg"
tipo: incidente
pais: eu
tags: ["ransomware", "saude", "risco-de-terceiros", "franca"]
---
In one line: if ANSSI's hypothesis is confirmed, the way in was a supplier with access to the hospital, not the hospital itself.

## What happened

The University Hospital Center (CHU) of Guadeloupe, the largest hospital in the French Caribbean territory, suffered computer and phone failures from the night of Saturday, November 21, 2026. According to The Record, what looked like a technical failure was an attack that encrypted the hospital's databases. On Tuesday the 24th, ANSSI, France's national cybersecurity agency, said the incident appears to involve ransomware and that it is investigating whether the attackers came in through an unidentified IT supplier that may have been compromised months earlier. Prosecutors opened a criminal investigation and the perpetrators have not been identified. Management told local media it had received no ransom demand and ruled out paying.

The hospital cancelled surgeries, appointments and imaging exams at least until Friday, suspended radiotherapy as a precaution and postponed chemotherapy sessions. The emergency department, dialysis and urgent cardiac procedures remain available. On Tuesday, staff still could not access electronic medical records.

## Why it matters

The case combines two risks: health data, which cannot be changed once exposed, and a third party with privileged access that may have been compromised long before the attack. When supplier access does not appear on the same map as the data it reaches, the hospital only learns the scope afterwards.

## Risk reading

| Vector | Public evidence | Severity |
| --- | --- | --- |
| Ransomware | ANSSI says the incident appears to involve ransomware; databases encrypted | High |
| IT supplier | ANSSI is investigating entry through a supplier compromised months earlier | High |
| Continuity of care | Radiotherapy suspended, surgeries and appointments cancelled | High |

## What to do this week

1. List the IT suppliers with remote access and which systems and data each one reaches (owner: CISO with procurement).
2. Review third-party accounts with no recent use or with more privilege than needed and remove the excess (owner: IAM team).
3. Test contingency operation of critical services, with offline access to the minimum patient or customer information (owner: continuity manager).
