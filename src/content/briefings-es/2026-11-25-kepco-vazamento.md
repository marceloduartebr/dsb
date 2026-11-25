---
title: "KEPCO confirma una intrusión que expuso datos de 1,5 millones de clientes, proveedores y empleados"
description: "La estatal de energía surcoreana solo supo del robo por el correo del propio atacante, y la base de facturación guardaba tarjetas y cuentas bancarias."
pubDate: 2026-11-25T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/south-koreas-power-giant-kepco-confirms-data-breach-impacting-15-million/"
cover: "https://covers.duarte.top/covers/20261124-kepco-vazamento-0812.jpg"
tipo: incidente
pais: global
tags: ["vazamento", "infraestrutura-critica", "coreia-do-sul", "dados-de-pagamento"]
---

**En una línea:** KEPCO separó el daño por público en tres días, pero quien avisó a la empresa fue el atacante.

## Qué ocurrió
Korea Electric Power Corporation (KEPCO) confirmó que un atacante entró en su red interna y accedió a la plataforma de facturación KEPCO ON y al sistema de compras electrónicas (SRM). El 19 de noviembre de 2026, la empresa recibió un correo de un hacker que decía haber robado los datos, según la autoridad de protección de datos del país (PIPC). Un actor con el alias "Noiem" anunció el ataque en un foro, pero la autoría no fue confirmada. KEPCO confirmó el acceso el 20 de noviembre, bloqueó IP externas, suspendió los servicios afectados y, el 22 de noviembre, divulgó las cifras:

- 650.487 clientes de KEPCO ON: nombre, datos de identificación, teléfono, dirección, banco y número de cuenta, titular, emisor y número de tarjeta y datos de cobro.
- 426.827 representantes de empresas: nombre, datos de identificación, correo y dirección comercial.
- 442.934 empleados: nombre, área, número de empleado, teléfonos y correo.

La empresa atribuyó el ataque a "tecnologías avanzadas como la IA" y no describió cómo entró el atacante.

## Por qué importa
Una operadora de infraestructura crítica guardaba datos de tarjetas y cuentas bancarias en el mismo sistema de facturación que el registro de clientes. La alerta no vino del monitoreo de la empresa, sino del propio atacante. La separación por público es lo mínimo para notificar a cada titular, pero no dice cuánto tiempo llevaban saliendo los datos.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Acceso a la red interna y a dos sistemas de negocio | Confirmación de KEPCO el 20/11 | Alta |
| Datos de tarjeta y cuenta bancaria en la facturación | Lista de datos divulgada el 22/11 | Alta |
| Detección por el correo del atacante | Nota de la PIPC sobre el correo del 19/11 | Alta |
| Uso de IA en el ataque | Declaración de KEPCO, sin detalles técnicos | Media |

## Qué hacer esta semana
1. Listar los sistemas de facturación y de compras que guardan datos de pago y comprobar si necesitan guardarlos — responsable: arquitectura de datos.
2. Mapear qué bases mezclan clientes, proveedores y empleados y quién accede a cada una — responsable: seguridad de la información con el DPO.
3. Señal de que funcionó: en un ejercicio simulado, el equipo puede decir en horas qué registros y titulares hay en cada sistema, sin esperar el aviso de terceros.
