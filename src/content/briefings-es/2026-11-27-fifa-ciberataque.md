---
title: "La FIFA confirma un ciberataque con acceso a información personal y comercial"
description: "La entidad no dice cuántas personas fueron afectadas; el grupo que lo reivindica habla de 12 GB y documentos de identidad."
pubDate: 2026-11-27T12:35:00-03:00
sourceName: "Metrópoles"
sourceUrl: "https://www.metropoles.com/esportes/fifa-e-alvo-de-ataque-cibernetico-e-confirma-vazamento-de-dados"
cover: "https://covers.duarte.top/covers/20261127-fifa-ciberataque-0805.jpg"
tipo: incidente
pais: global
tags: ["vazamento", "engenharia-social", "documentos-de-identidade", "esporte"]
---

**En una línea:** un documento de identidad expuesto no se cambia como una contraseña; notificar exige saber dónde estaba cada uno.

## Qué ocurrió
El 26 de noviembre de 2026, la FIFA confirmó un ataque cibernético que dio acceso a información personal y comercial, sin detallar qué datos fueron expuestos ni cuántas personas fueron afectadas. En un comunicado, afirmó condenar "la obtención y la divulgación ilegales de información, especialmente de datos personales". El grupo Handsome Boy Hacking Club reivindica el ataque, dice haber accedido a sistemas internos el 19 de noviembre y alega haber obtenido 12 GB, incluidos documentos de identidad y de inmigración de ejecutivos y registros financieros y jurídicos; la FIFA no confirmó esas afirmaciones. Según The New York Times, los atacantes se hicieron pasar por empleados de la entidad para obtener acceso.

## Por qué importa
Los documentos de identidad y de inmigración tienen una vida larga: no pueden revocarse como una credencial. La suplantación de empleados elude los controles técnicos y expone lo que cada cuenta puede abrir. Sin un inventario de dónde están esos documentos, la organización no puede dimensionar ni notificar.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Ingeniería social | Los atacantes se hicieron pasar por empleados (NYT) | Alta |
| Datos personales | La FIFA confirma acceso a información personal | Alta |
| Documentos de identidad | Alegado por el grupo, no confirmado por la FIFA | Alta, si se confirma |

## Qué hacer esta semana
1. Localizar repositorios, buzones compartidos y carpetas con copias de documentos de identidad y pasaportes — responsable: privacidad/DPO.
2. Revisar el flujo de verificación de identidad en solicitudes de acceso y de restablecimiento de credenciales — responsable: service desk e IAM.
3. Señal de que funcionó: el equipo puede listar, por persona, dónde están sus documentos y quién puede acceder a ellos.
