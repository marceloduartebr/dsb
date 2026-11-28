---
title: "Boston Scientific notifica a 117.800 personas casi seis meses después de que un vishing abriera acceso a su nube"
description: "El acceso se detectó el 12 de mayo, pero solo el 5 de noviembre la empresa confirmó que SSN, documentos y datos médicos estaban expuestos."
pubDate: 2026-11-28T08:32:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/new-boston-scientific-data-breach-exposes-personal-medical-info/"
cover: "https://covers.duarte.top/covers/20261127-boston-scientific-vazamento-2001.jpg"
tipo: incidente
pais: us
tags: ["vazamento", "saude", "engenharia-social", "nuvem", "estados-unidos"]
---

**En una línea:** Boston Scientific contuvo en mayo un acceso por vishing, pero necesitó casi seis meses para saber que los datos personales y de salud de 117.789 personas estaban expuestos.

## Qué ocurrió
El fabricante estadounidense de dispositivos médicos Boston Scientific comenzó a notificar a las personas afectadas por un ciberataque a su infraestructura en la nube. Según el modelo de notificación entregado a las autoridades estadounidenses, el atacante usó vishing (ingeniería social por teléfono) para obtener acceso. La empresa identificó el acceso no autorizado el 12 de mayo de 2026 y la investigación concluyó el 5 de noviembre que hubo exposición de datos. El portal de violaciones del fiscal general de Texas registra 117.789 personas afectadas, en varios estados.

Los datos expuestos incluyen nombre, dirección, número de Seguro Social (SSN), número de documento oficial (pasaporte o identificación estatal), información médica, datos del plan de salud y fecha de nacimiento. La empresa afirma que no se expusieron historias clínicas de pacientes ni datos de monitoreo remoto, dispositivos conectados o aplicaciones clínicas, que contuvo el incidente con especialistas externos y que avisó a las autoridades. El aviso no ofrece monitoreo de crédito gratuito.

Es el segundo incidente de la empresa en 2026. Un portavoz afirmó que no tiene relación con el ataque de agosto, que paralizó parte de las operaciones globales.

## Por qué importa
El vector fue una llamada, no una falla técnica: el control que falló fue el de identidad. Y el intervalo entre detectar (mayo) y conocer el alcance (noviembre) muestra el costo de no tener un mapa de qué datos personales viven en cada aplicación en la nube. Un documento oficial y un dato de salud no se pueden cambiar después de la filtración.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Vishing contra el personal para acceder a la nube | Modelo de notificación entregado a las autoridades | Alta |
| Exposición de SSN, documentos y datos de salud | 117.789 personas en el portal del fiscal general de Texas | Alta |
| Casi seis meses entre la detección y la confirmación del alcance | Fechas del 12 de mayo y 5 de noviembre en la notificación | Media |

## Qué hacer esta semana
1. Revisar el flujo de restablecimiento de contraseña y MFA del service desk para solicitudes por teléfono — responsable: IAM.
2. Listar las aplicaciones en la nube que guardan documentos, datos de salud o identificadores nacionales y quién tiene acceso a ellas — responsable: privacidad y seguridad de datos.
3. Señal de que funcionó: ante una cuenta comprometida, el equipo puede decir en horas a qué registros personales alcanzaba.
