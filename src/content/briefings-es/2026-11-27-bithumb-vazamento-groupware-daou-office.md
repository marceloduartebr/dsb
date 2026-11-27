---
title: "Bithumb amplía la filtración en su groupware interno: el intruso estuvo unos 15 días y se llevó hasta copias de documentos de identidad"
description: "La actualización del 25/11 del exchange surcoreano confirma el acceso a Daou Office del 12 al 27 de octubre y suma titulares y campos, como registro de residente, pasaporte y copias de documentos."
pubDate: 2026-11-27T08:35:00-03:00
sourceName: "Bithumb"
sourceUrl: "https://feed.bithumb.com/notice/1655458"
cover: "https://covers.duarte.top/covers/20261126-bithumb-vazamento-groupware-daou-office-1709.jpg"
tipo: incidente
pais: global
tags: ["coreia-do-sul", "cripto", "vazamento", "shadow-data"]
---

En una línea: Bithumb trataba el groupware como un sistema interno, pero guardaba documentos y números de identificación de clientes.

## Qué ocurrió

En un aviso actualizado el 25 de noviembre de 2026, Bithumb informó que el análisis de la filtración en su groupware móvil interno Daou Office, comunicada el 29 de octubre, identificó más titulares y más tipos de datos. Según la empresa, un tercero no autorizado accedió al sistema del 12 de octubre (13:49) al 27 de octubre (15:22) y extrajo datos personales y archivos. Resultaron afectados clientes, empleados de proveedores y empleados actuales y antiguos; los campos incluyen número de miembro, nombre, teléfono, correo electrónico, fecha de nacimiento, número de registro de residente, pasaporte, licencia de conducir, cuenta bancaria, dirección, copia de documento de identidad, historial de transacciones y dirección de billetera, según la persona. Yonhap informa que el aviso inicial hablaba de unos 7.100 clientes y empleados. Bithumb afirma que la plataforma de negociación y la base de datos de clientes no fueron vulneradas directamente y reforzó el monitoreo de retiros.

## Por qué importa

El caso muestra datos sensibles de clientes fuera de los sistemas de producción, en una herramienta de colaboración. Los números de identificación y las copias de documentos no se pueden cambiar como una contraseña. Y la ampliación semanas después del primer aviso muestra el costo de no tener un mapa de datos por titular.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Acceso prolongado al groupware | Del 12/10 al 27/10, confirmado por Bithumb | Alta |
| Datos sensibles fuera de producción | Copias de documentos y números de identificación en el groupware | Alta |
| Ampliación tardía del alcance | Nuevos titulares y campos en la actualización del 25/11 | Media |

## Qué hacer esta semana

1. Revisar groupware, chat y correo en busca de documentos y números de identificación de clientes (responsable: equipo de gobierno de datos).
2. Definir y aplicar una política de retención para adjuntos con datos personales en herramientas de colaboración (responsable: DPO).
3. Revisar las alertas de acceso anómalo a herramientas SaaS internas, con meta de detección en horas, no semanas (responsable: SOC).
