---
title: "Cisco Expressway: hardcoded credentials give root and the flaw enters the KEV"
description: "CISA confirmed exploitation of CVE-2026-76466 and gave three days to fix it; the target beyond the edge was databases and passwords in repositories."
pubDate: 2026-11-23T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/cisa-flags-critical-cisco-expressway-rce-flaw-as-actively-exploited/"
cover: "https://covers.duarte.top/covers/20261123-cisco-expressway-kev-0813.jpg"
tipo: vulnerabilidades
tags: ["cisco", "kev", "edge", "credenciais", "cve"]
pais: global
---

**In one line:** the edge was only the way in; what was at stake were the databases and secrets the attacker went looking for inside.

## What happened
On November 20, 2026, CISA added CVE-2026-76466 (Cisco Expressway Series, use of hardcoded credentials, CWE-798) to the KEV catalog, with a remediation deadline of November 23 for federal agencies, under BOD 26-04 and with a forensic triage requirement. According to Cisco's advisory (cisco-sa-vcs-static-cred-hr7EWZ8t), the database service of Expressway-C and Expressway-E uses persistent cookies and, in clusters with TLS Verify Mode enabled, does not validate client certificates; whoever holds the cookies can run commands as root through RPC calls. The fix was released in October. CVSS 3.1 score of 9.8 (assigned by Cisco, recorded in the NVD); EPSS of 2.2% (83rd percentile, on 11/22).

According to BleepingComputer, Russian company F6 reported that attackers, helped by an AI assistant, gained root on two internet-facing appliances, reached two more internal cluster nodes and prepared Python scripts to crawl SMB shares, interact with SQL Server and WinRM and search for credentials in GitLab repositories. Cisco told the outlet it was not aware of active exploitation.

## Why it matters
Expressway sits at the edge and connects unified communications to the internal network. F6's account shows the typical path: get in through the edge, move inside and look for data and secrets. Anyone who only applies the patch does not know what was within reach of an intruder who got there first.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Remote root on clustered Expressway | KEV (11/20/2026), CVSS 9.8 | Critical |
| Lateral movement to internal nodes | F6 account via BleepingComputer | High |
| Credential hunting in GitLab, SMB and SQL Server | F6 account via BleepingComputer | High |

## What to do this week
1. Apply Cisco's fixed release to all clustered Expressway-C/E and review TLS Verify Mode — network/UC infrastructure.
2. Run forensic triage on the exposed appliances and review SMB, SQL Server and WinRM access originating from them since October — SOC.
3. Sign that it worked: inventory of secrets in code repositories reviewed, with exposed credentials rotated — AppSec and the data owner.
