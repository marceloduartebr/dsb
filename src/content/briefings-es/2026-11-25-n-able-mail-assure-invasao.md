---
title: "N-able confirma intrusión en Mail Assure y corrige una SSRF crítica (CVE-2026-134624)"
description: "Se accedió a un servidor de Mail Assure y SpamExperts Hosted Cloud; N-able revocó los tokens de los clientes y corrigió una SSRF de CVSS 9,3 hallada en la investigación."
pubDate: 2026-11-25T08:45:00-03:00
sourceName: "N-able"
sourceUrl: "https://www.n-able.com/blog/mail-assure-incident-update"
cover: "https://covers.duarte.top/covers/20261124-n-able-mail-assure-invasao-0812.jpg"
tipo: incidente
pais: us
tags: ["n-able", "msp", "terceiros", "email"]
---

En una línea: un proveedor de filtrado de correo para MSP fue invadido y revocó todos los tokens de API y OAuth de sus clientes.

## Qué ocurrió

N-able dejó fuera de línea el panel y las API de Mail Assure y SpamExperts Hosted Cloud el 16/11/2026, y al principio atribuyó la interrupción a la configuración de la plataforma. El 18/11 confirmó que un tercero no autorizado había accedido a un servidor alojado y probablemente a credenciales guardadas en él. La empresa retiró el servidor, rotó credenciales internas, revocó los tokens de API y OAuth de los clientes y restableció contraseñas locales. Durante la investigación encontró la CVE-2026-134624, una SSRF en la verificación de conexión de la sincronización LDAP (CVSS 4.0 de 9,3, según el aviso del proveedor), corregida en la build 20261121.1943. El acceso se restableció el 21/11. N-able dice no haber encontrado evidencia de compromiso de datos de clientes, no informó si la falla fue el vector de entrada y prometió un análisis de causa raíz en un plazo de dos semanas.

## Por qué importa

Los servicios de filtrado de correo están en el camino de los mensajes de muchos clientes a la vez. La revocación masiva de tokens muestra el tamaño de la dependencia: cada integración que se rompe es un acceso que alguien necesita conocer y justificar.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Acceso no autorizado a un servidor de Hosted Cloud | Actualización del incidente de N-able | Alta |
| Credenciales guardadas en el servidor posiblemente accedidas | Declaración de N-able a SecurityWeek | Alta |
| SSRF hacia hosts internos (CVE-2026-134624) | Aviso del proveedor y NVD | Crítica |

## Qué hacer esta semana

1. Listar las integraciones y scripts que usaban tokens de Mail Assure/SpamExperts y volver a emitir solo los necesarios, con alcance mínimo (responsable: equipo de mensajería).
2. En Local Cloud, confirmar la build 20261121.1943 o posterior (responsable: infraestructura).
3. Revisar todos los terceros con acceso por token al correo corporativo y qué puede leer cada uno (responsable: gestión de riesgos de terceros).
