---
title: "SAP confirma un incidente con tokens robados y código alterado en GitHub"
description: "Sin indicios de acceso a datos de clientes, dice SAP, pero la pregunta es qué alcanzaban los tokens."
pubDate: 2026-11-27T12:35:00-03:00
sourceName: "Cybersecurity News"
sourceUrl: "https://cybersecuritynews.com/sap-security-incident"
cover: "https://covers.duarte.top/covers/20261127-sap-incidente-github-0805.jpg"
tipo: incidente
pais: eu
tags: ["supply-chain", "github", "tokens", "alemanha"]
---

**En una línea:** un token robado ya es la autenticación; el alcance del incidente depende de lo que había en los repositorios.

## Qué ocurrió
SAP confirmó un incidente de seguridad de TI tras detectar actividad sospechosa. Según DER SPIEGEL, que cita un memorando interno y fuentes de la empresa, los atacantes robaron tokens de autenticación de empleados y los usaron para copiar y alterar código fuente en GitHub; la investigación interna se llama "Project Granite". SAP afirmó que, en esa etapa, no había evidencia de acceso no autorizado a datos de negocio de clientes y no respondió a preguntas detalladas. No se divulgaron los repositorios afectados, el método de obtención de los tokens ni si las alteraciones llegaron a software usado por clientes. El reportaje se publicó entre el 26 y el 27 de noviembre de 2026.

## Por qué importa
Los tokens de desarrollador eluden la contraseña y el MFA. Los repositorios guardan con frecuencia secretos, configuraciones y datos de prueba copiados de producción. La frase "sin acceso a datos de clientes" solo se sostiene si la empresa sabe qué existe en cada repositorio que alcanzaban los tokens.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Tokens de empleados | Robo informado por DER SPIEGEL | Alta |
| Integridad del código | Código copiado y alterado, según el reportaje | Alta |
| Datos de clientes | SAP dice que no hay evidencia de acceso hasta ahora | En investigación |

## Qué hacer esta semana
1. Revocar y reemitir tokens de GitHub y secretos de CI/CD de alto privilegio — responsable: plataforma/DevOps.
2. Escanear repositorios en busca de secretos y datos personales copiados de producción — responsable: seguridad de aplicaciones y privacidad.
3. Señal de que funcionó: para cada token activo, el equipo sabe a qué repositorios accede y si hay datos sensibles en ellos.
