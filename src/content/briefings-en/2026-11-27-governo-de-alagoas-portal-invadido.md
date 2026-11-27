---
title: "Alagoas state government: intruder used a valid administrator password and the portal was down for six days"
description: "Itec confirms the alagoas.al.gov.br portal was breached on 19 November with a valid administrative credential for a legacy application; the site came back on 25 November on a new platform."
pubDate: 2026-11-27T17:01:00-03:00
sourceName: "CadaMinuto"
sourceUrl: "https://www.cadaminuto.com.br/noticia/2026/11/21/hacker-invade-site-do-governo-de-alagoas-com-senha-de-administrador-e-apaga-conteudos"
cover: "https://covers.duarte.top/covers/20261127-1453-governo-de-alagoas-portal-invadido-1453.jpg"
tipo: incidente
pais: br
tags: ["setor-publico", "credenciais", "sistemas-legados", "alagoas"]
---

**In one line:** a valid administrative credential in a third party's legacy application was enough to get past the SOC and delete content from a state's official portal.

## What happened

The official portal of the Alagoas state government (alagoas.al.gov.br) was breached on the night of 19 November 2026. According to Juliano Farias, IT and Telecommunications Services director at Itec (Instituto de Tecnologia em Informática e Comunicação de Alagoas), the intruder started at 23:17 and logged in as if it were valid access: they used a valid administrative credential of the system itself to exploit flaws in the code of a legacy application built by an outsourced company. The forensic analysis ruled out known recent vulnerabilities.

During the night, the intruder changed the home page and deleted news, event and photo gallery records from the database. Secom confirmed the case in a statement. Itec blocked external access, made a forensic copy of the environment, identified the attacker's IP address and filed a police report. The institute says the attack was limited to that portal's web layer and that backups exist.

The government expected the site back on 23 November, but the portal only returned on 25 November, on a new platform, with content still being restored. Itec has not yet said whom the credential belonged to and says it faces about 30,000 attack attempts per hour.

## Why it matters

The SOC did not see the entry because the credential was legitimate. That shows the limit of controls centered on authentication and the perimeter: they do not say what an account can reach or which data is within its reach. Vendors' legacy systems with active administrative accounts tend to fall outside the access and data inventory.

## Risk reading

| Vector | Public evidence | Severity |
|---|---|---|
| Valid administrative credential | Itec confirms login with a valid administrator username and password | High |
| Third-party legacy application | Portal built by an outsourced company, with code flaws exploited | High |
| Detection | Access not detected by the SOC because the credential was valid | Medium |
| Data integrity | News, event and photo records deleted from the database | Medium |

## What to do this week

1. List every administrative account in legacy and vendor systems, with owner and last use, and disable orphaned ones (owner: IAM).
2. Map which databases each of those accounts can read, change or delete (owner: data governance).
3. Create alerts for after-hours administrative logins and for mass deletions in legacy application databases (owner: SOC).
