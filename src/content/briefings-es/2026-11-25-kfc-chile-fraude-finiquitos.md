---
title: "KFC Chile investiga un fraude: la credencial activa de una exsupervisora desvió 51,9 millones de pesos de finiquitos de 73 trabajadores"
description: "La credencial activa de una exsupervisora permitió cambiar dos nóminas de pago en BCI Empresas y desviar los finiquitos de 73 trabajadores."
pubDate: 2026-11-25T17:05:00-03:00
sourceName: "BioBioChile"
sourceUrl: "https://www.biobiochile.cl/noticias/economia/negocios-y-empresas/2026/11/23/kfc-se-querella-por-fraude-informatico-desviaron-51-millones-destinados-a-finiquitos-de-trabajadores.shtml"
cover: "https://covers.duarte.top/covers/20261125-kfc-chile-fraude-finiquitos-0813.jpg"
tipo: incidente
pais: cl
tags: ["chile", "fraude", "gestao-de-acessos", "folha-de-pagamento"]
---

En una línea: un acceso que debió haber sido revocado bastó para cambiar nóminas de pago y desviar 51.921.166 pesos.

## Qué ocurrió
KFC Chile presentó una querella por fraude informático, declarada admisible por el 4º Juzgado de Garantía de Santiago. El 28 de octubre de 2026, la empresa cargó en la plataforma BCI Empresas dos nóminas legítimas, por un total de 51.921.166 pesos, para pagar los finiquitos de 73 trabajadores. Minutos después, los archivos fueron borrados y reemplazados por nóminas fraudulentas que mantenían los nombres originales. La operación usó el usuario y la contraseña de una exsupervisora de remuneraciones cuyo acceso no había sido revocado. Los apoderados aprobaron las transferencias y, al día siguiente, el equipo notó que los pagos no habían llegado. KFC pagó los finiquitos de todos modos y pidió la retención de los fondos aún disponibles.

## Por qué importa
El vector no fue una falla técnica sofisticada, sino una credencial válida que sobrevivió a la desvinculación. Los sistemas de nómina y pagos concentran datos personales y bancarios de los empleados, y la aprobación humana no detecta un cambio de archivo que conserva los nombres.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Credencial de exempleada activa | Usuario y contraseña de la exsupervisora usados en BCI Empresas | Alta |
| Cambio de archivo de pago | Nóminas originales borradas y reemplazadas minutos después | Alta |
| Aprobación sin verificación independiente | Los apoderados aprobaron las transferencias fraudulentas | Media |

## Qué hacer esta semana
1. Cruzar la lista de desvinculados de los últimos 12 meses con los usuarios activos en bancos, nómina y RR. HH. (responsable: IAM).
2. Exigir la verificación de destinatarios y montos por un canal separado antes de aprobar nóminas (responsable: Tesorería).
3. Mapear qué datos personales y bancarios alcanza cada perfil de acceso a la nómina (responsable: Seguridad de Datos).
