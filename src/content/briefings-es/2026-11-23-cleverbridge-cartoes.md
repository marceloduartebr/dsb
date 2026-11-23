---
title: "Cleverbridge confirma que un tercero copió datos de tarjetas de pago en su plataforma"
description: "El procesador detectó el acceso el 4 de noviembre y empezó a notificar a los afectados el 20 de noviembre; el aviso público no dice cuántos fueron alcanzados."
pubDate: 2026-11-23T08:45:00-03:00
sourceName: "Cleverbridge"
sourceUrl: "https://grow.cleverbridge.com/incident-update"
cover: "https://covers.duarte.top/covers/20261123-cleverbridge-cartoes-0813.jpg"
tipo: incidente
tags: ["pagamento", "cartao", "vazamento", "europa"]
pais: eu
---

**En una línea:** un procesador de pagos de software sufrió la copia de datos de tarjetas; el CVV, si estaba almacenado, no debería estar ahí después de la autorización.

## Qué ocurrió
El 4 de noviembre de 2026, Cleverbridge, procesador de comercio electrónico con sede en Alemania, detectó actividad no autorizada en su plataforma, desconectó sistemas para contener el incidente y los reactivó el mismo día. La investigación posterior concluyó que un tercero copió datos de tarjetas de pago almacenados en la plataforma. La empresa afirma que no se trató de ransomware y que ningún sistema fue cifrado. Empezó a notificar a las personas afectadas el 20 de noviembre. La página oficial no detalla qué campos de la tarjeta se copiaron ni cuántas personas fueron alcanzadas. Una notificación a clientes, citada por BleepingComputer, indica número de tarjeta, fecha de vencimiento y código de seguridad (CVV/CVC), y afirma que el nombre, el contacto y los datos de facturación no fueron copiados. Cleverbridge dice haber comunicado el incidente a autoridades de protección de datos, policía, marcas de tarjetas y socios de pago, y ofrece monitoreo de crédito mediante TransUnion/Cyberscout. No divulgó la vía de entrada ni el período en que el atacante permaneció en el entorno.

## Por qué importa
El CVV es un dato de autenticación sensible. Los estándares de pago determinan que no se conserve después de la autorización de la transacción. Si el aviso al cliente incluye ese código, el problema no es solo la intrusión: es el dato que seguía guardado en el procesador que intermedia compras de varios proveedores de software.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Actividad no autorizada en la plataforma el 4/11 | Página oficial de Cleverbridge | Alta |
| Copia de datos de tarjetas de pago | Página oficial de Cleverbridge | Crítica |
| Inclusión de número, vencimiento y CVV | Notificación a clientes citada por BleepingComputer | Crítica |

## Qué hacer esta semana
1. Identificar qué productos, suscripciones y tiendas de la empresa pasan por Cleverbridge y qué clientes fueron o pueden haber sido notificados — responsable: finanzas + privacidad.
2. Orientar a los afectados a revisar sus estados de cuenta, avisar al emisor de la tarjeta y desconfiar de mensajes que pidan un nuevo CVV o datos de la tarjeta — responsable: atención al cliente.
3. Señal de que funcionó: la empresa sabe qué transacciones usaron ese procesador y puede cruzar el aviso del proveedor con su base de clientes en horas, no en semanas.
