---
title: "La Cámara de Diputados de Argentina cierra sistemas a internet y dice que los ataques fueron contenidos"
description: "Contraseñas cambiadas, MFA obligatorio y portales solo en la red interna, pero ni una palabra sobre qué datos estaban expuestos."
pubDate: 2026-11-27T12:35:00-03:00
sourceName: "Perfil"
sourceUrl: "https://www.perfil.com/politica/menem-anuncio-el-cierre-preventivo-de-sistemas-de-diputados-ante-el-riesgo-de-ciberataques-con-inteligencia-artificial-a8q177v0yxIG"
cover: "https://covers.duarte.top/covers/20261127-camara-diputados-argentina-ciberataque-0805.jpg"
tipo: incidente
pais: ar
tags: ["ciberataque", "setor-publico", "argentina", "mfa"]
---

**En una línea:** cuando un organismo cambia todas las contraseñas y cierra portales a internet, "contenido" describe la puerta, no los datos.

## Qué ocurrió
El 26 de noviembre de 2026, en la apertura de la sesión del Presupuesto 2027, el presidente de la Cámara de Diputados de Argentina, Martín Menem, leyó el comunicado "Medidas adoptadas sobre los sistemas de la Cámara y sus fundamentos". Citó una escalada global de ataques apoyados en inteligencia artificial y dijo que la Cámara sufre intentos recurrentes, sobre todo en sesiones de alto interés público, que "hasta ahora fueron contenidos". Servicios antes públicos pasaron a ser accesibles solo desde la red interna, se cambiaron las contraseñas, el segundo factor de autenticación pasó a ser obligatorio, con límite de intentos y bloqueo automático, y se reforzó el monitoreo de accesos. El sitio de la Cámara estaba en mantenimiento desde mediados de noviembre. La diputada Marcela Pagano presentó una denuncia penal contra Menem por supuesto ocultamiento de un ataque; las afirmaciones de borrado de datos y de pedido de rescate no fueron confirmadas. El comunicado no dice si hubo acceso a datos.

## Por qué importa
Las medidas de contención amplias (cambio general de contraseñas, cierre de portales) suelen indicar que el organismo no puede afirmar con seguridad qué fue o no accedido. Sin un inventario de los datos detrás de cada sistema expuesto, no es posible responder a ciudadanos, empleados públicos o a la autoridad de protección de datos.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Sistemas expuestos a internet | Portales retirados de internet y restringidos a la red interna | Alta |
| Credenciales | Cambio general de contraseñas y MFA obligatorio | Alta |
| Datos personales | No se informó si hubo acceso | Desconocida |

## Qué hacer esta semana
1. Listar cada sistema expuesto a internet y las bases de datos personales que alcanza — responsable: arquitectura/seguridad.
2. Definir el criterio para decir "no se accedió a ningún dato" (logs, retención, cobertura) antes de tener que decirlo — responsable: privacidad/DPO.
3. Señal de que funcionó: para cualquier portal, el equipo responde en una hora qué datos personales hay detrás de él.
