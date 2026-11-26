---
title: "CISA añade al KEV diez fallas explotadas en Mitel MiCollab, Juniper Session Smart, Danfoss y Vates Xen Orchestra"
description: "El 25 de noviembre de 2026 la CISA incluyó diez CVE en el catálogo KEV, con evidencia de explotación activa; cinco de ellas afectan a Mitel MiCollab."
pubDate: 2026-11-26T17:05:00-03:00
sourceName: "CISA"
sourceUrl: "https://cisa.gov/news-events/alerts/2026/11/25/cisa-adds-10-known-exploited-vulnerabilities-catalog"
cover: "https://covers.duarte.top/covers/20261126-cisa-kev-mitel-juniper-danfoss-xen-1307.jpg"
tipo: vulnerabilidades
pais: global
tags: ["cisa", "kev", "mitel", "juniper"]
---

En una línea: diez fallas con explotación activa entran en el KEV el mismo día, y cinco de ellas están en el mismo producto de colaboración.

## Qué ocurrió

El 25 de noviembre de 2026, la CISA añadió diez vulnerabilidades al catálogo KEV, con base en evidencia de explotación activa: CVE-2026-133275, CVE-2026-133303, CVE-2026-133311, CVE-2026-133323 y CVE-2026-133324 (Mitel MiCollab); CVE-2026-103406 (HPE Juniper Session Smart Conductor y Session Smart Router); CVE-2026-133469 (Vates Xen Orchestra); y CVE-2023-25914, CVE-2023-25915 y CVE-2025-41450 (Danfoss AK-SM 800A). En el aviso MISA-2026-0012, actualizado el 24 de noviembre, Mitel describe las cinco fallas en el componente de audio, web y videoconferencia (AWV) de las versiones 10.3 (10.3.0.18) y anteriores; dos de ellas, inyección de XML e inyección de comandos, se clasifican como críticas y explotables sin autenticación. El fabricante afirma que el uso combinado puede ampliar el impacto e indica la corrección en el artículo KB000129195 o la actualización a una versión posterior.

## Por qué importa

El catálogo KEV confirma explotación en entorno real, no solo la existencia de la falla. Los sistemas de colaboración, routers, orquestadores de máquinas virtuales y controladores de refrigeración suelen quedar fuera del inventario de datos, pero son una vía de entrada a la red y a lo que ella guarda.

## Lectura de riesgo

Vector | Evidencia pública | Gravedad
--- | --- | ---
Explotación activa en producto de colaboración | Cinco CVE de MiCollab AWV en el KEV; Mitel clasifica dos como críticas y sin autenticación | Alta
Inyección de comandos en router Session Smart | CVE-2026-103406 en la alerta de la CISA | Alta
Fallas en Xen Orchestra y controladores Danfoss | Tres CVE de Danfoss y una de Vates en el mismo lote del KEV | Alta

## Qué hacer esta semana

1. Verificar en la red la presencia de Mitel MiCollab 10.3.0.18 o anterior, Session Smart, Xen Orchestra y Danfoss AK-SM 800A, y su exposición a internet (responsable: seguridad de la información / infraestructura).
2. Aplicar las correcciones publicadas por los fabricantes y registrar la fecha de aplicación (responsable: infraestructura / dueño del activo).
3. Donde el sistema estuvo expuesto, buscar señales de compromiso antes de limitarse a aplicar el parche (responsable: respuesta a incidentes).
