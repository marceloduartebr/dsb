---
title: "El CHU de Guadalupe vuelve al papel tras un presunto ransomware que cifró bases de datos y suspendió la radioterapia"
description: "La ANSSI investiga si el ataque al mayor hospital de Guadalupe entró por un proveedor de TI comprometido meses antes."
pubDate: 2026-11-26T12:32:00-03:00
sourceName: "The Record"
sourceUrl: "https://therecord.media/guadeloupe-ransomware-hospital-cyber"
cover: "https://covers.duarte.top/covers/20261125-chu-guadalupe-ransomware-hospital-1220.jpg"
tipo: incidente
pais: eu
tags: ["ransomware", "saude", "risco-de-terceiros", "franca"]
---
En una línea: si la hipótesis de la ANSSI se confirma, la puerta de entrada fue un proveedor con acceso al hospital, no el hospital.

## Qué ocurrió

El Centro Hospitalario Universitario (CHU) de Guadalupe, el mayor hospital del territorio francés en el Caribe, sufrió fallos de computadoras y teléfonos desde la noche del sábado 21 de noviembre de 2026. Según The Record, lo que parecía un fallo técnico era un ataque que cifró las bases de datos del hospital. El martes 24, la ANSSI, la agencia nacional de ciberseguridad de Francia, dijo que el incidente parece involucrar ransomware y que investiga si los atacantes entraron por un proveedor de TI no identificado, que habría sido comprometido meses antes. La fiscalía abrió una investigación penal y la autoría no ha sido aclarada. La dirección dijo a la prensa local que no recibió ninguna petición de rescate y descartó pagar.

El hospital canceló cirugías, consultas y exámenes de imagen al menos hasta el viernes, suspendió la radioterapia por seguridad y desprogramó sesiones de quimioterapia. Urgencias, diálisis y procedimientos cardíacos urgentes siguen disponibles. El martes, los equipos todavía no accedían a las historias clínicas electrónicas.

## Por qué importa

El caso junta dos riesgos: datos de salud, que no se pueden cambiar una vez expuestos, y un tercero con acceso privilegiado que pudo haber sido comprometido mucho antes del ataque. Cuando el acceso de los proveedores no aparece en el mismo mapa que los datos que alcanza, el hospital descubre el alcance solo después.

## Lectura de riesgo

| Vector | Evidencia pública | Gravedad |
| --- | --- | --- |
| Ransomware | La ANSSI dice que el incidente parece involucrar ransomware; bases de datos cifradas | Alta |
| Proveedor de TI | La ANSSI investiga la entrada por un proveedor comprometido meses antes | Alta |
| Continuidad asistencial | Radioterapia suspendida, cirugías y consultas canceladas | Alta |

## Qué hacer esta semana

1. Listar los proveedores de TI con acceso remoto y qué sistemas y datos alcanza cada uno (dueño: CISO con el área de compras).
2. Revisar las cuentas de terceros sin uso reciente o con privilegios por encima de lo necesario y eliminar el exceso (dueño: equipo de IAM).
3. Probar la operación en contingencia de los servicios críticos, con acceso offline a la información mínima de pacientes o clientes (dueño: gestor de continuidad).
