---
title: "Todoist: el atacante rastreó tareas de clientes en busca de contraseñas y frases semilla"
description: "Una credencial robada del control de versiones llevó a la base de producción; cerca del 6% de los usuarios tuvo su correo y un hash antiguo de contraseña copiados."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "Todoist"
sourceUrl: "https://www.todoist.com/help/todoist/get-started/security-incident-in-november-2026-cG0EIACNU"
cover: "https://covers.duarte.top/covers/20261126-todoist-vazamento-0802.jpg"
tipo: incidente
pais: global
tags: ["incidente", "credenciais", "supply-chain", "saas", "segredos"]
---

**En una línea:** cuando el dato sensible vive en texto libre, la búsqueda del atacante llega antes que el inventario de la empresa.

## Qué ocurrió
El 24 de noviembre de 2026, Todoist publicó un aviso sobre un incidente iniciado el 22 de noviembre. Según la empresa, un atacante usó una credencial robada, vinculada al sistema de control de versiones, para alterar flujos automatizados en tres repositorios y obtener credenciales adicionales. El 23 de noviembre consiguió una credencial administrativa del sistema de inicio de sesión de empleados, tomó la cuenta de trabajo de un colaborador, entró en la infraestructura de nube y accedió a la base de producción, de donde exportó registros de cuentas. La investigación comenzó a las 17:01 (UTC) del mismo día y el acceso quedó cortado a las 17:42. La notificación por correo a los clientes concluyó el 25 de noviembre.

Los grupos afectados, en proporciones aproximadas: cerca del 6% de los usuarios tuvo copiados su correo, un hash antiguo de contraseña (SHA1 con salt) y la fecha de creación de la cuenta; cerca del 0,003% tuvo tokens de la API y de la integración con Slack obtenidos, y parte de ellos tuvo proyectos, tareas y comentarios leídos por la API; cerca del 0,001% tuvo su contenido rastreado en busca de credenciales y frases semilla, con resultados devueltos; y cerca del 0,001% con el complemento para Outlook conectado tuvo expuestos el asunto, el remitente, los primeros 255 caracteres de los mensajes y metadatos de adjuntos. La empresa no informó el total de usuarios ni cómo se obtuvo la credencial inicial, y dice no haber encontrado cambios en el código de la aplicación.

## Por qué importa
El camino repite un patrón reciente: credencial de ingeniería, automatización de repositorio y, desde allí, producción. Pero el punto más sensible es la búsqueda de secretos en el contenido de los clientes. Contraseñas, claves de API y frases semilla pegadas en tareas, comentarios y wikis son datos críticos fuera de cualquier inventario formal. Todoist recomendó revocar y cambiar esos secretos, porque borrar el texto no invalida una copia ya hecha.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Credencial robada del control de versiones y automatización de repositorio alterada | Confirmado por Todoist | Alta |
| Exportación de correos y hashes antiguos de contraseña (~6% de los usuarios) | Confirmado por Todoist | Media |
| Búsqueda de credenciales y frases semilla en el contenido de clientes | Confirmado; parte de los resultados devuelta | Alta |
| Tokens de API, Slack y datos de Outlook | Confirmado en fracciones pequeñas de la base | Media |

## Qué hacer esta semana
1. Revisar herramientas de productividad, tickets y wikis en busca de credenciales en texto libre y revocar lo que se encuentre — seguridad de datos.
2. Revisar qué tokens de automatización de repositorio pueden generar nuevas credenciales o llegar a producción — ingeniería de plataforma.
3. Señal de que funcionó: la empresa sabe cuántos secretos existen fuera de la bóveda y el número baja semana a semana.
