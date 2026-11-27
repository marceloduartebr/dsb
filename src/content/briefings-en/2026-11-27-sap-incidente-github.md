---
title: "SAP confirms incident with stolen tokens and altered code on GitHub"
description: "No sign of access to customer data, SAP says, but the question is what the tokens could reach."
pubDate: 2026-11-27T12:35:00-03:00
sourceName: "Cybersecurity News"
sourceUrl: "https://cybersecuritynews.com/sap-security-incident"
cover: "https://covers.duarte.top/covers/20261127-sap-incidente-github-0805.jpg"
tipo: incidente
pais: eu
tags: ["supply-chain", "github", "tokens", "alemanha"]
---

**In one line:** a stolen token already is the authentication; the scope of the incident depends on what was in the repositories.

## What happened
SAP confirmed an IT security incident after detecting suspicious activity. According to DER SPIEGEL, citing an internal memo and company sources, attackers stole employees' authentication tokens and used them to copy and alter source code on GitHub; the internal investigation is called "Project Granite". SAP said that, at that stage, there was no evidence of unauthorized access to customers' business data and did not answer detailed questions. The affected repositories, how the tokens were obtained and whether the changes reached software used by customers were not disclosed. The report was published between 26 and 27 November 2026.

## Why it matters
Developer tokens bypass passwords and MFA. Repositories often hold secrets, configurations and test data copied from production. The statement "no access to customer data" only holds if the company knows what exists in every repository the tokens could reach.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Employee tokens | Theft reported by DER SPIEGEL | High |
| Code integrity | Code copied and altered, according to the report | High |
| Customer data | SAP says there is no evidence of access so far | Under investigation |

## What to do this week
1. Revoke and reissue high-privilege GitHub tokens and CI/CD secrets — owner: platform/DevOps.
2. Scan repositories for secrets and personal data copied from production — owner: application security and privacy.
3. Sign that it worked: for each active token, the team knows which repositories it accesses and whether they hold sensitive data.
