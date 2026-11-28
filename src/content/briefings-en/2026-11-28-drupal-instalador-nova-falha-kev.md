---
title: "Drupal admits the installer patch was not enough and a new exploited flaw enters the KEV (CVE-2026-136716)"
description: "Sites in incomplete installation states stayed vulnerable after the November 18 fix, and CISA gave three days to patch."
pubDate: 2026-11-28T08:32:00-03:00
sourceName: "Drupal.org"
sourceUrl: "https://www.drupal.org/sa-core-2026-019"
cover: "https://covers.duarte.top/covers/20261127-drupal-instalador-nova-falha-kev-2001.jpg"
tipo: vulnerabilidades
pais: global
tags: ["vulnerabilidade", "kev", "drupal", "cms", "perimetro"]
---

**In one line:** the November 18 fix for the Drupal installer left production sites vulnerable, and the new flaw, already exploited, calls for a patch, update.php and a log review.

## What happened
On November 25, 2026, Drupal published SA-CORE-2026-019 (Drupal core, highly critical, risk 21/25 on Drupal's scale, "Access bypass"). The advisory says SA-CORE-2026-017, from November 18, fixed installer flaws (CVE-2026-132165), but sites in unusual or incomplete installation states remained open to takeover, including production sites. The new flaw was assigned CVE-2026-136716 and, according to Drupal, is being exploited.

Affected versions: before 10.6.23; from 11.0.0 to before 11.3.23; from 11.4.0 to before 11.4.14. Fixed versions: 10.6.23, 11.3.23 and 11.4.14. Drupal says an update hook must run (update.php) to fix production sites in that state, and recommends reviewing logs, especially changes to or by user 1, and confirming that this user's email is controlled by the organization.

On November 27, CISA added CVE-2026-136716 to the KEV catalog, with a November 30 deadline and forensic triage required by BOD 26-04 for federal agencies. According to CISA, an unauthenticated remote attacker can take over the site through the exposed installer when the site is in one of the affected states. The same day, CISA also added two OSGeo GeoServer flaws (CVE-2026-120705 and CVE-2026-129243). NVD has not yet published a CVSS score for CVE-2026-136716.

## Why it matters
Anyone who patched CVE-2026-132165 last week may have felt the job was done. The new advisory shows the patch did not close every case and that the exposure window is still open for those who have not updated again. A hijacked Drupal site gives access to forms, sign-ups and the database connection.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Site takeover without login through the exposed installer | SA-CORE-2026-019 and CISA's KEV catalog | Critical |
| Sites already patched for CVE-2026-132165 remain vulnerable in incomplete states | Text of SA-CORE-2026-019 | High |
| Active exploitation | Drupal ("being exploited in the wild") and KEV listing | High |

## What to do this week
1. Update to 10.6.23, 11.3.23 or 11.4.14 and run update.php on every site — owner: web team / AppSec.
2. Review logs since November 18 for changes to user 1 and list the personal data each site exposes — owner: SOC and privacy.
3. Sign it worked: an inventory of Drupal sites with version, patch date and log review result.
