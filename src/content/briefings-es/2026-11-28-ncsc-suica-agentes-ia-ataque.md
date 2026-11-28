---
title: "Suiza confirma los primeros ataques con agentes de IA: cuatro de cinco intrusiones tuvieron éxito"
description: "El NCSC suizo informa ataques conducidos por agentes de IA contra infraestructura crítica y empresas, y pide corregir en 24 horas."
pubDate: 2026-11-28T17:05:00-03:00
sourceName: "NCSC Suíça (BACS)"
sourceUrl: "https://bacs.admin.ch/en/26-ki-agenten-1-en"
cover: "https://covers.duarte.top/covers/20261128-ncsc-suica-agentes-ia-ataque-0803.jpg"
tipo: incidente
pais: eu
tags: ["inteligencia-artificial", "infraestrutura-critica", "suica", "agentes-de-ia"]
---

**En una línea:** los agentes de IA acortan a horas el camino entre un sistema expuesto y una intrusión, y el impacto pasa a depender de lo que había en ese sistema.

## Qué ocurrió
El 24 de noviembre, el Centro Nacional de Ciberseguridad de Suiza (NCSC, hoy BACS) publicó la alerta 26-KI-Agenten-1 sobre los primeros ataques asistidos por agentes de IA reportados en el país, con operadores de infraestructura crítica de al menos dos sectores entre las víctimas. En una entrevista con la emisora SRF el 26 de noviembre, el director Florian Schütz informó cinco casos confirmados, cuatro con sistemas comprometidos. Tres involucraron a operadores de infraestructura crítica, y dos de ellos fueron invadidos, sin grandes interrupciones reportadas. Pequeñas y medianas empresas también están entre las víctimas. La alerta cita ARTEX y CyberStrikeAI como ejemplos de agentes ofensivos accesibles por internet, sin afirmar que fueran las herramientas usadas, y dice que el número de estas herramientas casi se duplicó desde octubre de 2026.

## Por qué importa
Es una confirmación oficial, de un CERT nacional europeo, de que los agentes de IA ya conducen intrusiones reales. En el mismo período, el CSIRT Italia y el NCSC del Reino Unido publicaron alertas sobre campañas similares. El vector sigue siendo lo básico (fallas conocidas en sistemas expuestos), pero la velocidad cambia el plazo de corrección y el tiempo disponible para detectar.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
| --- | --- | --- |
| Explotación automatizada de fallas conocidas en sistemas expuestos | Alerta del NCSC y entrevista del director | Alta |
| Ataque a infraestructura crítica | Dos operadores invadidos, según el NCSC | Alta |
| Acceso a sistemas sin MFA | Recomendación explícita de MFA o passkeys en webmail y VPN | Media |
| Volumen anómalo de datos | El NCSC recomienda monitorear los volúmenes de datos | Media |

## Qué hacer esta semana
1. Inventariar los sistemas expuestos a internet y los datos sensibles que cada uno guarda o alcanza — TI y seguridad.
2. Definir un plazo de 24 horas para correcciones críticas en esos sistemas y exigir MFA en todo acceso remoto — CISO.
3. Señal de que funcionó: para cada sistema expuesto, el equipo sabe decir el dueño, el nivel de corrección y a qué datos personales accede.
