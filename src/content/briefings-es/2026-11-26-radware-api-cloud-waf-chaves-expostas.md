---
title: "Radware confirma que una API interna del Cloud WAF, expuesta sin autenticación, filtró contactos y claves de exportación de logs"
description: "Un acceso no autorizado el 19/11 a una API interna sin autenticación expuso contactos de clientes y, para parte de ellos, credenciales de exportación de logs a S3, Azure Blob y SFTP."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/radware-discloses-breach-exposing-customer-cloud-access-keys/"
cover: "https://covers.duarte.top/covers/20261125-radware-api-cloud-waf-chaves-expostas-1708.jpg"
tipo: incidente
pais: global
tags: ["radware", "seguranca-em-nuvem", "risco-de-terceiros", "gestao-de-segredos"]
---

En una línea: la clave más sensible en el incidente de Radware es la que el cliente le dio al proveedor para escribir logs en su propio bucket.

## Qué ocurrió

Según un informe de causa raíz de Radware obtenido por BleepingComputer y publicado el 24 de noviembre de 2026, el 19 de noviembre un tercero no autorizado accedió a una API interna de gestión del Cloud WAF que era accesible desde internet sin exigir autenticación. La empresa detectó el acceso diez horas después, bloqueó la IP de origen y la API y revocó las credenciales internas. La información potencialmente accedida incluye datos de contacto de clientes y, para parte de ellos, las credenciales configuradas para exportar logs a almacenamiento propio (AWS S3, Azure Blob Storage o SFTP). Radware dice que la inspección de tráfico, los certificados, los datos de usuarios finales y los servicios de DDoS no fueron expuestos, y recomendó que los clientes de AppSec (WAF y BOT) roten las credenciales de exportación y revisen los accesos a sus almacenamientos desde el 19/11. Clientes reportaron alertas de AWS sobre una IP desconocida intentando acceder a sus buckets de logs.

## Por qué importa

Las claves entregadas a un proveedor para integrar servicios quedan fuera del radar de quien es dueño del almacenamiento. Los logs suelen contener datos personales y detalles de aplicaciones; una clave de escritura mal acotada puede permitir lectura. Cuando el proveedor es invadido, el cliente necesita saber rápido qué alcanza esa clave.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
|---|---|---|
| API interna expuesta sin autenticación | Informe de causa raíz de Radware | Alta |
| Credenciales de almacenamiento de clientes expuestas | Claves de S3, Azure Blob y SFTP para parte de los clientes | Alta |
| Intentos de uso de las claves | Alertas de AWS reportadas por clientes | Alta |

## Qué hacer esta semana

1. Rotar las credenciales de exportación de logs entregadas a Radware y a otros proveedores de seguridad (responsable: equipo de nube).
2. Inventariar las claves de almacenamiento en nube en poder de terceros, con el alcance de cada una (responsable: gestión de secretos).
3. Revisar los logs de acceso de los buckets de destino desde el 19/11 y restringir las claves a solo escritura (responsable: SOC).
