---
title: "Gatwick avisa a clientes que una intrusión en AutoPay, del proveedor del drop-off, expuso datos personales y de pago"
description: "El sistema AutoPay, operado por ParkPark para Times24 UK, fue invadido y suspendido; el aeropuerto no informa el número de afectados ni el período de los registros."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "The Register"
sourceUrl: "https://www.theregister.com/security/2026/11/25/gatwick-drop-off-customers-personal-data-exposed-in-supplier-breach/5312060"
cover: "https://covers.duarte.top/covers/20261125-gatwick-autopay-vazamento-fornecedor-1708.jpg"
tipo: incidente
pais: eu
tags: ["gatwick", "risco-de-terceiros", "vazamento", "reino-unido"]
---

En una línea: un proveedor del proveedor expuso datos de clientes de Gatwick, y el aeropuerto no sabe decir cuántos.

## Qué ocurrió

El 25 de noviembre de 2026, The Register informó que el London Gatwick Airport notificó a clientes sobre una intrusión en AutoPay, servicio que cobra automáticamente la tarifa de la zona de drop-off. El sistema es operado por ParkPark y usado por Times24 UK Limited, que gestiona el drop-off del aeropuerto. Según la notificación, pueden haber quedado expuestos nombres, direcciones, códigos postales, contactos, credenciales de AutoPay (correos y contraseñas con hash bcrypt), datos de los vehículos vinculados a las cuentas, matrículas y horarios de entrada y salida en sitios de Times24. En casos limitados, también registros de pago (montos, tipo y vencimiento de la tarjeta, referencias e IDs de transacción) y correos intercambiados con atención al cliente. Times24 suspendió AutoPay al detectar la intrusión, y el servicio sigue apagado. Gatwick dijo no poder informar cuántos clientes fueron afectados ni desde cuándo los registros están expuestos; los vuelos no fueron afectados.

## Por qué importa

La marca en la notificación no es la empresa que operaba el sistema. Las cadenas de terceros con acceso a datos de clientes hacen difícil responder a las preguntas básicas de un incidente: qué datos, de cuántas personas, de qué período. Sin un inventario por proveedor, la respuesta al titular queda genérica.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Compromiso de sistema de tercero | AutoPay operado por ParkPark para Times24 | Alta |
| Exposición de datos personales y de ubicación | Direcciones, matrículas y horarios de entrada y salida | Alta |
| Alcance desconocido | Gatwick no informa número de afectados ni período | Media |

## Qué hacer esta semana

1. Listar los proveedores que almacenan datos de clientes en nombre de la empresa, incluidos subcontratistas (responsable: gestión de riesgos de terceros).
2. Exigir a cada proveedor crítico el inventario de los datos personales guardados y el plazo de retención (responsable: DPO).
3. Preparar el modelo de notificación con campos para volumen y período afectados, para no depender del proveedor en el momento del incidente (responsable: jurídico con seguridad).
