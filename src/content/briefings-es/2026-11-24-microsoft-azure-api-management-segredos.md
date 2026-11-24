---
title: "Una falla en Azure API Management Classic fue explotada para robar secretos de clientes"
description: "NSM y Microsoft confirman la explotación de una vulnerabilidad en APIM Classic; Equinor y Skagerak Energi están entre las afectadas y la corrección no invalida las credenciales ya expuestas."
pubDate: 2026-11-24T08:50:00-03:00
sourceName: "NSM (Nasjonal sikkerhetsmyndighet)"
sourceUrl: "https://nsm.no/aktuelt/nsm-deler-tiltak-mot-sarbarhet-i-azure-api-management"
cover: "https://covers.duarte.top/covers/20261124-microsoft-azure-api-management-segredos-0812.jpg"
tipo: vulnerabilidades
tags: ["microsoft", "azure", "segredos", "nuvem"]
pais: global
---

En una línea: Microsoft cerró el acceso el 19/11, pero los secretos guardados en APIM Classic antes de esa fecha deben ser cambiados por el cliente.

## Qué ocurrió

La NSM, autoridad nacional de seguridad de Noruega, informó que un actor desconocido explotó activamente una vulnerabilidad en Azure API Management Classic para obtener tokens, secrets y named values, afectando a varias organizaciones noruegas, entre ellas Equinor y Skagerak Energi. En un aviso de Service Health enviado a clientes (reportado por BleepingComputer y The Record el 23/11/2026), Microsoft dijo haber identificado el problema el 18/11 y bloqueado la vía de acceso no autorizado al plano de gestión el 19/11. Pueden haber quedado expuestos secrets en Named Values, client secrets de proveedores de identidad y OpenID Connect, subscription keys y tokens de las API de gestión. Los niveles v2 de APIM no se vieron afectados. Microsoft advierte que la corrección no invalida las credenciales a las que se accedió antes de ella.

## Por qué importa

Los gateways de API concentran claves que abren backends y bases de datos. La exposición no termina con el parche: cada secreto filtrado sigue abriendo lo que abría hasta que se rota, y solo quien sabe qué alcanza cada uno puede priorizar.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Acceso no autorizado al plano de gestión de APIM Classic | Aviso de Microsoft y comunicado de la NSM | Crítica |
| Robo de secrets, subscription keys y tokens | Aviso de Microsoft y casos Equinor/Skagerak | Crítica |
| Acceso posterior a backends con credenciales robadas | Alerta de Microsoft sobre credenciales no invalidadas | Alta |

## Qué hacer esta semana

1. Inventariar las instancias de APIM Classic y rotar todos los secrets, subscription keys y client secrets almacenados en ellas (responsable: equipo de plataforma en la nube).
2. Mapear qué backends y bases de datos alcanza cada secreto del gateway y revisar los registros de acceso desde principios de noviembre (responsable: SOC).
3. Mover los secretos guardados directamente en APIM a una bóveda dedicada y evaluar la migración a los niveles v2 (responsable: arquitectura de nube).
