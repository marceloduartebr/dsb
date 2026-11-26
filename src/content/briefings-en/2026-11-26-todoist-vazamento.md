---
title: "Todoist: attacker searched customer tasks for passwords and seed phrases"
description: "A credential stolen from version control led to the production database; about 6% of users had their email and an old password hash copied."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "Todoist"
sourceUrl: "https://www.todoist.com/help/todoist/get-started/security-incident-in-november-2026-cG0EIACNU"
cover: "https://covers.duarte.top/covers/20261126-todoist-vazamento-0802.jpg"
tipo: incidente
pais: global
tags: ["incidente", "credenciais", "supply-chain", "saas", "segredos"]
---

**In one line:** when sensitive data lives in free text, the attacker's search gets there before the company's inventory does.

## What happened
On November 24, 2026, Todoist published a notice about an incident that began on November 22. According to the company, an attacker used a stolen credential tied to the version control system to change automated workflows in three repositories and obtain additional credentials. On November 23, the attacker obtained an administrative credential for the employee login system, took over an employee's work account, entered the cloud infrastructure and accessed the production database, from which account records were exported. The investigation began at 17:01 (UTC) that same day and access was cut off by 17:42. Email notification to customers was completed on November 25.

The affected groups, in approximate proportions: about 6% of users had their email, an old password hash (salted SHA1) and account creation date copied; about 0.003% had API and Slack integration tokens obtained, and some of them had projects, tasks and comments read through the API; about 0.001% had their content searched for credentials and seed phrases, with results returned; and about 0.001% with the Outlook add-in connected had the subject, sender, first 255 characters of messages and attachment metadata exposed. The company did not disclose the total number of users or how the initial credential was obtained, and says it found no changes to the application code.

## Why it matters
The path repeats a recent pattern: an engineering credential, repository automation and, from there, production. But the most sensitive point is the search for secrets inside customer content. Passwords, API keys and seed phrases pasted into tasks, comments and wikis are critical data outside any formal inventory. Todoist recommended revoking and rotating those secrets, because deleting the text does not invalidate a copy already made.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Credential stolen from version control and repository automation altered | Confirmed by Todoist | High |
| Export of emails and old password hashes (~6% of users) | Confirmed by Todoist | Medium |
| Search for credentials and seed phrases in customer content | Confirmed; some results returned | High |
| API, Slack tokens and Outlook data | Confirmed in small fractions of the user base | Medium |

## What to do this week
1. Sweep productivity tools, tickets and wikis for credentials in free text and revoke whatever is found — data security.
2. Review which repository automation tokens can generate new credentials or reach production — platform engineering.
3. Sign that it worked: the company knows how many secrets exist outside the vault and the number drops week by week.
