---
title: "Cisco Expressway: credenciales fijas dan root y la falla entra en el KEV"
description: "La CISA confirmó la explotación de la CVE-2026-76466 y dio tres días para corregirla; el objetivo después del perímetro eran bases de datos y contraseñas en repositorios."
pubDate: 2026-11-23T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/cisa-flags-critical-cisco-expressway-rce-flaw-as-actively-exploited/"
cover: "https://covers.duarte.top/covers/20261123-cisco-expressway-kev-0813.jpg"
tipo: vulnerabilidades
tags: ["cisco", "kev", "edge", "credenciais", "cve"]
pais: global
---

**En una línea:** el perímetro fue solo la entrada; lo que estaba en juego eran las bases de datos y los secretos que el atacante fue a buscar adentro.

## Qué ocurrió
El 20 de noviembre de 2026, la CISA incluyó la CVE-2026-76466 (Cisco Expressway Series, uso de credenciales fijas, CWE-798) en el catálogo KEV, con plazo de corrección el 23 de noviembre para agencias federales, bajo la BOD 26-04 y con exigencia de triaje forense. Según el aviso de Cisco (cisco-sa-vcs-static-cred-hr7EWZ8t), el servicio de base de datos de Expressway-C y Expressway-E usa cookies persistentes y, en clústeres con TLS Verify Mode activado, no valida certificados de cliente; quien tiene las cookies ejecuta comandos como root mediante llamadas RPC. La corrección salió en octubre. CVSS 3.1 de 9,8 (asignado por Cisco, registrado en el NVD); EPSS de 2,2% (percentil 83, el 22/11).

Según BleepingComputer, la empresa rusa F6 informó que los atacantes, con ayuda de un asistente de IA, obtuvieron root en dos equipos expuestos a internet, alcanzaron otros dos nodos internos del clúster y prepararon scripts en Python para recorrer recursos compartidos SMB, interactuar con SQL Server y WinRM y buscar credenciales en repositorios GitLab. Cisco dijo al medio que no tenía conocimiento de explotación activa.

## Por qué importa
Expressway está en el perímetro y conecta la comunicación unificada con la red interna. El relato de F6 muestra el recorrido típico: entrar por el perímetro, moverse hacia adentro y buscar datos y secretos. Quien solo aplica el parche no sabe qué estaba al alcance de un intruso que haya llegado antes.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Root remoto en Expressway en clúster | KEV (20/11/2026), CVSS 9,8 | Crítica |
| Movimiento lateral hacia nodos internos | Relato de F6 vía BleepingComputer | Alta |
| Búsqueda de credenciales en GitLab, SMB y SQL Server | Relato de F6 vía BleepingComputer | Alta |

## Qué hacer esta semana
1. Aplicar la versión corregida de Cisco en todos los Expressway-C/E en clúster y revisar el TLS Verify Mode — infraestructura de red/UC.
2. Hacer triaje forense en los equipos expuestos y revisar los accesos SMB, SQL Server y WinRM originados en ellos desde octubre — SOC.
3. Señal de que funcionó: inventario de secretos en repositorios de código revisado, con las credenciales expuestas rotadas — AppSec y responsable de los datos.
