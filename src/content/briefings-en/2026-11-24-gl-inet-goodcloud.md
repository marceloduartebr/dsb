---
title: "GL.iNet confirms exploitation of a cloud management flaw that installed malware on routers and KVMs"
description: "The company blocked the attack path on November 20, but that does not remove the malware from devices already infected."
pubDate: 2026-11-24T08:50:00-03:00
sourceName: "GL.iNet"
sourceUrl: "https://www.gl-inet.com/en-us/blogs/blog/glinet-security-notice-2026-11-20"
cover: "https://covers.duarte.top/covers/20261123-gl-inet-goodcloud-0813.jpg"
tipo: incidente
tags: ["malware", "roteadores", "nuvem", "vulnerabilidade"]
pais: global
---

**In one line:** closing the cloud flaw stops new infections; it does not clean a device that already received the malware.

## What happened
On November 20, 2026, GL.iNet identified a vulnerability in its cloud remote management services. An unauthorized third party exploited the flaw to access and install malicious software on some of the brand's routers and KVM devices. The company says it has fixed the vulnerability and blocked the path used in the attack, so new devices can no longer be infected that way. These measures, however, do not remove the malware from devices already compromised. The official notice asks customers to look for the process "crond -i /tmp/.log"; if it shows up, the device should be treated as infected, with a factory reset or installation of the indicated security version. The stable firmware with the fixes was scheduled for November 22. The company will notify by email the cloud account customers it identifies as affected and is still investigating the scope, including whether computers connected to the KVMs were hit. It did not disclose how many devices were infected.

## Why it matters
The vendor's cloud management panel reaches an entire fleet of devices. When that path is abused, the inventory that matters is not the vendor's slice: it is the list of routers and KVMs the company itself still has in operation, and what those devices touch.

## Risk reading
| Vector | Public evidence | Severity |
|---|---|---|
| Exploitation of a flaw in cloud management | GL.iNet official notice of 11/20 | High |
| Malware installed on routers and KVMs | GL.iNet official notice | Critical |
| Compromise of computers connected to the KVMs | Investigation ongoing, not confirmed | Undetermined |

## What to do this week
1. Inventory the GL.iNet routers and KVMs in use, including in home offices and labs, and check the indicator of compromise given by the vendor — owner: infrastructure.
2. Isolate or reset devices showing signs of infection, install the security firmware and change credentials and keys that may have passed through these devices — owner: security + infrastructure.
3. Sign that it worked: every device in the fleet has an owner, a check result and, if compromised, a record of what was connected to it.
