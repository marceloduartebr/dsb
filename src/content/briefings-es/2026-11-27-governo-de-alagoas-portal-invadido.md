---
title: "Gobierno de Alagoas: el intruso usó una contraseña válida de administrador y el portal estuvo seis días fuera de línea"
description: "El Itec confirma que el portal alagoas.al.gov.br fue invadido el 19 de noviembre con una credencial administrativa válida de una aplicación heredada; el sitio volvió el 25 de noviembre en una nueva plataforma."
pubDate: 2026-11-27T17:01:00-03:00
sourceName: "CadaMinuto"
sourceUrl: "https://www.cadaminuto.com.br/noticia/2026/11/21/hacker-invade-site-do-governo-de-alagoas-com-senha-de-administrador-e-apaga-conteudos"
cover: "https://covers.duarte.top/covers/20261127-1453-governo-de-alagoas-portal-invadido-1453.jpg"
tipo: incidente
pais: br
tags: ["setor-publico", "credenciais", "sistemas-legados", "alagoas"]
---

**En una línea:** una credencial administrativa válida en una aplicación heredada de un tercero bastó para pasar por el SOC y borrar contenido del portal oficial de un estado.

## Qué ocurrió

El portal oficial del Gobierno de Alagoas (alagoas.al.gov.br) fue invadido la noche del 19 de noviembre de 2026. Según Juliano Farias, director de Servicios de TI y Telecomunicaciones del Itec (Instituto de Tecnologia em Informática e Comunicação de Alagoas), el intruso comenzó a las 23:17 y obtuvo un inicio de sesión como si fuera un acceso válido: usó una credencial administrativa válida del propio sistema para explotar fallas en el código de una aplicación heredada, desarrollada por una empresa tercerizada. El peritaje descartó fallas recientes conocidas.

Durante la madrugada, el intruso alteró la página de inicio y borró registros de noticias, eventos y galerías de fotos de la base de datos. La Secom confirmó el caso en una nota. El Itec bloqueó el acceso externo, hizo una copia forense del entorno, identificó la IP del atacante y presentó una denuncia policial. El organismo afirma que el ataque se limitó a la capa web de ese portal y que hay copias de seguridad.

El gobierno preveía el regreso para el 23 de noviembre, pero el portal solo volvió el 25 de noviembre, en una nueva plataforma, con el contenido aún en restauración. El Itec todavía no aclaró a quién pertenecía la credencial y dice enfrentar unos 30 mil intentos de ataque por hora.

## Por qué importa

El SOC no vio la entrada porque la credencial era legítima. Eso muestra el límite de los controles centrados en autenticación y perímetro: no dicen qué puede alcanzar una cuenta ni qué datos están a su alcance. Los sistemas heredados de proveedores, con cuentas administrativas activas, tienden a quedar fuera del inventario de accesos y de datos.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Credencial administrativa válida | El Itec confirma inicio de sesión con usuario y contraseña válidos de administrador | Alta |
| Aplicación heredada de un tercero | Portal desarrollado por una tercerizada, con fallas de código explotadas | Alta |
| Detección | Acceso no detectado por el SOC por tratarse de una credencial válida | Media |
| Integridad de datos | Registros de noticias, eventos y fotos borrados de la base | Media |

## Qué hacer esta semana

1. Listar todas las cuentas administrativas de sistemas heredados y de proveedores, con responsable y último uso, y desactivar las huérfanas (responsable: IAM).
2. Mapear qué bases de datos puede leer, modificar o borrar cada una de esas cuentas (responsable: gobierno de datos).
3. Crear alertas para inicios de sesión administrativos fuera de horario y para borrados masivos en bases de aplicaciones heredadas (responsable: SOC).
