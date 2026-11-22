---
title: "Rackspace Spot: una credencial filtrada abrió Secrets de Kubernetes de clientes durante casi 22 horas"
description: "El atacante actuó como usuario legítimo y pudo leer Secrets de clústeres; rotar la clave no revela lo que fue alcanzado."
pubDate: 2026-11-22T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/rackspace-spot-breach-let-hackers-access-customer-kubernetes-secrets/"
cover: "https://covers.duarte.top/covers/20261122-rackspace-spot-vazamento-0810.jpg"
tipo: incidente
tags: ["kubernetes", "credenciais", "cloud", "eua"]
pais: us
---

**En una línea:** quien lee un Secret de Kubernetes ya no necesita el clúster; ya tiene la llave de los datos.

## Qué ocurrió
El 17 de noviembre de 2026, entre aproximadamente las 00:20 y las 22:00 UTC, un tercero usó credenciales filtradas para acceder a partes de Rackspace Spot, la plataforma de Kubernetes gestionado de Rackspace. Según una notificación a clientes obtenida por BleepingComputer, el atacante actuó como usuario legítimo en algunas organizaciones: creó pods, listó nodos y volúmenes y pudo leer cualquier Kubernetes Secret de los usuarios afectados, además de tokens de API y de refresh de Spot. Rackspace supo del acceso el 18 de noviembre, por aviso de un cliente, revocó tokens y sesiones, eliminó los pods y rotó claves. La consola estuvo fuera de servicio durante días; el servicio se restableció por completo el 21 de noviembre. La empresa no informó cuántos clientes fueron afectados ni si hubo robo de datos.

## Por qué importa
Los Secrets guardan contraseñas de bases de datos, tokens de nube y claves de API. El impacto real está en los sistemas que esas credenciales alcanzan, no en la plataforma donde estaban guardadas. La propia Rackspace pidió a los clientes que revisen logs de bases de datos, registries, repositorios Git, almacenamiento y servicios de terceros desde el 17 de noviembre.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Credenciales de usuario filtradas | Notificación de Rackspace | Alta |
| Lectura de Kubernetes Secrets | Notificación de Rackspace | Crítica |
| Uso posterior de las credenciales en bases de datos y almacenamiento | Orientación de revisión de logs | Alta (no confirmado) |

## Qué hacer esta semana
1. Mapear cada Secret de los clústeres al dato que abre (base de datos, bucket, SaaS) y a la clasificación de ese dato — responsable: plataforma + seguridad de datos.
2. Rotar las credenciales de clústeres gestionados por terceros y revisar los logs de acceso desde el 17/11 — responsable: SRE.
3. Señal de que funcionó: para cualquier Secret, el equipo responde en horas qué bases personales alcanza.
