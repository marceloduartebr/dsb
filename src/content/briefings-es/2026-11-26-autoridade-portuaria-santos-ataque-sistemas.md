---
title: "Puerto de Santos: la APS restablece el portal y la intranet 18 días después del ataque sin haber informado el alcance de la intrusión"
description: "La APS tuvo sus sistemas caídos el 6 de noviembre, dice que no hubo fuga, pero admite no haber determinado el alcance del ataque."
pubDate: 2026-11-26T17:05:00-03:00
sourceName: "Portos e Navios"
sourceUrl: "https://portosenavios.com.br/noticias/portos-e-logistica/apos-ataque-cibernetico-aps-recupera-sistema-de-protocolo-digital-e-intranet"
cover: "https://covers.duarte.top/covers/20261125-autoridade-portuaria-santos-ataque-sistemas-1220.jpg"
tipo: incidente
pais: br
tags: ["infraestrutura-critica", "portos", "resposta-a-incidentes", "lgpd"]
---

En una línea: afirmar que no hubo fuga sin conocer el alcance del ataque es una esperanza, no una conclusión.

## Qué ocurrió

La Autoridade Portuária de Santos (APS), que administra el mayor puerto de Brasil, tuvo sus sistemas caídos por un ataque cibernético el 6 de noviembre de 2026. Según g1, el 18 de noviembre más de 30 sistemas aún operaban de forma alternativa, la Policía Federal investigaba el caso y la compañía decía que no había sido posible determinar el alcance del ataque, aunque afirmaba que no hubo fuga de datos. El 17 de noviembre, la APS reunió a unos 60 representantes de terminales para presentar la cronología del incidente.

El 23 de noviembre volvió la Supervia Eletrônica, primer sistema externo restablecido. El 24 de noviembre, según Portos e Navios, volvieron el Portal del Cliente y Proveedor y la intranet. La APS dice que la prioridad ahora es recuperar los sistemas aún en mantenimiento y actualizar los datos desde el incidente. Las operaciones de carga, según la compañía, no se paralizaron.

## Por qué importa

El puerto organizado de Santos concentra cerca del 30% del comercio exterior brasileño y tiene 53 terminales. Un incidente que deja sistemas fuera de servicio durante casi tres semanas muestra el costo operativo, pero la parte regulatoria depende de otra respuesta: qué datos personales de clientes, proveedores y empleados estaban en los sistemas afectados y si se accedió a ellos. Sin determinar el alcance, no hay cómo sostener la ausencia de fuga.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
| --- | --- | --- |
| Indisponibilidad prolongada | Sistemas caídos desde el 6/11, regreso gradual hasta el 24/11 | Alta |
| Alcance desconocido | La APS dice no haber determinado el alcance del ataque | Alta |
| Integridad de los datos | La prioridad declarada es actualizar los datos desde el incidente | Media |

## Qué hacer esta semana

1. Mapear qué sistemas guardan datos personales de clientes, proveedores y empleados y quién accede a cada uno (dueño: DPO con el equipo de datos).
2. Probar si, ante un incidente, es posible listar en horas qué datos existían en cada sistema afectado (dueño: CISO).
3. Revisar el plan de continuidad de los sistemas de relación con clientes y proveedores, con plazos de recuperación definidos (dueño: gerente de TI).
