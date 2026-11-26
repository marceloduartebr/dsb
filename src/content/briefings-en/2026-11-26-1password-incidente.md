---
title: "1Password: employee's GitHub account took attacker to CI/CD and customer data"
description: "Malicious code shipped through the pipeline downloaded administrative data for some customers; vaults were not affected."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "1Password"
sourceUrl: "https://1password.com/blog/update-on-nov-2026-security-incident"
cover: "https://covers.duarte.top/covers/20261126-1password-incidente-0802.jpg"
tipo: incidente
pais: global
tags: ["incidente", "supply-chain", "github", "ci-cd", "gerenciador-de-senhas"]
---

**In one line:** the attacker did not need to touch the customer database; the delivery pipeline already had the path to it.

## What happened
On November 25, 2026, 1Password said that since November 19 it has been investigating an attacker's access to an employee's corporate GitHub account. With that account, the intruder copied source code from private repositories, reached the CI/CD system, which holds infrastructure secrets, and pushed malicious code to backend services. The code downloaded administrative data for some customers: names and emails, account and user identifiers, creation and last login dates, public keys, SRP protocol parameters, invitation, provisioning and recovery link tokens sent by email, and non-secret internal metadata.

According to the company, vault contents, the keys that protect them, recovery keys, apps and extensions were not affected, and there is no internal evidence of account takeover using the exposed tokens. 1Password disabled the account, revoked the attacker's token, rotated internal credentials, increased invitation and recovery codes from six digits to ten characters and hired independent experts. A small number of users in the middle of provisioning or recovery were notified. The company did not disclose how many customers are in the affected group.

## Why it matters
The path to customer data went through a developer account and CI/CD, not through a direct attack on the database. Personal data inventories usually list data stores, but rarely map which pipelines, tokens and engineering identities can read or exfiltrate those records. The exposed invitation and recovery tokens also open room for targeted phishing, as the company itself warned.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Corporate GitHub account compromised | Confirmed by 1Password | High |
| Access to CI/CD holding infrastructure secrets | Confirmed by 1Password | High |
| Malicious backend code downloading customer data | Confirmed; number affected not disclosed | High |
| Phishing with invitation and recovery tokens | Company warning; no account takeover identified | Medium |

## What to do this week
1. List which services that read personal data can receive deploys through CI/CD, and with which credentials — platform engineering.
2. Review long-lived tokens and developer account permissions on GitHub, with phishing-resistant MFA and short expiry — identity security.
3. Sign that it worked: for any developer account, the team can answer within hours which customer datasets it reaches.
