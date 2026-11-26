---
title: "Drupal confirma la explotación de una falla en el instalador que permite tomar sitios sin login y CISA la incluye en el KEV (CVE-2026-132165)"
description: "La CVE-2026-132165 permite a un atacante anónimo usar install.php para reinstalar Drupal y tomar el sitio; explotación confirmada desde el 19 de noviembre."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "Drupal.org"
sourceUrl: "https://www.drupal.org/sa-core-2026-017"
cover: "https://covers.duarte.top/covers/20261125-drupal-instalador-rce-kev-1220.jpg"
tipo: vulnerabilidades
pais: global
tags: ["drupal", "kev", "rce", "cms"]
---

En una línea: la falla fue explotada un día después de la alerta, y quien toma el sitio hereda los datos que guarda.

## Qué ocurrió

El 18 de noviembre de 2026, el equipo de seguridad de Drupal publicó la alerta SA-CORE-2026-017, de riesgo altamente crítico (20/25), para la CVE-2026-132165. El core de Drupal incluye un archivo install.php para la instalación del sistema y, en condiciones específicas, un atacante puede usarlo para intentar reinstalar Drupal, lo que puede llevar a la toma del sitio o a la ejecución remota de código. Algunos caminos de explotación, pero no todos, quedan mitigados cuando el servidor web no puede escribir ni cambiar permisos de settings.php. La falla fue descubierta por el OSS Scanner de Anthropic.

En una actualización de la alerta, Drupal informó haber recibido reportes de explotación en sitios reales desde el 19 de noviembre de 2026, a las 19:00 UTC. El 24 de noviembre, CISA agregó la CVE al catálogo KEV y dio a las agencias federales de EE. UU. hasta el 27 de noviembre para protegerse. Están afectadas las versiones anteriores a 10.6.22, de 11.0.0 a 11.3.21 y de 11.4.0 a 11.4.12.

## Por qué importa

Drupal es usado por gobiernos, universidades y grandes empresas en portales con formularios, registros y bases de contacto. La explotación no exige login, y la toma del sitio da acceso a la configuración y, a partir de ella, a la base de datos. Sin saber qué datos personales viven en cada sitio, la empresa no puede medir el alcance si la corrección llegó después del 19 de noviembre.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
| --- | --- | --- |
| Ejecución remota sin login | SA-CORE-2026-017, riesgo altamente crítico | Crítica |
| Explotación activa | Drupal confirma uso en sitios reales desde el 19/11; CISA KEV el 24/11 | Crítica |
| Datos en los sitios | Los portales Drupal guardan formularios y registros | Alta |

## Qué hacer esta semana

1. Actualizar todos los sitios Drupal a 10.6.22, 11.3.22 o 11.4.13 y bloquear /core/install.php en el servidor web (responsable: equipo de aplicaciones web).
2. Verificar señales de reinstalación o de cambio de configuración desde el 19 de noviembre en los sitios expuestos (responsable: SOC).
3. Inventariar qué datos personales guarda o alcanza cada sitio Drupal, para medir el impacto en caso de compromiso (responsable: DPO con el equipo de datos).
