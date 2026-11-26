---
title: "Drupal confirms exploitation of installer flaw that lets attackers take over sites without login, and CISA adds it to KEV (CVE-2026-132165)"
description: "CVE-2026-132165 lets an anonymous attacker use install.php to reinstall Drupal and take over the site; exploitation confirmed since November 19."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "Drupal.org"
sourceUrl: "https://www.drupal.org/sa-core-2026-017"
cover: "https://covers.duarte.top/covers/20261125-drupal-instalador-rce-kev-1220.jpg"
tipo: vulnerabilidades
pais: global
tags: ["drupal", "kev", "rce", "cms"]
---

In one line: the flaw was exploited one day after the advisory, and whoever takes the site inherits the data it holds.

## What happened

On November 18, 2026, the Drupal security team published advisory SA-CORE-2026-017, rated highly critical (20/25), for CVE-2026-132165. Drupal core includes an install.php file for installing the system and, under specific conditions, an attacker can use it to try to reinstall Drupal, which can lead to site takeover or remote code execution. Some exploitation paths, but not all, are mitigated when the web server cannot write to or change permissions on settings.php. The flaw was discovered by Anthropic's OSS Scanner.

In an update to the advisory, Drupal said it had received reports of exploitation on real sites since November 19, 2026, at 19:00 UTC. On November 24, CISA added the CVE to the KEV catalog and gave US federal agencies until November 27 to protect themselves. Affected versions are those before 10.6.22, 11.0.0 through 11.3.21 and 11.4.0 through 11.4.12.

## Why it matters

Drupal is used by governments, universities and large companies for portals with forms, registrations and contact databases. Exploitation requires no login, and taking over the site gives access to its configuration and, from there, to the database. Without knowing which personal data lives on each site, the company cannot measure the reach if the patch arrived after November 19.

## Risk reading

| Vector | Public evidence | Severity |
| --- | --- | --- |
| Remote execution without login | SA-CORE-2026-017, highly critical | Critical |
| Active exploitation | Drupal confirms use on real sites since 11/19; CISA KEV on 11/24 | Critical |
| Data on the sites | Drupal portals store forms and registrations | High |

## What to do this week

1. Update all Drupal sites to 10.6.22, 11.3.22 or 11.4.13 and block /core/install.php on the web server (owner: web applications team).
2. Check for signs of reinstallation or configuration changes since November 19 on exposed sites (owner: SOC).
3. Inventory which personal data each Drupal site stores or reaches, to measure the impact in case of compromise (owner: DPO with the data team).
