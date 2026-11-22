---
title: "Microsoft confirma explotación de una falla en Entra Connect Health que expuso correos de administradores y datos de tenants"
description: "El acceso fue solo de lectura, pero entregó el mapa de a quién atacar con phishing dirigido."
pubDate: 2026-11-22T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/microsoft-entra-connect-health-flaw-exploited-to-steal-tenant-data/"
cover: "https://covers.duarte.top/covers/20261122-microsoft-entra-connect-health-vazamento-0810.jpg"
tipo: incidente
tags: ["microsoft", "identidade", "phishing", "cloud"]
pais: global
---

**En una línea:** los metadatos de tenant parecen inofensivos hasta que se convierten en la lista de objetivos de un phishing dirigido.

## Qué ocurrió
Microsoft notificó a los administradores que una falla en la API de Entra Connect Health, introducida el 23 de julio de 2026 y descubierta el 9 de noviembre, fue explotada. Terceros tuvieron acceso de lectura a correos de contactos técnicos y de cuentas administradoras, IDs y nombres de tenants, dominios iniciales, códigos de país, nivel de licencia de Entra, estado de sincronización del directorio y un certificado vencido. La corrección del lado del servidor se aplicó el 19 de noviembre; la investigación terminó el 20 de noviembre, cuando comenzaron las notificaciones vía Azure Service Health. La empresa afirma que no hubo exposición de contraseñas, hashes, tokens ni claves válidas, ni cambios de configuración, y no informó cuántos tenants fueron afectados.

## Por qué importa
La propia Microsoft recomienda alertar a los equipos sobre phishing e ingeniería social contra los correos expuestos. Una cuenta administradora comprometida por este camino hereda todo el acceso a datos que ya tenía.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Exposición de correos de administradores | Notificación de Microsoft | Alta |
| Phishing dirigido a cuentas privilegiadas | Recomendación de Microsoft | Alta |
| Acceso a datos vía cuenta administradora | No confirmado | Media |

## Qué hacer esta semana
1. Verificar en Azure Service Health si el tenant fue notificado y revisar los logs de auditoría y de inicio de sesión de Entra — responsable: equipo de identidad.
2. Exigir MFA resistente a phishing en todas las cuentas privilegiadas y mapear qué bases sensibles alcanza cada una — responsable: seguridad + datos.
3. Señal de que funcionó: lista actualizada de administradores con el dato al que accede cada uno.
