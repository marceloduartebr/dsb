---
title: "Drupal admite que el parche del instalador no bastó y una nueva falla explotada entra en el KEV (CVE-2026-136716)"
description: "Sitios en estados de instalación incompletos siguieron vulnerables tras la corrección del 18 de noviembre, y la CISA dio tres días para corregir."
pubDate: 2026-11-28T08:32:00-03:00
sourceName: "Drupal.org"
sourceUrl: "https://www.drupal.org/sa-core-2026-019"
cover: "https://covers.duarte.top/covers/20261127-drupal-instalador-nova-falha-kev-2001.jpg"
tipo: vulnerabilidades
pais: global
tags: ["vulnerabilidade", "kev", "drupal", "cms", "perimetro"]
---

**En una línea:** la corrección del 18 de noviembre para el instalador de Drupal dejó vulnerables sitios en producción, y la nueva falla, ya explotada, exige parche, update.php y revisión de logs.

## Qué ocurrió
El 25 de noviembre de 2026, Drupal publicó el SA-CORE-2026-019 (Drupal core, altamente crítico, riesgo 21/25 en la escala de Drupal, "Access bypass"). El aviso dice que el SA-CORE-2026-017, del 18 de noviembre, corrigió fallas en el instalador (CVE-2026-132165), pero que los sitios en estados de instalación inusuales o incompletos siguieron expuestos a una toma de control, incluidos sitios en producción. La nueva falla recibió la CVE-2026-136716 y, según Drupal, está siendo explotada.

Versiones afectadas: anteriores a 10.6.23; de 11.0.0 a antes de 11.3.23; de 11.4.0 a antes de 11.4.14. Versiones corregidas: 10.6.23, 11.3.23 y 11.4.14. Drupal informa que debe ejecutarse un update hook (update.php) para corregir los sitios de producción en ese estado, y recomienda revisar los logs, sobre todo los cambios en el usuario 1 o hechos por él, y confirmar que el correo de ese usuario está controlado por la organización.

El 27 de noviembre, la CISA incluyó la CVE-2026-136716 en el catálogo KEV, con plazo hasta el 30 de noviembre y triaje forense exigido por la BOD 26-04 para las agencias federales. Según la CISA, un atacante remoto sin autenticación puede tomar el sitio mediante el instalador expuesto cuando el sitio está en uno de los estados afectados. El mismo día, la CISA también añadió dos fallas de OSGeo GeoServer (CVE-2026-120705 y CVE-2026-129243). El NVD aún no publicó puntuación CVSS para la CVE-2026-136716.

## Por qué importa
Quien corrigió la CVE-2026-132165 la semana pasada puede haberse quedado con la sensación de tarea cumplida. El nuevo aviso muestra que el parche no cerraba todos los casos y que la ventana de exposición sigue abierta para quien no volvió a actualizar. Un sitio Drupal tomado da acceso a los formularios, los registros y la conexión con la base de datos.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Toma del sitio sin login mediante el instalador expuesto | SA-CORE-2026-019 y catálogo KEV de la CISA | Crítica |
| Sitios ya corregidos para la CVE-2026-132165 siguen vulnerables en estados incompletos | Texto del SA-CORE-2026-019 | Alta |
| Explotación activa | Drupal ("being exploited in the wild") e inclusión en el KEV | Alta |

## Qué hacer esta semana
1. Actualizar a 10.6.23, 11.3.23 u 11.4.14 y ejecutar update.php en cada sitio — responsable: equipo web / AppSec.
2. Revisar los logs desde el 18 de noviembre en busca de cambios en el usuario 1 y listar los datos personales que expone cada sitio — responsable: SOC y privacidad.
3. Señal de que funcionó: inventario de sitios Drupal con versión, fecha del parche y resultado de la revisión de logs.
