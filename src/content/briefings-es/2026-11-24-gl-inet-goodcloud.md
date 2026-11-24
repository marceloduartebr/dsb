---
title: "GL.iNet confirma la explotación de una falla en la gestión en la nube que instaló malware en routers y KVM"
description: "La empresa bloqueó la vía del ataque el 20 de noviembre, pero eso no elimina el malware de los equipos ya infectados."
pubDate: 2026-11-24T08:50:00-03:00
sourceName: "GL.iNet"
sourceUrl: "https://www.gl-inet.com/en-us/blogs/blog/glinet-security-notice-2026-11-20"
cover: "https://covers.duarte.top/covers/20261123-gl-inet-goodcloud-0813.jpg"
tipo: incidente
tags: ["malware", "roteadores", "nuvem", "vulnerabilidade"]
pais: global
---

**En una línea:** cerrar la falla en la nube impide nuevas infecciones; no limpia el equipo que ya recibió el malware.

## Qué ocurrió
El 20 de noviembre de 2026, GL.iNet identificó una vulnerabilidad en sus servicios de gestión remota en la nube. Un tercero no autorizado explotó la falla para acceder e instalar software malicioso en algunos routers y dispositivos KVM de la marca. La empresa afirma haber corregido la vulnerabilidad y bloqueado la vía usada en el ataque, de modo que los nuevos equipos ya no pueden infectarse por ese camino. Sin embargo, estas medidas no eliminan el malware de los dispositivos ya comprometidos. El aviso oficial pide a los clientes que busquen el proceso "crond -i /tmp/.log"; si aparece, el equipo debe tratarse como infectado, con restablecimiento de fábrica o instalación de la versión de seguridad indicada. El firmware estable con las correcciones estaba previsto para el 22 de noviembre. La compañía notificará por correo electrónico a los clientes con cuenta en la nube que identifique como afectados y aún investiga el alcance, incluido si los computadores conectados a los KVM fueron alcanzados. No reveló cuántos dispositivos fueron infectados.

## Por qué importa
El panel de gestión en la nube del fabricante alcanza una flota entera de equipos. Cuando esa vía se abusa, el inventario que importa no es el recorte del proveedor: es la lista de routers y KVM que la propia empresa todavía tiene en operación, y lo que esos equipos tocan.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Explotación de una falla en la gestión en la nube | Aviso oficial de GL.iNet del 20/11 | Alta |
| Instalación de malware en routers y KVM | Aviso oficial de GL.iNet | Crítica |
| Compromiso de computadores conectados a los KVM | Investigación en curso, no confirmado | Indeterminada |

## Qué hacer esta semana
1. Inventariar los routers y KVM GL.iNet en uso, incluso en teletrabajo y laboratorios, y verificar el indicador de compromiso señalado por el fabricante — responsable: infraestructura.
2. Aislar o restablecer los equipos con señales de infección, instalar el firmware de seguridad y cambiar las credenciales y claves que puedan haber pasado por esos dispositivos — responsable: seguridad + infraestructura.
3. Señal de que funcionó: cada equipo de la flota tiene un responsable, un resultado de la verificación y, si está comprometido, un registro de lo que estaba conectado a él.
